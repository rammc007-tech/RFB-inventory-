// Script to switch Prisma schema to SQLite for local development
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Replace PostgreSQL with SQLite
schema = schema.replace(
  /provider = "postgresql"/g,
  'provider = "sqlite"'
);

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('✅ Switched to SQLite for local development');
console.log('   Run: npx prisma generate');

