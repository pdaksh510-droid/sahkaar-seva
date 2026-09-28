import React from 'react';
import { LazyImage, LazyImageProps } from './LazyImage';

export type SafeImageProps = LazyImageProps;

export const SafeImage: React.FC<SafeImageProps> = (props) => {
  return <LazyImage {...props} />;
};

