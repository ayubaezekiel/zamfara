import { Account, Client, Databases, Storage, TablesDB } from 'appwrite'

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)
const databases = new Databases(client)
const tablesDB = new TablesDB(client)
const storage = new Storage(client)

export { client, account, databases, tablesDB, storage }
