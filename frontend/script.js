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
    const resposta = await fetch(`http://localhost:3000/contatos?q=${encodeURIComponent(filtro)}`);
    const contatos = await resposta.json();

    const tabela = document.getElementById('tabela-contatos');
    tabela.innerHTML = '';

    contatos.forEach(contato => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.telefone}</td>
            <td>${contato.email}</td>
            <td>${contato.endereco}</td>
            <td>
                <button onclick="editarContato(${contato.id})">✏️</button>
                <button onclick="excluirContato(${contato.id})">🗑️</button>
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
