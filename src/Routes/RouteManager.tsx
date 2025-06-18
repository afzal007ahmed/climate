import { Route, Routes } from 'react-router'
import { routes } from './routes'
import ScreenHome from '@/pages/HomePage/ScreenHome'
import ScreenSingleWeatherPage from '@/pages/SingleWeatherPage/ScreenSingleWeatherPage'

const RouteManager = () => {
  return (
       <Routes>
        <Route path = {routes.SCREEN_HOME}  element={<ScreenHome/>} />
        <Route path={routes.SCREEN_SINGLE_WEATHER_PAGE} element={<ScreenSingleWeatherPage/>} />
       </Routes>
  )
}

export default RouteManager