#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Starting Faust Tutorial...\n');

  // Step 1: Check/create .env.local
  const envPath = path.join(__dirname, '..', '.env.local');
  const envExamplePath = path.join(__dirname, '..', '.env.local.example');

  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env.local from example...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env.local created\n');
  } else {
    console.log('✅ .env.local already exists\n');
  }

  // Step 2: Check if wp-env is running
  let wpEnvRunning = false;
  try {
    execSync('wp-env run cli -- wp cli info', { stdio: 'ignore' });
    wpEnvRunning = true;
    console.log('✅ WordPress environment is already running\n');
  } catch (error) {
    console.log('🐳 Starting WordPress environment (this may take a minute)...');
    execSync('npm run wp:start', { stdio: 'inherit' });
    console.log('✅ WordPress environment started\n');
  }

  // Step 3: Check if database needs importing
  try {
    const result = execSync('wp-env run cli -- wp option get faustwp_settings', {
      encoding: 'utf-8',
      stdio: 'pipe'
    });

    if (result.includes('localhost:3000')) {
      console.log('✅ Database is already configured\n');
    } else {
      throw new Error('DB needs import');
    }
  } catch (error) {
    console.log('📦 Importing pre-configured database (first time setup)...');
    execSync('npm run wp:db:import', { stdio: 'inherit' });
    console.log('✅ Database imported\n');
  }

  // Step 4: Start Next.js
  console.log('🎨 Starting Next.js development server...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📍 Frontend:        http://localhost:3000');
  console.log('📍 WordPress Admin: http://localhost:8888/wp-admin');
  console.log('   Username: admin');
  console.log('   Password: password');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const nextProcess = spawn('npm', ['run', 'dev:next'], {
    stdio: 'inherit',
    shell: true
  });

  nextProcess.on('close', (code) => {
    process.exit(code);
  });
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
