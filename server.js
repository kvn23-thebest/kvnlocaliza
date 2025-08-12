const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/save-location', (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).send('Dados inválidos');
  }
  const data = { latitude, longitude, timestamp: new Date().toISOString() };
  // Ler o arquivo, ou criar se não existir
  let locations = [];
  try {
    const fileData = fs.readFileSync('locations.json', 'utf8');
    locations = JSON.parse(fileData);
  } catch (err) {
    // arquivo não existe ou vazio
  }
  locations.push(data);
  fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
  res.send('Localização salva com sucesso');
});

app.get('/locations', (req, res) => {
  try {
    const fileData = fs.readFileSync('locations.json', 'utf8');
    const locations = JSON.parse(fileData);
    res.json(locations);
  } catch (err) {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
