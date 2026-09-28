export type UserRole = 'customer' | 'worker' | 'coop_admin' | 'federation_admin' | 'super_admin';

export type LanguageCode = 'en' | 'hi' | 'gu' | 'mr' | 'ta' | 'te' | 'bn';

export type VerificationStatus = 'verified' | 'pending' | 'requires_action' | 'rejected';

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'emergency_dispatched';

export type ServiceDomain = 'household' | 'agricultural' | 'technical' | 'community' | 'caregiving';

export interface CooperativeSociety {
  id: string;
  name: string;
  shortName: string;
  registrationNumber: string;
  district: string;
  state: string;
  totalWorkers: number;
  activeWorkers: number;
  rating: number;
  phone: string;
  email: string;
  welfareFundBalance: number; // in INR
  federationAffiliation: string;
  establishedYear: number;
  address: string;
  serviceRadiusKm: number;
  lat: number;
  lng: number;
}

export interface WorkerCertification {
  id: string;
  title: string;
  issuingBody: string; // e.g. National Skill Development Corp (NSDC), Agricultural Skill Council of India
  issueYear: number;
  verificationBadge: boolean;
  documentUrl?: string;
}

export interface WorkerWelfare {
  insurancePolicyNumber: string;
  insuranceScheme: string; // e.g. Pradhan Mantri Suraksha Bima Yojana / Cooperative Group Mediclaim
  insuranceCoverageAmount: number; // e.g. 500,000 INR
  insuranceStatus: 'active' | 'renewing' | 'pending';
  pensionEnrolled: boolean; // PM-SYM
  pensionFundId?: string;
  healthSubsidyAvailed: number; // in INR
  toolSubsidyAvailed: number; // in INR
  childrenScholarship: boolean;
  welfareScore: number; // out of 100
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  mobile: string;
  email: string;
  cooperativeId: string;
  cooperativeName: string;
  primarySkill: string;
  skills: string[];
  domain: ServiceDomain;
  yearsExperience: number;
  languages: string[];
  district: string;
  state: string;
  rating: number;
  reviewsCount: number;
  completedJobsCount: number;
  baseHourlyRate: number; // in INR
  verificationStatus: VerificationStatus;
  isAvailableNow: boolean;
  workingRadiusKm: number;
  certifications: WorkerCertification[];
  welfare: WorkerWelfare;
  lat: number;
  lng: number;
  aadhaarVerified: boolean;
  eShramVerified: boolean;
  policeVerificationCleared: boolean;
  bio: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  domain: ServiceDomain;
  category: string;
  iconName: string;
  imageUrl: string;
  shortDescription: string;
  detailedDescription: string;
  basePrice: number;
  pricingUnit: 'per hour' | 'per visit' | 'per acre/day' | 'fixed quote';
  estimatedTime: string;
  popularIn: string; // e.g. "Rural & Semi-Urban", "Households & Shops"
  isEmergencyEligible: boolean;
}

export interface Invoice {
  invoiceNumber: string;
  bookingId: string;
  date: string;
  customerName: string;
  workerName: string;
  cooperativeName: string;
  serviceTitle: string;
  baseServiceFee: number;
  workerPayout: number; // 85%
  cooperativeWelfareFund: number; // 10%
  platformMaintenanceFee: number; // 5%
  gstAmount: number; // 0% or subsidy exempt
  totalAmountPaid: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet';
  transactionId: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  district: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  workerPhone: string;
  cooperativeId: string;
  cooperativeName: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  problemDescription: string;
  status: BookingStatus;
  urgency: 'normal' | 'emergency';
  totalPrice: number;
  invoice?: Invoice;
  rating?: number;
  reviewComment?: string;
  createdAt: string;
  etaMinutes?: number;
}

export interface DemandForecastPoint {
  serviceCategory: string;
  currentDemandIndex: number; // 0 - 100
  predictedDemandNextMonth: number; // 0 - 100
  trend: 'rising' | 'stable' | 'declining';
  peakPeriod: string;
  activeWorkersCount: number;
  recommendedWorkersCount: number;
  shortageRisk: 'High' | 'Medium' | 'Low';
  ruralFactor: string;
}

export interface WorkforceAllocationAlert {
  id: string;
  zone: string;
  service: string;
  availableWorkers: number;
  expectedRequests: number;
  shortage: number;
  priority: 'Critical' | 'Warning' | 'Optimal';
  recommendedAction: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
  serviceUsed: string;
  workerName: string;
  workerId: string;
}

export interface CooperativePartner {
  id: string;
  name: string;
  category: string;
  location: string;
  logoText: string;
  badge: string;
}
