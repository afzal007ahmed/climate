export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const weatherMain: Record<string, string> = {
  Rain: "/rain (1).png",
  Thunderstorm: "/storm.png",
  Drizzle: "/rain.png",
  Snow: "/snow.png",
  Mist: "/fog (1).png",
  Smoke: "/smoke.png",
  Haze: "/fog.png",
  Dust: "/fog (2).png",
  Fog: "/fog.png",
  Sand: "/sand.png",
  Ash: "/ashes.png",
  Squall: "/tornado.png",
  Tornado: "/tornado.png",
  Clear: "/sun.png",
  Clouds: "/cloudy.png",
};



export const colors = [ 'text-red-600' , 'text-green-600' , 'text-yellow-600' , 'text-blue-600' , 'text-orange-600' ]
