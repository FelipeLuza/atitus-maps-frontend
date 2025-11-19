import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/ws/restaurante`;

export async function getPoints(token) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.map((p) => ({
      id: p.id,
      title: p.description,
      position: {
        lat: p.latitude,
        lng: p.longitude,
      },
    }));
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar pontos");
  }
}

export async function postPoint(token, pointData) {
  try {
    const response = await axios.post(BASE_URL, pointData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const p = response.data;

    return {
      id: p.id,
      title: p.description,
      position: {
        lat: p.latitude,
        lng: p.longitude,
      },
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao cadastrar ponto");
  }
}

export async function updatePoint(token, id, pointData) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, pointData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const p = response.data;

    return {
      id: p.id,
      title: p.description,
      position: {
        lat: p.latitude,
        lng: p.longitude,
      },
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar ponto");
  }
}

export async function deletePoint(token, id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao remover ponto");
  }
}
