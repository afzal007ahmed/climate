import { Button } from "@/components/ui/button";
import type { RootState } from "@/store/RootReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStateCurrentDetails,
  fetchCurrentDetails,
} from "./redux/sliceCurrentDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { colors, weatherMain } from "./utils/utils";
import { toast } from "sonner";
import Loading from "@/components/Loading/Loading";
import type { LatLngExpression } from "leaflet";
import Map from "./components/Map";
import { useNavigate } from "react-router";
import { routes } from "@/Routes/routes";

const ScreenHome = () => {
  const color = colors[Math.floor(Math.random() * 10) % colors.length];
  const nav = useNavigate() ;
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState<
    LatLngExpression | [number, number]
  >([28.6139, 77.209]);
  const currentDetails = useSelector(
    (state: RootState) => state.reducerCurrentDetails
  );

  const latLong = useSelector((state: RootState) => state.reducerGetLatLon);
  if (currentDetails.data) {
    document.title = currentDetails?.data?.name;
  }
  if (currentDetails.loading) {
    document.title = "Loading...";
  }

  useEffect(() => {
    return () => {
      dispatch(clearStateCurrentDetails({}));
    };
  }, []);

  //to fetch currentdetails of weather

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        fetchCurrentDetails({
          lat: (coordinates as [number, number])[0],
          lon: (coordinates as [number, number])[1],
        })
      );
    }, 500);
  }, [coordinates]);

  //long and lat from city name
  useEffect(() => {
    if (!latLong.data?.length && currentDetails.data) {
      toast("Invalid Place", {
        description: (
          <p className="text-red-600 font-bold">Please enter a valid place</p>
        ),
      });
    } else if (latLong.data && latLong.data[0]?.geometry) {
      setCoordinates([
        Number(latLong?.data?.[0]?.geometry.lat),
        Number(latLong?.data?.[0]?.geometry.lng),
      ]);
    }
  }, [latLong.data]);

  //error if name is wrong
  useEffect(() => {
    if (currentDetails.error) {
      toast("Error Occured", {
        description: (
          <p className="text-red-600 font-bold">{currentDetails.error}</p>
        ),
      });
    }
  }, [currentDetails.error]);

  return !currentDetails.loading && currentDetails.data ? (
    <div>
      <div className="relative my-6 h-[20px] overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className={`band font-bold ${color} h-[20px]`}>
          Use the map to select the loaction for which you want to check the
          weather details. Map is draggable and you can zoom in and out
          smoothly. Give city,country to be more specific.Thanks to Leaflet Map
          , OpenWeather API and OpenCageData API.
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1">
          <h1 className="text-4xl">
            {(currentDetails.data &&
              !currentDetails.loading &&
              currentDetails.data.name) ||
              latLong?.data?.[0].formatted ||
              "Delhi"}
            <span className="text-[25px] flex">
              ({currentDetails.data?.weather[0]?.main || "N/A"}{" "}
              <img
                src={
                  currentDetails.data?.weather[0].icon
                    ? `https://openweathermap.org/img/wn/${currentDetails.data?.weather[0].icon}.png`
                    : undefined
                }
                alt="icon"
                className="w-[20px]"
              />{" "}
              )
            </span>{" "}
          </h1>
          <section className="mt-12 flex gap-2 flex-wrap">
            <section className="border border-gray-300 w-[200px] h-[200px] rounded-lg shadow-lg temp flex flex-col items-center shrink-0 flex-1 min-w-[200px]">
              <h1 className="text-center my-6 font-bold">
                Temperature <sup>o</sup>C
              </h1>
              {!currentDetails.loading && (
                <>
                  <img
                    src={
                      currentDetails.data
                        ? weatherMain[currentDetails.data.weather[0].main]
                        : undefined
                    }
                    alt="icon"
                    className="w-0"
                  />
                  <p className="text-center text-5xl">
                    {currentDetails.data?.main?.temp
                      ? Math.round(currentDetails.data?.main?.temp - 273.15)
                      : "N/A"}
                  </p>
                </>
              )}
              {currentDetails.loading && (
                <Skeleton className="w-[150px] h-[20px]" />
              )}
            </section>
            <section className="border border-gray-300 w-[200px] h-[200px] rounded-lg shadow-lg temp flex flex-col items-center shrink-0 flex-1 min-w-[200px]">
              <h1 className="text-center my-6 font-bold">Wind speed in m/s</h1>
              {!currentDetails.loading && (
                <>
                  <img src="./wind.png" className="w-0" alt="wind-icon" />
                  <p className="text-center text-5xl">
                    {currentDetails?.data?.wind.speed || "N/A"}
                  </p>
                </>
              )}
              {currentDetails.loading && (
                <Skeleton className="w-[150px] h-[20px]" />
              )}
            </section>
            <section className="border border-gray-300 w-[200px] h-[200px] rounded-lg shadow-lg flex justify-center items-center shrink-0 flex-1 min-w-[200px]">
              <Button variant="outline" className="text-red-600 cursor-pointer" onClick={() => nav(routes.SCREEN_SINGLE_WEATHER_PAGE.slice(0 , routes.SCREEN_SINGLE_WEATHER_PAGE.length - 9 ) + (coordinates as [number , number])[ 0 ].toString() + '/' + (coordinates as [number , number])[ 1 ].toString() )}>
                {" "}
                more details{" "}
              </Button>
            </section>
          </section>
        </div>
        <div className="border border-gray-300 flex-1 min-h-[500px] min-w-[300px] shrink-0 rounded-xl">
          <Map
            center={coordinates as LatLngExpression}
            setPosition={setCoordinates}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ScreenHome;
