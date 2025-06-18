import type { WeatherData } from "../utils/utils";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface InitialStateProps {
    data : WeatherData | null ,
    loading : boolean ,
    error : string | null 
}


const initialState : InitialStateProps = {
    data : null ,
    loading : false ,
    error : null
}


const sliceCurrentDetails = createSlice({
    name : 'sliceCurrentDetails' ,
    initialState,
    reducers : {
        fetchCurrentDetails : ( state , _action : PayloadAction<{ lat : number , lon : number }> ) => {
              state.loading = true ;
        },
        fetchCurrentDetailsSuccess : ( state , action : PayloadAction<WeatherData> ) => {
              state.data = action.payload;
              state.loading = false ;
        },
        fetchCurrentDetailsFailed : ( state , action : PayloadAction<string> ) => {
             state.error = action.payload ;
             state.loading = false ;
        },
        clearStateCurrentDetails : ( state , _action ) => {
             state.data = null ;
             state.error = null ;
             state.loading = false ;
        }
    }
})

export const { fetchCurrentDetails , fetchCurrentDetailsFailed , fetchCurrentDetailsSuccess , clearStateCurrentDetails } = sliceCurrentDetails.actions ;
export default sliceCurrentDetails.reducer ;