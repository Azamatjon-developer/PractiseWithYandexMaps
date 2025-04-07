import React, { useState } from "react";
import { YMaps, Map, useYMaps } from "@pbe/react-yandex-maps";
import styled from "styled-components";
import config from "../config/config.json";

const MapStyled = styled(Map)`
  margin: 0 auto;
  width: 90%;
  height: 800px;
`;

const center = [41.232671625239085, 69.22441639999997];
const zoom = 12;

const MapComponents = () => {
  const [coordinate, setCoordinate] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <div>
      <YMaps query={{ apikey: config.YANDEX_API_KEY }}>
        <MapContent 
          setCoordinate={setCoordinate} 
          setAddress={setAddress}
          coordinate={coordinate}
          address={address}
        />
      </YMaps>
    </div>
  );
};

const MapContent = ({ setCoordinate, setAddress }) => {
  const ymaps = useYMaps(["geocode"]); // Endi bu YMaps ichida

  const handleClickMap = async (e) => {
    const coords = e.get("coords");
    if (coords) {
      setCoordinate(coords);
    }

    if (ymaps) {
      try {
        const res = await ymaps.geocode(coords);
        const foundAddress = handleGeoResult(res);
        setAddress(foundAddress);
        console.log("Address:", foundAddress);
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    }
  };

  function handleGeoResult(result) {
    const firstGeoObject = result.geoObjects.get(0);

    if (firstGeoObject) {
      const properties = firstGeoObject.properties;
      
      const location = properties.get("description") || "";
      const route = properties.get("name") || "";
      
      const foundAddress = {
        location,
        route,
        fullAddress: firstGeoObject.getAddressLine() || ""
      };
      
      return foundAddress;
    }
    return null;
  }

  return (
    <div>
      <MapStyled
        defaultState={{
          center: center,
          zoom: zoom,
        }}
        onClick={(e) => handleClickMap(e)}
      />
      
    </div>
  );
};

export default MapComponents;