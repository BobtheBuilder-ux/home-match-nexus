
import { Client, Databases, Account, Messaging } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('your-project-id'); // Your project ID

export const databases = new Databases(client);
export const account = new Account(client);
export const messaging = new Messaging(client);

export const DATABASE_ID = 'main-database';
export const PROPERTIES_COLLECTION_ID = 'properties';
export const FEATURED_REQUESTS_COLLECTION_ID = 'featured-requests';
export const APPLICATIONS_COLLECTION_ID = 'applications';

export { client };
