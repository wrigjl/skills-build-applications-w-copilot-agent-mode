import mongoose from 'mongoose';

const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';

export function getMongoUri(): string {
  return process.env.MONGO_URI ?? DEFAULT_MONGO_URI;
}

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(getMongoUri(), { dbName: 'octofit_db' });
}
