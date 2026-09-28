import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { FeaturedWorkersSection } from './components/landing/FeaturedWorkersSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { RuralImpactSection } from './components/landing/RuralImpactSection';
import { WelfareHighlight } from './components/landing/WelfareHighlight';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { ServiceMarketplace } from './components/services/ServiceMarketplace';
import { EmergencyDispatch } from './components/emergency/EmergencyDispatch';
import { GeoSpatialMatcher } from './components/map/GeoSpatialMatcher';
import { WelfareScorecardView } from './components/welfare/WelfareScorecardView';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { WorkerDashboard } from './components/dashboard/WorkerDashboard';
import { CooperativeAdminDashboard } from './components/dashboard/CooperativeAdminDashboard';
import { FederationDashboard } from './components/dashboard/FederationDashboard';
import { BookingModal } from './components/booking/BookingModal';
import { WorkerProfileModal } from './components/worker/WorkerProfileModal';
import { WorkerRegistrationModal } from './components/worker/WorkerRegistrationModal';
import { InvoiceViewModal } from './components/invoice/InvoiceViewModal';
import { RatingModal } from './components/feedback/RatingModal';

const MainContent: React.FC = () => {
  const { activeView, role } = useApp();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        {activeView === 'landing' && (
          <>
            <HeroSection />
            <HowItWorksSection />
            <FeaturedWorkersSection />
            <RuralImpactSection />
            <FeaturesSection />
            <WelfareHighlight />
            <TestimonialsSection />
          </>
        )}

        {activeView === 'services' && <ServiceMarketplace />}
        {activeView === 'emergency' && <EmergencyDispatch />}
        {activeView === 'map' && <GeoSpatialMatcher />}
        {activeView === 'rural' && (
          <div className="py-6 bg-[#faf8f5]">
            <RuralImpactSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <ServiceMarketplace />
            </div>
          </div>
        )}
        {activeView === 'welfare' && <WelfareScorecardView />}

        {activeView === 'dashboard' && (
          <>
            {role === 'customer' && <CustomerDashboard />}
            {role === 'worker' && <WorkerDashboard />}
            {role === 'coop_admin' && <CooperativeAdminDashboard />}
            {(role === 'federation_admin' || role === 'super_admin') && <FederationDashboard />}
          </>
        )}
      </div>

      <Footer />

      {/* Global Modals */}
      <BookingModal />
      <WorkerProfileModal />
      <WorkerRegistrationModal />
      <InvoiceViewModal />
      <RatingModal />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col selection:bg-amber-500 selection:text-white">
        <Header />
        <MainContent />
      </div>
    </AppProvider>
  );
}
