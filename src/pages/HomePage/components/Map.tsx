import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';
import type { SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/RootReducer';
import ClickHandler from './ClickHandler';
 

const Map = ({ center , setPosition } : { center : LatLngExpression , setPosition : React.Dispatch<SetStateAction<LatLngExpression>>} ) => {
    const latlong = useSelector(( state : RootState ) => state.reducerGetLatLon ) ;
    return (
    <div className='h-full w-full rounded-xl shadow-lg'>
        <MapContainer center ={center} zoom={13} className='h-full w-full rounded-xl'>
           <TileLayer
            url='https://{s}.baseMaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
           />
           <Marker position={center}>
              <Popup>
                 { latlong?.data?.[0]?.formatted || 'Delhi'}
              </Popup>
           </Marker>
           <ClickHandler setPosition={setPosition} />
        </MapContainer>
    </div>
  )
}

export default Map