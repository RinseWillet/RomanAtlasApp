import React, { useContext, useEffect, useState } from "react";
import { FullScreen } from "ol/control";
import MapContext from "../Map/MapContext";

// component voor Fullscreen control -> we stoppen deze in de mapObject via de MapContext
// d.m.v. useEffect
const FullScreenControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({});
    map.controls.push(fullScreenControl);

    //bij unmounting worden de controls ook verwijderd uit het map object.    
    return () => map.controls.remove(fullScreenControl);
  }, [map]);
  return null;
};
export default FullScreenControl;