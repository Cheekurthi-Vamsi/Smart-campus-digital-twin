import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB_NAME || 'campustwin';

if (!mongoUri) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

const client = new MongoClient(mongoUri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
});

await client.connect();

const db = client.db(dbName);
const students = db.collection('students');
const professors = db.collection('professors');

export { client, db, students, professors };
