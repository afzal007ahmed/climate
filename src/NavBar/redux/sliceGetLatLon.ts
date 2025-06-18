import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {  OpenCageResult } from "../utils/utils";

interface InitialStateProps {
    data : OpenCageResult[] | null ,
    error : string | null ,
    loading : boolean 
}


const initialState : InitialStateProps =  { 
    loading : false ,
    data : null ,
    error : null
}

const sliceGetLatLon = createSlice({
    name : 'sliceGetLatLon' ,
    initialState, 
    reducers : {
          fetchGetLatLong : ( state , _action : PayloadAction<string> ) => {
              state.loading = true ;
          },
          fetchGetLatLongSuccess : ( state , action : PayloadAction<OpenCageResult[]>) => {
              state.loading = false ;
              state.data = action.payload ;
          },
          fetchGetLatLongFailed : ( state, action : PayloadAction<string>) => {
              state.loading = false ;
              state.error = action.payload
          },
          clearStateGetLatLong : ( state , _action ) => {
              state.data = null ;
              state.error = null ;
              state.loading = false ;
          }
    }
})


export const { fetchGetLatLong , fetchGetLatLongSuccess , fetchGetLatLongFailed , clearStateGetLatLong} = sliceGetLatLon.actions ;
export default sliceGetLatLon.reducer ;