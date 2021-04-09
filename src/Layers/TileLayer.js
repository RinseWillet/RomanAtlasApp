import {useContext, useEffect} from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";

//component voor een TileLayer
const TileLayer = ({ source, zIndex = 0 }) => {
    const {map} = useContext(MapContext);
    useEffect(() => {
        if(!map) return;
        let tileLayer = new OLTileLayer({
            source,
            zIndex,
        });
        //laag aan map context om die vervolgens aan het map Object in deze context met useEffect
        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);
        return () => {
            if(map){
                //wanneer unmounted wordt de laag verwijderd
                map.removeLayer(tileLayer);
            }
        };
    }, [map]);
    return null;
};

export default TileLayer;