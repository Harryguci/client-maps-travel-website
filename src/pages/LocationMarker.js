import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
// import markerIconPng from "leaflet/dist/images/marker-icon.png";

function LocationMarker({
  center,
  points,
  enablePoly,
  currentLocation,
  setPoints,
  setCurrentLocation,
  setAfterLocation,
  setAlertState,
  showMapsControl,
}) {
  const [position, setPosition] = useState(center);

  const map = useMapEvents({
    click(e) {
      // console.log(e.target);
      if (!showMapsControl) {
        setPosition(e.latlng);
        setAfterLocation(currentLocation);
        setCurrentLocation(e.latlng);
        setPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
      }
    },
    keypress(e) {
      if (
        e.originalEvent &&
        e.originalEvent.charCode &&
        e.originalEvent.charCode === 32
      ) {
        map.locate();
        setAlertState({
          variant: "success",
          content: "Detecting location...",
        });

        setTimeout(() => {
          setAlertState({});
        }, 3000);
      }
    },
    locationfound(e) {
      setPosition(e.latlng);
      console.log(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: './marker-location-yellow.png',
          iconSize: [41, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
