import React from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import styled from "styled-components";
import config from '../config/config.json';

const MapStyled = styled(Map)`
  margin: 0 auto;
  width: 90%;
  height: 800px;
`;

const center = [41.232671625239085, 69.22441639999997];
const zoom = 12;

const MapComponents = () => {
  return (
    <div>
      <YMaps query={{ apikey: config.YANDEX_API_KEY }}>
        <div>
          <MapStyled
            defaultState={{
              center: center,
              zoom: zoom,
            }}
          />
        </div>
      </YMaps>
    </div>
  );
};

export default MapComponents;