// Database connection setup for Vercel Postgres
import { createClient } from '@vercel/postgres';

// Use environment variables for connection string
const connectionString = process.env.POSTGRES_URL || '';

export const db = createClient({ connectionString });

// Example usage:
// await db.connect();
// const result = await db.sql`SELECT * FROM users;`
// await db.end();
