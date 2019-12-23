import * as rp from "request-promise-native";

import { RequestOptionsFactory } from "../Utils/Request";
import { Source } from "./Source";

export interface MeteoForecastTimestamp {
  forecastTimeUtc: string;
  airTemperature: number;
  windSpeed: number;
  windGust: number;
  windDirection: number;
  cloudCover: number;
  seaLevelPressure: number;
  totalPrecipitation: number;
  conditionCode: string;
}

/**
 * Response from meteo.lt
 */
export interface MeteoResponse {
  place: {
    code: string;
    name: string;
    administrativeDivision: string;
    country: string;
    countryCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  forecastType: string;
  forecastCreationTimeUtc: string;
  forecastTimestamps: MeteoForecastTimestamp[];
}

/**
 * MeteoResponse to Source adapter
 */
export class Meteo implements Source {
  private city: string;

  constructor(city: string) {
    this.city = city;
  }
  public async currentTemperature() {
    const data = (await rp(RequestOptionsFactory.createOptions("GET", `https://api.meteo.lt/v1/places/${this.city}/forecasts/long-term`))) as MeteoResponse;
    return data.forecastTimestamps[0]?.airTemperature;
  }
}
