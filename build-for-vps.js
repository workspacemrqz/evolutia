#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔨 Building application for production...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the client
  console.log('🏗️ Building client application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Copy necessary files
  console.log('📋 Copying files...');
  
  const filesToCopy = [
    'package.json',
    'package-lock.json',
    'start-vps.js',
    'ecosystem.config.cjs',
    '.env'
  ];

  const distDir = './dist';
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(distDir, file));
      console.log(`✅ Copied ${file}`);
    }
  });

  console.log('🎉 Build completed successfully!');
  console.log('📁 Files ready in ./dist directory');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}