import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ForecastResponse } from "../utils/utils";


interface InitialStateProps {
    data : ForecastResponse | null , 
    error : string | null ,
    loading : boolean 
}

const initialState : InitialStateProps = {
    loading : false ,
    error : null ,
    data : null 
}

const sliceForrcast = createSlice({
    name : 'sliceForecast' , 
    initialState ,
    reducers : { 
        fetchForecast : ( state , _action : PayloadAction<{ lat :  number, lng : number }> ) => {
            state.loading = true ;
        },
        fetchForecastSuccess : ( state , action : PayloadAction<ForecastResponse> ) => {
            state.loading = false ;
            state.data = action.payload ;
        },
        fetchForecastFailed : ( state , action : PayloadAction<string> ) => {
            state.error = action.payload ;
            state.loading = false; 
        },
        clearStateFetchForecast : ( state , _action ) => {
            state.data = null ;
            state.error = null ;
            state.loading = false ;
        }

    }
})


export const { fetchForecast , fetchForecastFailed , fetchForecastSuccess , clearStateFetchForecast } = sliceForrcast.actions ;
export default  sliceForrcast.reducer ; 