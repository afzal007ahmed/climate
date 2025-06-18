import { useEffect, useMemo, useState } from "react";
import { hourToSlabIndex, monthDays } from "./utils/utils";
import TabNavigation from "./components/TabNavigation";
import Map from "./components/Map";
import { useParams } from "react-router";
import type { LatLngExpression } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootReducer";
import { fetchForecast } from "./redux/sliceForcat";
import DateNavigation from "./components/DateNavigation";
import MainInfo from "./components/MainInfo";
import Loading from "@/components/Loading/Loading";

const ScreenSingleWeatherPage = () => {
  const date = new Date();
  const dispatch = useDispatch();
  const forecast = useSelector((state: RootState) => state.reducerForecast);
  const { lat, lng } = useParams();
  const [index, setIndex] = useState(
    localStorage.getItem("index") != null
      ? Number(localStorage.getItem("index"))
      : 0
  );
  const dateDetails = [0, 3, 6, 9, 12, 15, 18, 21];
  const [indexTime, setIndexTime] = useState(hourToSlabIndex[date.getHours()]);
  if (!localStorage.getItem("index")) {
    localStorage.setItem("index", index.toString());
  }

  // date details
  useEffect(() => {
    document.title = 'Loading...'
    dispatch(fetchForecast({ lat: Number(lat), lng: Number(lng) }));
    return () => {
      localStorage.removeItem("index");
    };
  }, []);

  //index of date changes based on date
  useEffect(() => {
    setIndexTime(
      date.getDate() === arrayForHeading[index].date
        ? hourToSlabIndex[date.getHours()]
        : 0
    );
  }, [index]);
  
  //document title 
  useEffect(() => {
     if( forecast.data) {
        document.title = forecast.data.city.name;
     }
  },[forecast])

  // storing date index to localStorage
  useEffect(() => {
    localStorage.setItem("index", index.toString());
  }, [index]);

  //mapping dates
  const arrayForHeading = useMemo(() => {
    let count = 1;
    let arr: Record<string, number>[] = [
      {
        date: date.getDate(),
        day: date.getDay(),
        month: date.getMonth(),
      },
    ];

    for (; count < 5; count++) {
      if (monthDays[arr[count - 1].month] === arr[count - 1].date) {
        arr[count] = {
          date: 1,
          day: (arr[count - 1].day % 7) + 1,
          month: (arr[count - 1].month % 12) + 1,
        };
      } else {
        arr[count] = {
          date: arr[count - 1].date + 1,
          day: (arr[count - 1].day % 7) + 1,
          month: arr[count - 1].month,
        };
      }
    }
    return arr;
  }, [date]);

  return (
    <div className="w-full">
      <TabNavigation
        details={arrayForHeading}
        index={index}
        setIndex={setIndex}
      />
      <DateNavigation
        setIndex={setIndexTime}
        details={dateDetails}
        index={indexTime}
        indexForDate={index}
        dateDetails={arrayForHeading}
      />
      {!forecast.loading && forecast.data ? (
        <div className="flex p-4 h-auto flex-wrap gap-3 items-start">
          <div className="flex-1">
            <MainInfo
              date={arrayForHeading[index].date}
              time={dateDetails[indexTime]}
            />
          </div>
          <div className="min-w-[300px] w-full max-w-[500px] shrink-0 shadow-xl p-3 rounded-lg border border-gray-200">
            <div className="my-4">
              <h1 className="text-xl font-bold text-center my-2">
                Location Details
              </h1>
              <p>
                <span className="font-bold">Name :</span>{" "}
                {forecast.data?.city.name}
              </p>
              <p>
                <span className="font-bold">Country :</span>{" "}
                {forecast.data?.city.country}
              </p>
              <p>
                <span className="font-bold">Population :</span>{" "}
                {forecast.data?.city.population === 0
                  ? "N/A"
                  : forecast.data?.city.population}
              </p>
              <p>
                <span className="font-bold">Latitude :</span> {lat}
              </p>
              <p>
                <span className="font-bold">Longitude :</span> {lng}
              </p>
            </div>
            <Map center={[Number(lat), Number(lng)] as LatLngExpression} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ScreenSingleWeatherPage;
