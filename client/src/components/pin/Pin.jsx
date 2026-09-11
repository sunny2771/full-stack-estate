import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
import { parseCoord } from "../../lib/geo";

function Pin({ item }) {
  const lat = parseCoord(item.latitude);
  const lng = parseCoord(item.longitude);
  if (lat === null || lng === null) return null;

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images?.[0] || "/noavatar.jpg"} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
