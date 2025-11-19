import React from "react";

const Sidebar = ({ points, onAddPoint, onDeletePoint }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 250,
        background: "#fff",
        height: "100%",
        padding: "1rem",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>Pontos</h3>

      <ul
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 0,
          listStyle: "none"
        }}
      >
        {points.length === 0 && (
          <li style={{ color: "#777" }}>Nenhum ponto cadastrado</li>
        )}

        {points.map((p) => (
          <li
            key={p.id}
            style={{
              marginBottom: "0.8rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <strong>{p.title}</strong>

            <button
              onClick={() => onDeletePoint(p.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "3px 8px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onAddPoint}
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          cursor: "pointer",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 4
        }}
      >
        Adicionar ponto
      </button>
    </div>
  );
};

export default Sidebar;
