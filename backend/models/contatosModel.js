const db = require('../db');

async function getContatos() {
  const result = await db.query('SELECT * FROM contatos ORDER BY id DESC');
  return result.rows;
}

async function getContatoById(id) {
  const result = await db.query('SELECT * FROM contatos WHERE id = $1', [id]);
  return result.rows[0];
}

async function addContato(contato) {
  const { nome, telefone, email, endereco } = contato;
  await db.query(
    'INSERT INTO contatos (nome, telefone, email, endereco) VALUES ($1, $2, $3, $4)',
    [nome, telefone, email, endereco]
  );
}

async function updateContato(id, contato) {
  const { nome, telefone, email, endereco } = contato;
  await db.query(
    'UPDATE contatos SET nome = $1, telefone = $2, email = $3, endereco = $4 WHERE id = $5',
    [nome, telefone, email, endereco, id]
  );
}

async function deleteContato(id) {
  await db.query('DELETE FROM contatos WHERE id = $1', [id]);
}

module.exports = {
  getContatos,
  getContatoById,
  addContato,
  updateContato,
  deleteContato,
};
