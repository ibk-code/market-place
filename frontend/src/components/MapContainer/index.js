import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapContainer = withScriptjs(
  withGoogleMap(({ lat, lng, isMarkerShown }) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>
      {isMarkerShown && <Marker position={{ lat, lng }} />}
    </GoogleMap>
  ))
);

export default MapContainer;
