
export interface Document {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  uploadedBy: string;
  propertyId?: string;
  applicationId?: string;
  category: 'lease_agreement' | 'id_verification' | 'income_proof' | 'references' | 'other';
  url: string;
  status: 'pending' | 'approved' | 'rejected';
}
