'use client'

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '15px 0px 0px 15px',
};

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite',
};

const GoogleMapComponent = () => {

    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        console.log('Map is loaded');
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Éxito al obtener la posición
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    navigator.geolocation.watchPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ lat: latitude, lng: longitude });
                    });
                },
                (error) => {
                    // Error al obtener la posición
                    console.error("Error al obtener la geolocalización:", error);
                    // Establecer una ubicación predeterminada si es necesario
                }
            );
        } else {
            console.error("La geolocalización no es compatible con este navegador.");
            // Establecer una ubicación predeterminada si es necesario
        }
    }

    return (
        <div className="w-full">
            {userLocation ? (
                <GoogleMap
                    mapContainerStyle={defaultMapContainerStyle}
                    options={defaultMapOptions}
                    center={userLocation} // Establecer el centro en la ubicación del usuario
                    zoom={15} // Ajustar el nivel de zoom según sea necesario
                >
                    <Marker position={userLocation} />
                </GoogleMap>
            ) : (
                <p>Cargando mapa...</p>
            )}
            <span>posicion latitud: {userLocation?.lat} longitud {userLocation?.lng}</span>
        </div>
    )
};

export default GoogleMapComponent;