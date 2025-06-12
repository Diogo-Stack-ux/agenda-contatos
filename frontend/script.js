document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contato');
  const tabela = document.getElementById('tabela-contatos');
  const buscaInput = document.getElementById('busca');

  let editandoId = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const contato = {
      nome: document.getElementById('nome').value,
      telefone: document.getElementById('telefone').value,
      email: document.getElementById('email').value,
      endereco: document.getElementById('endereco').value
    };

    const url = editandoId
      ? `http://localhost:3000/contatos/${editandoId}`
      : 'http://localhost:3000/contatos';

    const metodo = editandoId ? 'PUT' : 'POST';

    await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contato)
    });

    form.reset();
    editandoId = null;
    carregarContatos();
  });

  buscaInput.addEventListener('input', () => carregarContatos(buscaInput.value));

  async function carregarContatos(filtro = '') {
    const res = await fetch('http://localhost:3000/contatos');
    const contatos = await res.json();

    tabela.innerHTML = '';
    contatos
      .filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()))
      .forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${c.nome}</td>
          <td>${c.telefone}</td>
          <td>${c.email}</td>
          <td>${c.endereco || ''}</td>
          <td>
            <button class="editar" onclick="editarContato(${c.id})">Editar</button>
            <button class="excluir" onclick="excluirContato(${c.id})">Excluir</button>
          </td>
        `;
        tabela.appendChild(tr);
      });
  }

  window.editarContato = async (id) => {
    const res = await fetch(`http://localhost:3000/contatos/${id}`);
    const contato = await res.json();
    document.getElementById('nome').value = contato.nome;
    document.getElementById('telefone').value = contato.telefone;
    document.getElementById('email').value = contato.email;
    document.getElementById('endereco').value = contato.endereco || '';
    editandoId = contato.id;
  };

  window.excluirContato = async (id) => {
    if (confirm('Deseja excluir este contato?')) {
      await fetch(`http://localhost:3000/contatos/${id}`, { method: 'DELETE' });
      carregarContatos();
    }
  };

  carregarContatos();
});
