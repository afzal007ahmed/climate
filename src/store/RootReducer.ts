import { combineReducers } from "@reduxjs/toolkit";
import reducerCurrentDetails from "@/pages/HomePage/redux/sliceCurrentDetails.ts";
import reducerGetLatLon from "@/NavBar/redux/sliceGetLatLon";
import reducerForecast from "@/pages/SingleWeatherPage/redux/sliceForcat";

const rootReducers = combineReducers({
  reducerCurrentDetails,
  reducerGetLatLon,
  reducerForecast,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
