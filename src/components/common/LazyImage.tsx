import React, { Suspense, Component, useState, useEffect, useRef } from 'react';
import { User, Wheat, Image as ImageIcon } from 'lucide-react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'avatar' | 'service';
  fallbackText?: string;
  wrapperClassName?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-square"
  rootMargin?: string;
}

// Global cache to manage image preloading state for React Suspense
interface ResourceEntry {
  status: 'pending' | 'resolved' | 'rejected';
  promise: Promise<void>;
}
const imageResourceCache = new Map<string, ResourceEntry>();

function preloadAndSuspend(src: string): void {
  if (!src) return;

  let entry = imageResourceCache.get(src);
  if (!entry) {
    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = src;
      img.onload = () => {
        if (entry) entry.status = 'resolved';
        resolve();
      };
      img.onerror = () => {
        if (entry) entry.status = 'rejected';
        reject();
      };
    });

    entry = { status: 'pending', promise };
    imageResourceCache.set(src, entry);
  }

  if (entry.status === 'pending') {
    // Throwing the promise suspends execution and lets React Suspense render the fallback!
    throw entry.promise;
  } else if (entry.status === 'rejected') {
    throw new Error(`Failed to load image asset: ${src}`);
  }
}

// Error Boundary to catch any suspended image rejection and render a reliable fallback
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}
class ImageErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Gracefully handle image fetch issues
    console.debug('ImageErrorBoundary caught error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Shimmer Skeleton Fallback rendered by React.Suspense
const SkeletonPlaceholder: React.FC<{
  fallbackType?: 'avatar' | 'service';
  aspectRatio?: string;
  className?: string;
}> = ({ fallbackType = 'avatar', aspectRatio, className = '' }) => (
  <div
    className={`relative overflow-hidden bg-slate-200/90 animate-pulse flex items-center justify-center ${
      aspectRatio || ''
    } ${fallbackType === 'avatar' ? 'rounded-full' : 'rounded-2xl'} ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]" />
    {fallbackType === 'avatar' ? (
      <User className="w-1/3 h-1/3 text-slate-400 opacity-60" />
    ) : (
      <ImageIcon className="w-6 h-6 text-slate-400 opacity-60" />
    )}
  </div>
);

// Inner component that suspends when image is loading
const SuspendedImageCore: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  if (src) {
    preloadAndSuspend(src);
  }

  return (
    <img
      src={src}
      alt={alt || 'Sahkaar Seva'}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={`${className} transition-opacity duration-300 opacity-100 filter-none`}
      {...props}
    />
  );
};

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fallbackType = 'avatar',
  fallbackText,
  onClick,
  aspectRatio,
  rootMargin = '250px',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (!('IntersectionObserver' in window)) {
      setInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewport(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  // Static Fallback rendered when no source or when Error Boundary catches failure
  const staticFallback =
    fallbackType === 'avatar' ? (
      <div
        onClick={onClick}
        className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-emerald-800 to-amber-700 text-white font-bold select-none ${className} ${
          onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
        }`}
        title={alt || fallbackText || 'Cooperative Worker'}
      >
        {fallbackText ? (
          <span className="text-xs uppercase tracking-wider">{fallbackText.slice(0, 2)}</span>
        ) : (
          <User className="w-1/2 h-1/2 opacity-90" />
        )}
      </div>
    ) : (
      <div
        onClick={onClick}
        className={`relative overflow-hidden flex flex-col items-center justify-center bg-slate-800 text-slate-300 p-4 select-none ${className} ${
          onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
        }`}
        title={alt || fallbackText || 'Cooperative Service'}
      >
        <Wheat className="w-8 h-8 text-amber-400 mb-1" />
        <span className="text-[10px] font-semibold text-slate-300 text-center line-clamp-1">
          {alt || 'Sahkaar Seva'}
        </span>
      </div>
    );

  if (!src) {
    return (
      <div ref={containerRef} className={`relative ${aspectRatio || ''} ${wrapperClassName}`}>
        {staticFallback}
      </div>
    );
  }

  const skeletonFallback = (
    <SkeletonPlaceholder
      fallbackType={fallbackType}
      aspectRatio={aspectRatio}
      className={className}
    />
  );

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative ${aspectRatio || ''} ${wrapperClassName} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {inViewport ? (
        <ImageErrorBoundary fallback={staticFallback}>
          <Suspense fallback={skeletonFallback}>
            <SuspendedImageCore
              src={src}
              alt={alt}
              className={className}
              fallbackType={fallbackType}
              onClick={onClick}
              {...props}
            />
          </Suspense>
        </ImageErrorBoundary>
      ) : (
        skeletonFallback
      )}
    </div>
  );
};
