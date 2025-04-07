import React from "react";
import { Map, YMaps } from "@pbe/react-yandex-maps";

const MapComponents = () => {
  return (
    <div>
      <YMaps>
        <div>My awesome application with maps!</div>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
      </YMaps>
    </div>
  );
};

export default MapComponents;
