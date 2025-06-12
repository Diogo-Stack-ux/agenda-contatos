document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato");
    const tabela = document.getElementById("tabela-contatos");
    const buscaInput = document.getElementById("busca");


  let contatos = [];
  let editandoId = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const contato = {
        id: editandoId ?? Date.now(),
        nome: form.nome.value,
        telefone: form.telefone.value,
        email: form.email.value,
        endereco: form.endereco.value,
    };

    if(editandoId) {
        contatos = contatos.map(c => c.id === editandoId ? contato : C);
        editandoId = null;
    } else {
        contatos.push(contato);
    }

    form.reset();
    renderizarContatos();
});

    buscaInput.addEventListener("input", () => {
    renderizarContatos(buscaInput.value.toLowerCase());
  });

  function renderizarContatos(filtro = "") {
    tabela.innerHTMl = "";
    contatos
    .filter(c => c.nome.tolowerCase().includes(filtro) || c.email.tolowerCase().includes(filtro))
    .forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${c.nome}</td>
        <td>${c.telefone}</td>
        <td>${c.email}</td>
        <td>${c.endereco}</td>
        <td> class= "actions">
        <button onclick="editar(${c.id})">✏️</button>
        <button onclick="excluir(${c.id})">🗑️</button>
        </td>
        `;
        tabela.appendChild(tr);
           });
        }

        
  window.editar = (id) => {
    const contato = contatos.find(c => c.id === id);
    if (contato) {
      form.nome.value = contato.nome;
      form.telefone.value = contato.telefone;
      form.email.value = contato.email;
      form.endereco.value = contato.endereco;
      editandoId = id;
    }
  };

  
  window.excluir = (id) => {
    if (confirm("Deseja excluir este contato?")) {
      contatos = contatos.filter(c => c.id !== id);
      renderizarContatos();
    }
  };
});