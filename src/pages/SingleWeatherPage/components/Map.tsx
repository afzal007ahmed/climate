import type { LatLngExpression } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

const Map = ({ center } : { center : LatLngExpression }) => {
  return (
    <div className="h-[200px]">
        <MapContainer center={ center } zoom={13} scrollWheelZoom ={ false } dragging={false} className="w-full h-full rounded-lg" >
           <TileLayer
            url='https://{s}.baseMaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
           />
           <Marker position={center}>
            <Popup>
                { document.title } 
            </Popup>
           </Marker>
        </MapContainer>
    </div>  
  )
}

export default Map