export const monthDays: Record<number, number> = {
  1: 31,  // January
  2: 28,  // February
  3: 31,  // March
  4: 30,  // April
  5: 31,  // May
  6: 30,  // June
  7: 31,  // July
  8: 31,  // August
  9: 30,  // September
  10: 31, // October
  11: 30, // November
  12: 31, // December
};


export const dayNames: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};


export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  sys: {
    pod: "d" | "n";
  };
  dt_txt: string; // "2025-06-13 12:00:00"
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export const forecastSlabs = [0, 3, 6, 9, 12, 15, 18, 21];


export const  timeFormat : Record<number,string> = {
     0 : '12:00 am',
     3 : '03:00 am',  
     6 : '06:00 am',
     9 : '09:00 am',
     12 : '12:00 pm',
     15 : '03:00 pm',
     18 : '06:00 pm',
     21 : '09:00 pm'     
}

export const hourToSlabIndex: Record<number, number> = {
  0: 0,
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
  8: 2,
  9: 3,
  10: 3,
  11: 3,
  12: 4,
  13: 4,
  14: 4,
  15: 5,
  16: 5,
  17: 5,
  18: 6,
  19: 6,
  20: 6,
  21: 7,
  22: 7,
  23: 7,
};
