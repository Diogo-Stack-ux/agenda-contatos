const express = require('express');
const cors = require('cors');
const app = express();
const contatosRoutes = require('./routes/contatos');

app.use(cors());
app.use(express.json());
app.use('/contatos', contatosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
