import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
    const ctrl = new MapBoxGeocoder({
        accessToken: process.env.REACT_APP_MAP_TOKEN,
        marker: false,
        collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
    });
    return null;
};

export default Geocoder;