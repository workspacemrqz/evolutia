#!/usr/bin/env node

import "dotenv/config";
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  try {
    console.log("Setting up database...");
    
    // Create diagnostic_responses table with correct structure matching Drizzle schema
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS diagnostic_responses (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        position TEXT,
        custom_position TEXT,
        revenue TEXT,
        employees TEXT,
        erp TEXT,
        areas TEXT,
        time_consuming_process TEXT,
        lost_opportunities TEXT,
        status TEXT DEFAULT 'Pendente',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    await pool.query(createTableQuery);
    console.log("Database table 'diagnostic_responses' created or already exists.");
    
    // Create users table
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    await pool.query(createUsersTableQuery);
    console.log("Database table 'users' created or already exists.");
    
    console.log("Database setup completed successfully!");
    
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    await pool.end();
  }
}

setupDatabase();