export interface Source {
  currentTemperature(): Promise<number>;
}
