import {useContext, useEffect} from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";

//component voor een VectorLayer
const VectorLayer = ({ source, style, zIndex = 0 }) => {
    const { map } = useContext(MapContext);
    useEffect(() => {
      if (!map) return;
      let vectorLayer = new OLVectorLayer({
        source,
        style
      });
      //laag aan map context om die vervolgens aan het map Object in deze context met useEffect
      map.addLayer(vectorLayer);
      vectorLayer.setZIndex(zIndex);
      return () => {
        if (map) {
            //wanneer unmounted wordt de laag verwijderd
          map.removeLayer(vectorLayer);
        }
      };
    }, [map]);
    return null;
  };
  export default VectorLayer;