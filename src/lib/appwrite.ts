
import { Client, Databases, Account, Messaging } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('684d7cac0000c1024613'); // Your project ID

export const databases = new Databases(client);
export const account = new Account(client);
export const messaging = new Messaging(client);

export const DATABASE_ID = 'main-database';
export const PROPERTIES_COLLECTION_ID = '684e1a120038898316ad';
export const FEATURED_REQUESTS_COLLECTION_ID = '684e1a2c001d4611cf0a';
export const APPLICATIONS_COLLECTION_ID = '684e1a3a00061ada0745';
export const MESSAGES_COLLECTION_ID = '684e1a4300176f347e1e';
export const CONVERSATIONS_COLLECTION_ID = '684e1a5500170fd9073d';

export { client };
