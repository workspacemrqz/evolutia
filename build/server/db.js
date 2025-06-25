import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema.js';
export const client = postgres(process.env.DATABASE_URL, {
    ssl: false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10
});
export const db = drizzle(client, { schema });
