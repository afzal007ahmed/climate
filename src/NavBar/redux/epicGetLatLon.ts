import axios, { AxiosError } from "axios";
import type {  OpenCageResult } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType, type Epic } from "redux-observable";
import {
  fetchGetLatLong,
  fetchGetLatLongFailed,
  fetchGetLatLongSuccess,
} from "./sliceGetLatLon";
import type { RootState } from "@/store/RootReducer";

async function getLatLon(name: string): Promise<OpenCageResult[]> {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${name}&key=${import.meta.env.VITE_GEO_API_KEY}`
    );
    return response.data.results;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
    throw new Error((err as AxiosError).message);
  }
}

const epicGetLatLon : Epic<Action, Action, RootState> = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchGetLatLong.type),
    mergeMap((action) =>
      from(
        getLatLon((action as ReturnType<typeof fetchGetLatLong>).payload)
      ).pipe(
        map((res) => fetchGetLatLongSuccess(res)),
        catchError((err) => of(fetchGetLatLongFailed(err.message)))
      )
    ),
    catchError((err) => of(fetchGetLatLongFailed(err.message)))
  );


  export default epicGetLatLon ;