const express = require('express');
const router = express.Router();
const {
  getContatos,
  getContatoById,
  addContato,
  updateContato,
  deleteContato
} = require('../models/contatosModel');

router.get('/', async (req, res) => {
  const contatos = await getContatos();
  res.json(contatos);
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
