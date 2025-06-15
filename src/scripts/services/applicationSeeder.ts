
import { databases, DATABASE_ID, APPLICATIONS_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';
import { SAMPLE_TENANT_IDS, SAMPLE_NAMES, ABUJA_AREAS } from '../constants/sampleData';

export const seedApplications = async (properties: any[]) => {
  console.log('Creating applications...');
  const applications = properties.slice(0, 15).map((property, index) => ({
    propertyId: property.$id,
    applicantId: SAMPLE_TENANT_IDS[index % SAMPLE_TENANT_IDS.length],
    status: ["submitted", "under_review", "approved"][Math.floor(Math.random() * 3)] as "submitted" | "under_review" | "approved",
    submittedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
    firstName: SAMPLE_NAMES.FIRST_NAMES[index % 8],
    lastName: SAMPLE_NAMES.LAST_NAMES[index % 8],
    email: `user${index + 1}@email.com`,
    phone: `+234-${Math.floor(Math.random() * 900000000) + 700000000}`,
    dateOfBirth: `${1980 + Math.floor(Math.random() * 25)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    employerName: SAMPLE_NAMES.EMPLOYERS[Math.floor(Math.random() * 5)],
    jobTitle: SAMPLE_NAMES.JOB_TITLES[Math.floor(Math.random() * 5)],
    monthlyIncome: Math.floor(Math.random() * 1000000) + 300000, // ₦300K - ₦1.3M
    employmentDuration: `${Math.floor(Math.random() * 8) + 1} years`,
    currentAddress: `${Math.floor(Math.random() * 99) + 1} Current Street, ${ABUJA_AREAS[Math.floor(Math.random() * ABUJA_AREAS.length)]}, Abuja`,
    moveInDate: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reasonForMoving: ["Job relocation", "Family expansion", "Better location", "Upgrade lifestyle"][Math.floor(Math.random() * 4)],
    references: [
      {
        name: SAMPLE_NAMES.REFERENCES[Math.floor(Math.random() * 3)],
        relationship: ["Previous Landlord", "Employer", "Family Friend"][Math.floor(Math.random() * 3)],
        phone: `+234-${Math.floor(Math.random() * 900000000) + 700000000}`,
        email: `reference${index}@email.com`
      }
    ],
    pets: Math.random() > 0.7,
    additionalComments: "Looking forward to renting in Abuja."
  }));

  const createdApplications = [];
  for (const application of applications) {
    const response = await databases.createDocument(
      DATABASE_ID,
      APPLICATIONS_COLLECTION_ID,
      ID.unique(),
      application
    );
    createdApplications.push(response);
    console.log(`Created application from: ${application.firstName} ${application.lastName}`);
  }
  
  return createdApplications;
};
