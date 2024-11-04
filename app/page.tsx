import MapProvider from './providers/map-providers';
import GoogleMapComponent from './components/map'

export default function Home() {
  return (
    <MapProvider>
      <GoogleMapComponent />
    </MapProvider>
  );
}
