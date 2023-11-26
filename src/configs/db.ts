import mongoose from 'mongoose';
import {LogService} from '@tawol-tech/tinnie/log/LogService';
import {getEnv} from '.';

export const connectDB = async () => {
  try {
    const dbURI = getEnv('DATABASE_URL');
    await mongoose.connect(dbURI, {
      dbName: getEnv('DB_NAME'),
    });
    LogService.info('database connected');
    return true;
  } catch (err) {
    return false;
  }
};
