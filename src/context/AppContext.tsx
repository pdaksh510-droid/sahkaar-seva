import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  LanguageCode,
  Worker,
  ServiceItem,
  CooperativeSociety,
  Booking,
  DemandForecastPoint,
  WorkforceAllocationAlert,
  VerificationStatus,
  BookingStatus
} from '../types';
import {
  mockCooperatives,
  mockServices,
  mockWorkers,
  mockBookings,
  mockDemandForecasts,
  mockWorkforceAlerts
} from '../data/mockData';
import { translations, TranslationStrings } from '../utils/translations';
import confetti from 'canvas-confetti';

export type ActiveView = 'landing' | 'services' | 'emergency' | 'map' | 'rural' | 'welfare' | 'dashboard';

interface AppNotification {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationStrings;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  
  // Data entities
  cooperatives: CooperativeSociety[];
  workers: Worker[];
  services: ServiceItem[];
  bookings: Booking[];
  demandForecasts: DemandForecastPoint[];
  workforceAlerts: WorkforceAllocationAlert[];
  
  // Filters and queries
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Selected modals state
  selectedWorkerForProfile: Worker | null;
  setSelectedWorkerForProfile: (worker: Worker | null) => void;
  selectedServiceForBooking: ServiceItem | null;
  setSelectedServiceForBooking: (service: ServiceItem | null) => void;
  
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isWorkerRegisterModalOpen: boolean;
  setIsWorkerRegisterModalOpen: (open: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isRatingModalOpen: boolean;
  setIsRatingModalOpen: (open: boolean) => void;
  activeRatingBooking: Booking | null;
  setActiveRatingBooking: (booking: Booking | null) => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  activeInvoiceBooking: Booking | null;
  setActiveInvoiceBooking: (booking: Booking | null) => void;

  // Actions
  createBooking: (newBooking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  rateBooking: (bookingId: string, rating: number, comment: string) => void;
  registerWorker: (newWorkerData: Partial<Worker>) => void;
  verifyWorker: (workerId: string, status: VerificationStatus) => void;
  toggleWorkerAvailability: (workerId: string) => void;
  resolveAllocationAlert: (alertId: string) => void;

  // Notifications
  notifications: AppNotification[];
  markAllNotificationsRead: () => void;
  addNotification: (title: string, detail: string, type?: 'info' | 'success' | 'alert') => void;
  
  // Active demo worker for Worker persona
  currentActiveWorker: Worker;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  
  const [cooperatives, setCooperatives] = useState<CooperativeSociety[]>(mockCooperatives);
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [services] = useState<ServiceItem[]>(mockServices);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [demandForecasts, setDemandForecasts] = useState<DemandForecastPoint[]>(mockDemandForecasts);
  const [workforceAlerts, setWorkforceAlerts] = useState<WorkforceAllocationAlert[]>(mockWorkforceAlerts);

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [selectedWorkerForProfile, setSelectedWorkerForProfile] = useState<Worker | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isWorkerRegisterModalOpen, setIsWorkerRegisterModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [activeRatingBooking, setActiveRatingBooking] = useState<Booking | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [activeInvoiceBooking, setActiveInvoiceBooking] = useState<Booking | null>(null);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Emergency Service Dispatched',
      detail: 'Ramesh Patel is en route to Boriavi Farm for 7.5HP tube-well motor repair.',
      time: '10 mins ago',
      read: false,
      type: 'alert'
    },
    {
      id: 'notif-2',
      title: 'Welfare Dividend Disbursed',
      detail: '₹1,200 annual tool upgrade bonus credited to 420 Anand cooperative members.',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: 'notif-3',
      title: 'AI High Demand Alert: Ludhiana',
      detail: 'Harvester breakdown requests expected to surge +38% this weekend.',
      time: '4 hours ago',
      read: true,
      type: 'info'
    }
  ]);

  // Derived translations
  const t = translations[language] || translations.en;

  // Helper active worker (e.g. Ramesh Patel for worker role)
  const currentActiveWorker = workers.find(w => w.id === 'w-1') || workers[0];

  const addNotification = (title: string, detail: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title,
      detail,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const createBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdBooking: Booking = {
      ...newBookingData,
      id: newId,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [createdBooking, ...prev]);
    
    // Also trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback safe
    }

    addNotification(
      'Service Booking Confirmed!',
      `Booking #${createdBooking.id} with ${createdBooking.workerName} has been recorded. Digital invoice generated.`,
      'success'
    );

    return createdBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status };
      }
      return b;
    }));

    addNotification(
      'Booking Status Updated',
      `Booking #${bookingId} is now marked as ${status.replace('_', ' ').toUpperCase()}.`,
      'info'
    );
  };

  const rateBooking = (bookingId: string, rating: number, comment: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, rating, reviewComment: comment, status: 'completed' };
      }
      return b;
    }));

    // Update worker rating average
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setWorkers(prev => prev.map(w => {
        if (w.id === booking.workerId) {
          const newReviewsCount = w.reviewsCount + 1;
          const newRating = Number(((w.rating * w.reviewsCount + rating) / newReviewsCount).toFixed(2));
          return {
            ...w,
            rating: newRating,
            reviewsCount: newReviewsCount,
            completedJobsCount: w.completedJobsCount + 1
          };
        }
        return w;
      }));
    }

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    addNotification(
      'Review & Rating Submitted',
      `Thank you! Your feedback helps uphold cooperative trust and service quality.`,
      'success'
    );
  };

  const registerWorker = (newWorkerData: Partial<Worker>) => {
    const newWorkerId = `w-${Date.now()}`;
    const coop = cooperatives.find(c => c.id === newWorkerData.cooperativeId) || cooperatives[0];
    
    const completeWorker: Worker = {
      id: newWorkerId,
      name: newWorkerData.name || 'New Cooperative Worker',
      avatar: newWorkerData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      gender: newWorkerData.gender || 'male',
      mobile: newWorkerData.mobile || '+91 98000 00000',
      email: newWorkerData.email || 'worker@coop.in',
      cooperativeId: coop.id,
      cooperativeName: coop.name,
      primarySkill: newWorkerData.primarySkill || 'General Maintenance Technician',
      skills: newWorkerData.skills || ['General Maintenance'],
      domain: newWorkerData.domain || 'household',
      yearsExperience: newWorkerData.yearsExperience || 3,
      languages: newWorkerData.languages || ['Hindi', 'English'],
      district: newWorkerData.district || coop.district,
      state: newWorkerData.state || coop.state,
      rating: 4.8,
      reviewsCount: 0,
      completedJobsCount: 0,
      baseHourlyRate: newWorkerData.baseHourlyRate || 350,
      verificationStatus: 'pending',
      isAvailableNow: true,
      workingRadiusKm: newWorkerData.workingRadiusKm || 30,
      certifications: [
        {
          id: 'cert-' + Date.now(),
          title: `${newWorkerData.primarySkill || 'Skill'} Certification`,
          issuingBody: 'National Skill Development Corporation (NSDC)',
          issueYear: new Date().getFullYear(),
          verificationBadge: false
        }
      ],
      welfare: {
        insurancePolicyNumber: `PR-COOP-${Math.floor(100000 + Math.random() * 900000)}`,
        insuranceScheme: 'Cooperative Enrolment In-Process',
        insuranceCoverageAmount: 500000,
        insuranceStatus: 'pending',
        pensionEnrolled: false,
        healthSubsidyAvailed: 0,
        toolSubsidyAvailed: 0,
        childrenScholarship: false,
        welfareScore: 65
      },
      lat: coop.lat + (Math.random() - 0.5) * 0.04,
      lng: coop.lng + (Math.random() - 0.5) * 0.04,
      aadhaarVerified: true,
      eShramVerified: true,
      policeVerificationCleared: false,
      bio: newWorkerData.bio || 'Newly registered cooperative member ready to deliver honest, dependable service.'
    };

    setWorkers(prev => [completeWorker, ...prev]);

    addNotification(
      'New Worker Registration Submitted',
      `${completeWorker.name} has submitted registration for ${coop.shortName}. Status: Pending Verification.`,
      'info'
    );
  };

  const verifyWorker = (workerId: string, status: VerificationStatus) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          verificationStatus: status,
          aadhaarVerified: true,
          policeVerificationCleared: status === 'verified',
          certifications: w.certifications.map(c => ({ ...c, verificationBadge: status === 'verified' })),
          welfare: {
            ...w.welfare,
            insuranceStatus: status === 'verified' ? 'active' : 'pending',
            welfareScore: status === 'verified' ? 92 : 65
          }
        };
      }
      return w;
    }));

    addNotification(
      'Worker Verification Updated',
      `Worker ID ${workerId} verification status set to ${status.toUpperCase()}.`,
      status === 'verified' ? 'success' : 'alert'
    );
  };

  const toggleWorkerAvailability = (workerId: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return { ...w, isAvailableNow: !w.isAvailableNow };
      }
      return w;
    }));
  };

  const resolveAllocationAlert = (alertId: string) => {
    const alert = workforceAlerts.find(a => a.id === alertId);
    if (!alert) return;

    setWorkforceAlerts(prev => prev.filter(a => a.id !== alertId));

    try {
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }

    addNotification(
      'Workforce Smart Allocation Executed!',
      `Successfully reallocated available cooperative workforce in ${alert.zone}. Shortage mitigated.`,
      'success'
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        activeView,
        setActiveView,
        cooperatives,
        workers,
        services,
        bookings,
        demandForecasts,
        workforceAlerts,
        selectedDistrict,
        setSelectedDistrict,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedWorkerForProfile,
        setSelectedWorkerForProfile,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isWorkerRegisterModalOpen,
        setIsWorkerRegisterModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isRatingModalOpen,
        setIsRatingModalOpen,
        activeRatingBooking,
        setActiveRatingBooking,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        activeInvoiceBooking,
        setActiveInvoiceBooking,
        createBooking,
        updateBookingStatus,
        rateBooking,
        registerWorker,
        verifyWorker,
        toggleWorkerAvailability,
        resolveAllocationAlert,
        notifications,
        markAllNotificationsRead,
        addNotification,
        currentActiveWorker
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
