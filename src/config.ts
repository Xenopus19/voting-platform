import dotenv from 'dotenv';

dotenv.config();

export const port: number = parseInt(process.env.PORT || '3001', 10);

export const databaseUrl: string = process.env.DATABASE_URL || '';
