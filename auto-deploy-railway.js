#!/usr/bin/env node
/**
 * Automated Railway Deployment Script
 * This script helps automate the Railway deployment process
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚂 Railway Automatic Deployment');
console.log('================================\n');

// Step 1: Verify Git status
console.log('📦 Step 1: Checking Git repository...');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('⚠️  Uncommitted changes found. Committing...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Auto: Prepare for Railway deployment"', { stdio: 'inherit' });
  }
  
  // Push to GitHub
  console.log('📤 Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✅ Code pushed to GitHub\n');
} catch (error) {
  console.error('❌ Git error:', error.message);
  process.exit(1);
}

// Step 2: Verify Railway configuration
console.log('⚙️  Step 2: Verifying Railway configuration...');
const railwayJson = path.join(__dirname, 'railway.json');
const nixpacksToml = path.join(__dirname, 'nixpacks.toml');
const startScript = path.join(__dirname, 'scripts', 'railway-start.sh');

if (!fs.existsSync(railwayJson)) {
  console.error('❌ railway.json not found!');
  process.exit(1);
}
if (!fs.existsSync(nixpacksToml)) {
  console.error('❌ nixpacks.toml not found!');
  process.exit(1);
}
if (!fs.existsSync(startScript)) {
  console.error('❌ railway-start.sh not found!');
  process.exit(1);
}
console.log('✅ Railway configuration files found\n');

// Step 3: Generate NEXTAUTH_SECRET if needed
console.log('🔐 Step 3: Generating NEXTAUTH_SECRET...');
try {
  const secret = execSync('openssl rand -base64 32', { encoding: 'utf8' }).trim();
  console.log('✅ NEXTAUTH_SECRET generated:', secret);
  console.log('\n📋 Save this for Railway environment variables:');
  console.log(`   NEXTAUTH_SECRET=${secret}\n`);
} catch (error) {
  console.error('❌ Failed to generate secret:', error.message);
}

// Step 4: Instructions
console.log('📋 Step 4: Railway Deployment Instructions');
console.log('==========================================\n');
console.log('Since Railway requires authentication, please follow these steps:\n');
console.log('1. Open Railway: https://railway.app/new');
console.log('2. Login with your GitHub account');
console.log('3. Click "New Project" → "Deploy from GitHub repo"');
console.log('4. Select repository: rammc007-tech/RFB-inventory-');
console.log('5. Railway will automatically detect and deploy\n');
console.log('6. Add PostgreSQL Database:');
console.log('   - Click "New" → "Database" → "Add PostgreSQL"');
console.log('   - Railway will auto-create the database\n');
console.log('7. Set Environment Variables (Settings → Variables):');
console.log('   - NEXTAUTH_URL = https://your-app-name.railway.app');
console.log('   - NEXTAUTH_SECRET = (use the generated secret above)');
console.log('   - DATABASE_URL = (Railway sets this automatically)\n');
console.log('✅ Railway will automatically:');
console.log('   - Build your app');
console.log('   - Run database migrations');
console.log('   - Seed the database');
console.log('   - Deploy to production\n');
console.log('🎉 Your app will be live at: https://your-app-name.railway.app\n');

// Step 5: Open Railway
console.log('🌐 Opening Railway in browser...');
try {
  const { exec } = require('child_process');
  const platform = process.platform;
  let command;
  
  if (platform === 'darwin') {
    command = 'open';
  } else if (platform === 'win32') {
    command = 'start';
  } else {
    command = 'xdg-open';
  }
  
  exec(`${command} https://railway.app/new`, (error) => {
    if (error) {
      console.log('⚠️  Could not open browser automatically');
      console.log('   Please visit: https://railway.app/new');
    } else {
      console.log('✅ Railway opened in browser\n');
    }
  });
} catch (error) {
  console.log('⚠️  Please manually visit: https://railway.app/new\n');
}

console.log('✨ Deployment preparation complete!');
console.log('   Follow the steps above to complete Railway deployment.\n');

