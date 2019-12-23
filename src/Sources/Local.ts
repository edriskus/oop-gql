import { DbConnection, DbConnetionPool } from "../Utils/Mongo";

import { Source } from "./Source";

/**
 * Response from DB
 */
interface LocalResponse {
  city: string;
  temperature: number;
}

/**
 * LocalResponse to Source adapter
 */
export class Local implements Source {
  private city: string;
  private dbConnection: DbConnection;

  constructor(city: string) {
    this.city = city;
    const pool = DbConnetionPool.getInstance();
    this.dbConnection = pool.getConnection(process.env.MONGO_URL);
  }
  public async currentTemperature() {
    const data = (await (await this.dbConnection.getClient())
      .db("temperature")
      .collection("cities")
      .findOne({ city: this.city })) as LocalResponse;
    return data?.temperature;
  }
}
