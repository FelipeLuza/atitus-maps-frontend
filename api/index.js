import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let pontos = [];

app.get('/pontos', (req, res) => res.json(pontos));

app.post('/pontos', (req, res) => {
  const ponto = req.body;
  pontos.push(ponto);
  res.status(201).json(ponto);
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    res.json({ token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
