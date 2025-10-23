import { Account, Client, Databases, Storage, TablesDB } from 'appwrite'

// Validate required environment variables
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID

if (!APPWRITE_ENDPOINT) {
  throw new Error(
    'Missing VITE_APPWRITE_ENDPOINT environment variable. Please check your .env file.',
  )
}

if (!APPWRITE_PROJECT_ID) {
  throw new Error(
    'Missing VITE_APPWRITE_PROJECT_ID environment variable. Please check your .env file.',
  )
}

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

const account = new Account(client)
const databases = new Databases(client)
const tablesDB = new TablesDB(client)
const storage = new Storage(client)

export { client, account, databases, tablesDB, storage }
