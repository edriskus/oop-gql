import { DbConnection, DbConnetionPool } from "./Mongo";

export interface Context {
  dbConnection: DbConnection;
}

/**
 * Construct context
 * @param {*} param0
 */
export async function context(): Promise<Context> {
  const pool = DbConnetionPool.getInstance();
  const url = process.env.MONGO_URL;
  const dbConnection = pool.getConnection(url);
  return { dbConnection };
}
