import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";
import Sidebar  from './Sidebar';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchMarkers() {
      try {

        const data = await getPoints(token);

        const formatted = data.map((p) => ({
          id: p.id,
          title: p.description,
          position: {
            lat: p.latitude,
            lng: p.longitude
          }
        }));

        setMarkers(formatted);

      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const descricao = prompt("Digite uma descrição para o ponto:");
    if (!descricao) return;

    const newPoint = {
      latitude: lat,
      longitude: lng,
      description: descricao,
    };

    try {
      const savedPoint = await postPoint(token, newPoint);

      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.description,
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude
        }
      };

      setMarkers((prev) => [...prev, savedMarker]);

    } catch (error) {
      alert("Erro ao salvar ponto: " + error.message);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <Navbar />
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                onClick={() => alert(marker.title)}
              />
            ))}
          </GoogleMap>

          <Sidebar
            points={markers}
            onAddPoint={() =>
              alert("Clique no mapa para adicionar um ponto")
            }
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          Carregando mapa...
        </div>
      )}
    </div>
  );
};
