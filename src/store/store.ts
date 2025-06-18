import { configureStore } from "@reduxjs/toolkit";
import rootReducers, { type RootState } from "./RootReducer";
import { createEpicMiddleware, type Epic } from "redux-observable";
import rootEpics from "./rootEpics";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpics as Epic<unknown, unknown ,  unknown , RootState>);

export default store;
