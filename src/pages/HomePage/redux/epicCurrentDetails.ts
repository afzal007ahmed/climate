import {
  catchError,
  debounceTime,
  from,
  map,
  mergeMap,
  of,
  type Observable,
} from "rxjs";
import type { WeatherData } from "../utils/utils";
import axios, { AxiosError } from "axios";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import {
  fetchCurrentDetails,
  fetchCurrentDetailsFailed,
  fetchCurrentDetailsSuccess,
} from "./sliceCurrentDetails";

async function getCurrentDetails(body: {
  lat: number;
  lon: number;
}): Promise<WeatherData> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${body.lat}&lon=${
        body.lon
      }&appid=${import.meta.env.VITE_API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error((error as AxiosError).message);
  }
}

const epicCurrentDetails = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchCurrentDetails.type),
    debounceTime(1500), 
    mergeMap((action) =>
      from(
        getCurrentDetails(
          (action as ReturnType<typeof fetchCurrentDetails>).payload
        )
      ).pipe(
        map((res) => fetchCurrentDetailsSuccess(res)),
        catchError((err) => of(fetchCurrentDetailsFailed(err.message)))
      )
    ),
    catchError((err) => of(fetchCurrentDetailsFailed(err.message)))
  );

export default epicCurrentDetails;
