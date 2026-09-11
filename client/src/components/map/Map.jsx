import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import { parseCoord, withMapCoords } from "../../lib/geo";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FitPins({ positions }) {
  const map = useMap();
  const boundsKey = positions.map((point) => point.join(",")).join("|");

  useEffect(() => {
    if (!positions.length) return;
    if (positions.length === 1) {
      map.setView(positions[0], 12);
      return;
    }
    map.fitBounds(positions, { padding: [40, 40], maxZoom: 13 });
  }, [map, boundsKey]);

  return null;
}

function Map({ items }) {
  const pins = (items || []).map((item, index) => withMapCoords(item, index));
  const positions = pins
    .map((item) => [parseCoord(item.latitude), parseCoord(item.longitude)])
    .filter(([lat, lng]) => lat !== null && lng !== null);
  const center = positions[0] || [29.7604, -95.3698];

  return (
    <MapContainer
      key={center.join(",")}
      center={center}
      zoom={positions.length ? 12 : 7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitPins positions={positions} />
      {pins.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
