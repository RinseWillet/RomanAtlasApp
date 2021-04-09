import React, { Component, useState } from "react";
import "./App.css";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import cities from "./Data/RAMcities.json";


let styles = {
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0,0,255,0.1)',
    }),
  }),  
};

//stijl punten
let puntStyle = new Style({
  image: new CircleStyle({
     radius: 5,
     fill: new Fill({ color: "red"}),
     stroke: new Stroke({
         color: "black",
         width: 2,
     }),  
  }),
}); 

const App = () => {
  const [center, setCenter] = useState([  30.759620,  38.929473]);
  const [zoom, setZoom] = useState(6);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer
            source={osm()}
            zIndex={0}
          />
          {showLayer1 && (
            <VectorLayer
              source={vector({ features: new GeoJSON().readFeatures(cities, { featureProjection: get('EPSG:3857') }) })}
              style={puntStyle}
            />
          )}
          {/* {showLayer2 && (
            <VectorLayer
              source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
              style={styles.MultiPolygon}
            />
          )} */}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={event => setShowLayer1(event.target.checked)}
        /> Cities and Villages of Roman Imperial times
</div>
      {/* <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={event => setShowLayer2(event.target.checked)}
        /> Wyandotte County</div> */}
    </div>
  );
}

export default App;