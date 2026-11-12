import { Pool } from "pg";

// Khai báo Pool dùng chung
const globalForPg = globalThis as typeof globalThis & {
  postgresPool?: Pool;
};

// Kiểm tra các biến môi trường
if (
  !process.env.PGHOST ||
  !process.env.PGDATABASE ||
  !process.env.PGUSER ||
  !process.env.PGPASSWORD
) {
  throw new Error("PostgreSQL environment variables are missing");
}

// Tạo connection pool
export const pool =
  globalForPg.postgresPool ??
  new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });

// Lưu Pool trong môi trường development
if (process.env.NODE_ENV !== "production") {
  globalForPg.postgresPool = pool;
}