#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔨 Building application for production...');
console.log('⏰ Started at:', new Date().toISOString());
console.log('📍 Working directory:', process.cwd());

try {
  // Install dependencies
  console.log('\n📦 Installing dependencies...');
  console.log('🔄 Running: npm install');
  const startInstall = Date.now();
  execSync('npm install', { stdio: 'inherit' });
  const installTime = Date.now() - startInstall;
  console.log(`✅ Dependencies installed in ${installTime}ms`);

  // Build the client
  console.log('\n🏗️ Building client application...');
  console.log('🔄 Running: npm run build');
  const startBuild = Date.now();
  execSync('npm run build', { stdio: 'inherit' });
  const buildTime = Date.now() - startBuild;
  console.log(`✅ Client built successfully in ${buildTime}ms`);

  // Copy necessary files
  console.log('\n📋 Copying files to dist directory...');
  
  const filesToCopy = [
    'package.json',
    'package-lock.json',
    'start-vps.js',
    'ecosystem.config.cjs',
    '.env'
  ];

  const distDir = './dist';
  console.log(`📂 Target directory: ${path.resolve(distDir)}`);
  
  if (!fs.existsSync(distDir)) {
    console.log('📁 Creating dist directory...');
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✅ Dist directory created');
  } else {
    console.log('📁 Dist directory already exists');
  }

  console.log(`📄 Files to copy: ${filesToCopy.length}`);
  
  let copiedCount = 0;
  let skippedCount = 0;
  
  filesToCopy.forEach((file, index) => {
    console.log(`\n[${index + 1}/${filesToCopy.length}] Processing: ${file}`);
    
    if (fs.existsSync(file)) {
      const sourceStats = fs.statSync(file);
      const targetPath = path.join(distDir, file);
      
      try {
        fs.copyFileSync(file, targetPath);
        const targetStats = fs.statSync(targetPath);
        copiedCount++;
        console.log(`✅ Copied ${file} (${sourceStats.size} bytes → ${targetStats.size} bytes)`);
      } catch (copyError) {
        console.error(`❌ Failed to copy ${file}:`, copyError.message);
      }
    } else {
      skippedCount++;
      console.log(`⚠️  Skipped ${file} (file not found)`);
    }
  });

  // Check build artifacts
  console.log('\n📊 Build artifacts verification:');
  const buildDir = './build';
  const distExists = fs.existsSync(distDir);
  const buildExists = fs.existsSync(buildDir);
  
  console.log(`📂 Dist directory exists: ${distExists}`);
  console.log(`📂 Build directory exists: ${buildExists}`);
  
  if (distExists) {
    const distFiles = fs.readdirSync(distDir);
    console.log(`📁 Files in dist: ${distFiles.length}`);
    distFiles.forEach(file => {
      const filePath = path.join(distDir, file);
      const stats = fs.statSync(filePath);
      const type = stats.isDirectory() ? 'DIR' : 'FILE';
      const size = stats.isDirectory() ? '' : ` (${stats.size} bytes)`;
      console.log(`   - ${type}: ${file}${size}`);
    });
  }
  
  if (buildExists) {
    const buildFiles = fs.readdirSync(buildDir);
    console.log(`📁 Files in build: ${buildFiles.length}`);
    buildFiles.forEach(file => {
      const filePath = path.join(buildDir, file);
      const stats = fs.statSync(filePath);
      const type = stats.isDirectory() ? 'DIR' : 'FILE';
      const size = stats.isDirectory() ? '' : ` (${stats.size} bytes)`;
      console.log(`   - ${type}: ${file}${size}`);
    });
  }

  const totalTime = Date.now() - startInstall;
  
  console.log('\n🎉 Build completed successfully!');
  console.log(`📁 Files ready in ./dist directory`);
  console.log(`📊 Summary: ${copiedCount} files copied, ${skippedCount} files skipped`);
  console.log(`⏱️  Total build time: ${totalTime}ms`);
  console.log('✅ Finished at:', new Date().toISOString());
  
} catch (error) {
  console.error('\n❌ Build failed!');
  console.error('🔍 Error details:', error.message);
  console.error('📍 Error occurred at:', new Date().toISOString());
  if (error.stack) {
    console.error('📋 Stack trace:', error.stack);
  }
  process.exit(1);
}