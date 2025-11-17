const Sidebar = ({ points, onAddPoint }) => {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, width: 250, background: "#fff", height: "100%", padding: "1rem" }}>
      <h3>Pontos</h3>
      <ul>
        {points.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
      <button onClick={onAddPoint} style={{ marginTop: "1rem" }}>Adicionar ponto</button>
    </div>
  );
};

export default Sidebar; 
