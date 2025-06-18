import epicGetLatLon from '@/NavBar/redux/epicGetLatLon';
import epicCurrentDetails from '@/pages/HomePage/redux/epicCurrentDetails';
import epicForecast from '@/pages/SingleWeatherPage/redux/epicForecast';
import { combineEpics } from 'redux-observable';

const rootEpics = combineEpics(
  epicCurrentDetails,
  epicGetLatLon,
  epicForecast
);

export default rootEpics;
