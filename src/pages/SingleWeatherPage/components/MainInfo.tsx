import type { RootState } from "@/store/RootReducer";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { ForecastItem } from "../utils/utils";

const MainInfo = ({ date, time }: { date: number; time: number }) => {
  const forecast = useSelector((state: RootState) => state.reducerForecast);
  const details = useMemo(() => {
    const arr = forecast?.data?.list.filter(
      (item: ForecastItem) =>
        item.dt_txt.slice(8, 10) === date.toString() &&
        Number(item.dt_txt.slice(11, 13)) === time
    );
    return arr?.[0];
  }, [date, time]);

  return details ? (
    <div className="flex-1 shrink-0">
      {/*temperature details*/}
      <section className="border border-gray-300 rounded-lg p-3 shadow-lg">
        <h1 className="font-bold flex">
          Temperature ({details?.weather[0].main}
          <img
            src={
              details?.weather[0].icon
                ? `https://openweathermap.org/img/wn/${details?.weather[0].icon}.png`
                : undefined
            }
            alt="icon"
            className="w-[20px]"
          />
          )
        </h1>
        <span className="mb-3 inline-block text-sm font-medium">
          ({details?.weather[0].description})
        </span>
        <p>
          <span className="text-sm font-bold">
            Temperature in <sup>o</sup> C :
          </span>{" "}
          {Math.round((details?.main?.temp || 0) - 273.15)}
        </p>
        <p>
          <span className="text-sm font-bold">Feels like :</span>{" "}
          {Math.round((details?.main?.feels_like || 0) - 273.15)}
        </p>
        <p>
          <span className="text-sm font-bold">Humidity :</span>{" "}
          {details?.main?.humidity || "N/A"}
        </p>
        <p>
          <span className="text-sm font-bold">Max :</span>{" "}
          {Math.round((details?.main?.temp_max || 0) - 273.15)}
        </p>
        <p>
          <span className="text-sm font-bold">Min :</span>{" "}
          {Math.round((details?.main?.temp_min || 0) - 273.15)}
        </p>
        <p>
          <span className="text-sm font-bold">Pressure :</span>{" "}
          {details?.main.pressure}
        </p>
        <p>
          <span className="text-sm font-bold">Sea Level :</span>{" "}
          {details?.main.sea_level}
        </p>
        <p>
          <span className="text-sm font-bold">Ground Level :</span>{" "}
          {details?.main.grnd_level}
        </p>
      </section>
      <section className="border border-gray-300 rounded-lg p-3 shadow-lg my-2">
        <h1 className="font-bold flex">Wind</h1>
        <p>
          <span className="text-sm font-bold">Speed in m/s :</span>{" "}
          {details?.wind.speed || "N/A"}
        </p>
        <p>
          <span className="text-sm font-bold">Degree :</span>{" "}
          {details?.wind.deg || "N/A"}
        </p>
        <p>
          <span className="text-sm font-bold">Gusts :</span>{" "}
          {details?.wind.gust || "N/A"}
        </p>
      </section>
    </div>
  ) : (
    <div>No data found.</div>
  );
};

export default MainInfo;
