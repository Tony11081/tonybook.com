import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// 创建PostgreSQL连接池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// 创建drizzle数据库实例
export const db = drizzle(pool, { schema })

export * from './schema' 