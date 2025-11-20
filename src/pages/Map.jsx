import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  getPoints,
  postPoint,
  deletePoint,
  updatePoint
} from "../services/restauranteService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";

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
  const [selectedPoint, setSelectedPoint] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints(token);
        setMarkers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    let descricao = prompt("Digite uma descrição para o ponto:");

    if (!descricao) {
      alert("A descrição é obrigatória.");
      return;
    }

    descricao = descricao.trim();

    const descRegex = /[A-Za-zÀ-ÿ]/;

    if (descricao.length < 3 || !descRegex.test(descricao)) {
      alert("Descrição inválida. Digite pelo menos 3 caracteres e use letras.");
      return;
    }

    const newPoint = {
      description: descricao,
      latitude: lat,
      longitude: lng,
    };

    try {
      const savedPoint = await postPoint(token, newPoint);

      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.title,
        position: savedPoint.position,
      };

      setMarkers((prev) => [...prev, savedMarker]);
    } catch (error) {
      alert("Erro ao salvar ponto: " + error.message);
    }
  };

  const handleDeletePoint = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este ponto?")) return;

    try {
      await deletePoint(token, id);
      setMarkers((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      alert("Erro ao deletar ponto: " + error.message);
    }
  };

  const handleUpdatePoint = async (point) => {
    const novaDescricao = prompt("Nova descrição:", point.title);

    if (!novaDescricao || novaDescricao.trim().length < 3) {
      alert("Descrição inválida");
      return;
    }

    try {
      const updated = await updatePoint(token, point.id, {
        description: novaDescricao.trim(),
        latitude: point.position.lat,
        longitude: point.position.lng,
      });

      setMarkers((prev) =>
        prev.map((m) =>
          m.id === point.id ? { ...m, title: updated.title } : m
        )
      );

      setSelectedPoint(null);
    } catch (error) {
      alert("Erro ao atualizar ponto: " + error.message);
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
                onClick={() => setSelectedPoint(marker)}
              />
            ))}
          </GoogleMap>

          {selectedPoint && (
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                padding: "12px 18px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                zIndex: 9999,
              }}
            >
              <strong>{selectedPoint.title}</strong>

              <button
                style={{
                  marginLeft: "15px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleUpdatePoint(selectedPoint)}
              >
                Atualizar
              </button>

              <button
                onClick={() => setSelectedPoint(null)}
                style={{ marginLeft: "10px" }}
              >
                Fechar
              </button>
            </div>
          )}

          <Sidebar
            points={markers}
            onAddPoint={() => alert("Clique no mapa para adicionar um ponto")}
            onDeletePoint={handleDeletePoint}
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
