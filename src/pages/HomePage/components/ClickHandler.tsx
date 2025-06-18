import type { LatLngExpression } from "leaflet";
import { useMapEvents } from "react-leaflet"

const ClickHandler = ({  setPosition } : { setPosition : React.Dispatch<React.SetStateAction<LatLngExpression>>}) => {
  
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat , e.latlng.lng])
    }
  })
    return null;
}

export default ClickHandler