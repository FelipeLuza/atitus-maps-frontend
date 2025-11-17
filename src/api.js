const API_URL = import.meta.env.VITE_API_URL;

export const getPontos = async () => {
  const res = await fetch(`${API_URL}/pontos`);
  return res.json();
};

export const addPonto = async (ponto) => {
  const res = await fetch(`${API_URL}/pontos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ponto),
  });
  return res.json();
};

export const authUser = async (username, password) => {
  const res = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};
