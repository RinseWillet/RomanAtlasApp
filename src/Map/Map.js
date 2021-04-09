import React, {useRef, useState, useEffect} from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";


//in deze constante wordt de MapContext geladen en met de useEffects wordt het map object geïnitialiseerd en opgeslagen in de huidige staat.
//in het mapObject wordt alle interactie met de OpenLayers API gedaan
// twee useEffects onderaan dealen met nieuwe zoom en centreer eigenschappen.
const Map = ({ children, zoom, center }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    //als het component gemount wordt
    useEffect(() => {
        let options = {
            view: new ol.View({ zoom, center }),
            layers: [],
            controls: [],
            overlays: []
        };
        let mapObject = new ol.Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        //deze lijn zorgt dat het mapObject wordt weggewerkt als het component unmounted wordt.
        return () => mapObject.setTarget(undefined);
    }, []);

    // om veranderende zoomniveaus in te stellen
    useEffect(() => {
        if(!map) return;
        map.getView().setZoom(zoom);
    }, [zoom]);
    
    //om met nieuwe centreerpunten voor de kaart om te gaan
    useEffect(() => {
        if(!map) return;
        map.getView().setCenter(center)
    }, [center])
    return (
        <MapContext.Provider value = {{map}}>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;