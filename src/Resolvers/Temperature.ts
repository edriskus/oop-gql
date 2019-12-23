import { Context } from "../Utils/Context";
import { Local } from "../Sources/Local";
import { Meteo } from "../Sources/Meteo";
import { Source } from "../Sources/Source";

/**
 * Current Temperature resolver
 * @param _
 * @param param1
 */
export const currentTemperature = (_: any, { city = "", source = "meteo" }) => {
  let sourceAdapter: Source;
  switch (source) {
    case "local":
      sourceAdapter = new Local(city);
      break;
    case "meteo":
    default:
      sourceAdapter = new Meteo(city);
      break;
  }
  return sourceAdapter.currentTemperature();
};

/**
 * Current Temperature mutation
 * @param _
 * @param param1
 * @param param2
 */
export const setCurrentTemperature = async (_: any, { city = "", temperature = 0 }, { dbConnection }: Context) => {
  await (await dbConnection.getClient())
    .db("temperature")
    .collection("cities")
    .updateOne(
      { city },
      { $set: { city, temperature } },
      {
        upsert: true
      }
    );
  return temperature;
};
