import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "styles/ui/Map.scss";

const MyMap = () => {
    return (
        <div  className="map-container">
            <p>Test</p>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />
            </Map>
        </div>
    );
}
export default MyMap;