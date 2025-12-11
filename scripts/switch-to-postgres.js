// Script to switch Prisma schema to PostgreSQL for Railway deployment
const fs = require('fs');
const path = require('path');

try {
  const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
  let schema = fs.readFileSync(schemaPath, 'utf8');

  // Replace SQLite with PostgreSQL
  if (schema.includes('provider = "sqlite"')) {
    schema = schema.replace(
      /provider = "sqlite"/g,
      'provider = "postgresql"'
    );
    fs.writeFileSync(schemaPath, schema, 'utf8');
    console.log('✅ Switched to PostgreSQL for Railway deployment');
  } else {
    console.log('ℹ️  Prisma provider is already PostgreSQL');
  }
} catch (error) {
  console.error('❌ Error switching to PostgreSQL:', error.message);
  process.exit(1);
}

