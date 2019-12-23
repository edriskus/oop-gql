const MongoClient = require("mongodb").MongoClient;

/**
 * DB Connection
 */
export class DbConnection {
  private url: string;
  private client: Promise<any>;

  constructor(url: string) {
    this.url = url;
    this.client = MongoClient.connect(this.url, { useNewUrlParser: true });
  }

  public async getClient() {
    return this.client;
  }
}

/**
 * DB Connections Map
 */
interface DbConnectionMap {
  [url: string]: DbConnection;
}

/**
 * Singleton DB Connections Pool
 */
export class DbConnetionPool {
  public static instance: DbConnetionPool = new DbConnetionPool();
  public static getInstance() {
    return this.instance;
  }

  private dbConnections: DbConnectionMap = {};
  public getConnection(url: string) {
    if (this.dbConnections[url] !== undefined) {
      return this.dbConnections[url];
    } else {
      return (this.dbConnections[url] = new DbConnection(url));
    }
  }
}
