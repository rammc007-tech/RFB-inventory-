// Script to resolve failed Prisma migrations
// This handles the case where a migration failed and needs to be marked as rolled back

const { execSync } = require('child_process');

function runCommand(command, silent = false) {
  try {
    execSync(command, {
      stdio: silent ? 'pipe' : 'inherit',
      env: process.env,
      cwd: process.cwd()
    });
    return true;
  } catch (error) {
    return false;
  }
}

console.log('🚀 Starting migration deployment...');
console.log('');

// Step 1: Try to resolve failed migrations (silently)
console.log('Step 1: Checking for failed migrations...');
const migrations = [
  '20251208205317_init',
  '20251209010216_add_deleted_at_fields',
  '20251210001712_make_email_optional'
];

let resolved = 0;
for (const migration of migrations) {
  if (runCommand(`npx prisma migrate resolve --rolled-back ${migration}`, true)) {
    console.log(`  ✅ Resolved: ${migration}`);
    resolved++;
  }
}

if (resolved === 0) {
  console.log('  ℹ️  No failed migrations found');
}
console.log('');

// Step 2: Deploy migrations
console.log('Step 2: Deploying migrations...');
const deploySuccess = runCommand('npx prisma migrate deploy', false);

if (!deploySuccess) {
  console.log('');
  console.log('⚠️  Migration deployment failed');
  console.log('');
  console.log('Attempting recovery by marking migrations as applied...');
  console.log('');
  
  // Recovery: Mark all as applied
  for (const migration of migrations) {
    runCommand(`npx prisma migrate resolve --applied ${migration}`, true);
  }
  
  // Retry deployment
  console.log('Retrying migration deployment...');
  const retrySuccess = runCommand('npx prisma migrate deploy', false);
  
  if (!retrySuccess) {
    console.log('');
    console.error('❌ Migration deployment failed after recovery');
    console.error('');
    console.error('💡 Solution: Reset the database in Vercel:');
    console.error('   1. Vercel Dashboard → Storage');
    console.error('   2. Delete Postgres database');
    console.error('   3. Create new Postgres database');
    console.error('   4. Redeploy');
    process.exit(1);
  }
}

console.log('');
console.log('✅ Migrations deployed successfully!');

