const express = require('express');
const router = express.Router();
const {
  getContatos,
  getContatoById,
  addContato,
  updateContato,
  deleteContato
} = require('../models/contatosModel');
const pool = require('../db'); // Certifique-se de que isso existe e está configurado

// GET com ou sem filtro de busca
router.get('/', async (req, res) => {
  const { q } = req.query;

  try {
    let result;
    if (q) {
      result = await pool.query(
        `SELECT * FROM contatos WHERE 
         nome ILIKE $1 OR email ILIKE $1 OR telefone ILIKE $1`,
        [`%${q}%`]
      );
    } else {
      result = await pool.query('SELECT * FROM contatos');
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar contatos' });
  }
});

router.get('/:id', async (req, res) => {
  const contato = await getContatoById(req.params.id);
  if (contato) res.json(contato);
  else res.status(404).json({ erro: 'Contato não encontrado' });
});

router.post('/', async (req, res) => {
  await addContato(req.body);
  res.status(201).json({ mensagem: 'Contato criado com sucesso' });
});

router.put('/:id', async (req, res) => {
  await updateContato(req.params.id, req.body);
  res.json({ mensagem: 'Contato atualizado com sucesso' });
});

router.delete('/:id', async (req, res) => {
  await deleteContato(req.params.id);
  res.json({ mensagem: 'Contato excluído com sucesso' });
});

module.exports = router;
