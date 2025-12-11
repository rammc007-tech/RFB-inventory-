// Script to switch Prisma schema to PostgreSQL for Railway deployment
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Replace SQLite with PostgreSQL
schema = schema.replace(
  /provider = "sqlite"/g,
  'provider = "postgresql"'
);

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('✅ Switched to PostgreSQL for Railway deployment');
console.log('   Run: npx prisma generate');

