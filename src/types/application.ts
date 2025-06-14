
export interface TenantApplication {
  id: string;
  propertyId: string;
  applicantId: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Employment Information
  employerName: string;
  jobTitle: string;
  monthlyIncome: number;
  employmentDuration: string;
  
  // Housing Information
  currentAddress: string;
  moveInDate: string;
  reasonForMoving: string;
  
  // References
  references: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  }[];
  
  // Additional Information
  pets: boolean;
  petDetails?: string;
  additionalComments?: string;
}
