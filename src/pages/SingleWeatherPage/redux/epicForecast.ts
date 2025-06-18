import axios, { AxiosError } from "axios";
import type { ForecastResponse } from "../utils/utils";
import { from, mergeMap, type Observable, map, catchError, of, debounceTime } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import {
  fetchForecast,
  fetchForecastFailed,
  fetchForecastSuccess,
} from "./sliceForcat";

async function getForecast(body: {
  lat: number;
  lng: number;
}): Promise<ForecastResponse> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${body.lat}&lon=${
        body.lng
      }&appid=${import.meta.env.VITE_API_KEY}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
    throw new Error((err as AxiosError).message);
  }
}

const epicForecast = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchForecast.type),
    debounceTime(1500),
    mergeMap((action) =>
      from(
        getForecast((action as ReturnType<typeof fetchForecast>).payload)
      ).pipe(
        map((res) => fetchForecastSuccess(res)),
        catchError((err) => of(fetchForecastFailed(err.message)))
      )
    ),
    catchError((err) => of(fetchForecastFailed(err.message)))
  );


  export default epicForecast ;