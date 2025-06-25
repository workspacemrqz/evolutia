#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'server', 'index.ts');

const child = spawn('node', ['--loader', '@swc-node/register/esm', serverPath], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});