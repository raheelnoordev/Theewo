import dotenv from 'dotenv';
import { testDatabaseConnection } from '../config/db.js';

dotenv.config();

try {
  await testDatabaseConnection();
  console.log('Database connection OK');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Database: ${process.env.DB_NAME}`);
  console.log(`User: ${process.env.DB_USER}`);
  process.exit(0);
} catch (err) {
  console.error('Database connection FAILED');
  console.error(err.message);
  process.exit(1);
}
