// Função assíncrona que faz uma requisição POST para a API
// para adicionar um usuário ao banco de dados
const addApi = async (usuario) => {
  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
};

// Seleciona o formulário de cadastro e adiciona um listener de evento
if (document.getElementById("form")) {
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtém os valores do formulário de cadastro
    const user = {
      name: document.getElementById("txNome")?.value,
      email: document.getElementById("txEmail").value,
      senha: document.getElementById("txSenha").value,
    };

    // Confirmação de senha
    const confSenha = document.getElementById("confSenha")?.value;
    if (user.senha === confSenha) {
      // Adiciona o usuário na API e redireciona para a página inicial
      await addApi(user);
      window.location = "/html/index.html";
    } else {
      window.alert("As senhas nao são semelhantes");
    }
  });
}

// Seleciona o formulário de login e adiciona um listener de evento
if (document.getElementById("formulario")) {
  document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();

// Obtém os valores do formulário de login
    const email = document.getElementById("txEmail").value;
    const senha = document.getElementById("txSenha").value;

    // Faz uma requisição GET para a API buscando um usuário com o email fornecido
    const apiResponse = await fetch(`http://localhost:3000/users?email=${email}`);
    const users = await apiResponse.json();

    // Verifica se o email e senha são válidos
    let valid = false;
    users.forEach((user) => {
      if (email === user.email && senha === user.senha) {
        valid = true;

        // Armazena o nome do usuário no armazenamento local do navegador
        localStorage.setItem("userName", user.name);

        // Verifica se o elemento com ID "loginUserName" está disponível
        console.log(document.getElementById("loginUserName"));

        // Atualiza o conteúdo do elemento com ID "loginUserName" para exibir o nome do usuário
        const loginUserNameElement = document.getElementById("loginUserName");
        if (loginUserNameElement) {
          loginUserNameElement.textContent = user.name;
        }

        window.location = "/html/pacientes.html";
      }
    });

    if (!valid) {
      window.alert("[ERRO] Email ou senha incorreto!");
    }
  });
}

window.addEventListener("load", () => {
  // Recupera o nome do usuário do armazenamento local do navegador
  const userName = localStorage.getItem("userName");

  // Verifica se o elemento com ID "loginUserName" está disponível
  const loginUserNameElement = document.getElementById("loginUserName");
  if (loginUserNameElement) {
    // Atualiza o conteúdo do elemento com ID "loginUserName" para exibir o nome do usuário
    loginUserNameElement.textContent = userName;
  }
});

// Função que esconde a primeira div e mostra a segunda
function next() {
  document.getElementById("div1").style.display = "none";
  document.getElementById("div2").style.display = "block";
}

// Abre o modal na página
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

// Fecha o modal na página
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  // Redefine o texto do botão de salvar no modal
  document.querySelector("#formularioModal button[type=submit]").textContent = "Criar";
}

// Envia os dados do paciente para a API
const addPaciente = async (paciente) => {
  await fetch("http://localhost:3000/pacientes", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
};

// Edita os dados de um paciente na API
const editaPaciente = async (id, paciente) => {
  await fetch(`http://localhost:3000/pacientes/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
};

// Deleta um paciente da API
const deletaPaciente = async (id) => {
  await fetch(`http://localhost:3000/pacientes/${id}`, {
    method: "DELETE",
  });
};

// Adiciona um listener para o evento de submit do formulário do modal
const formularioModal = document.getElementById("formularioModal");
if (formularioModal) {
  formularioModal.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Coleta os dados dos campos do formulário do modal
    const paciente = {
      CPF: document.getElementById("cpf").value,
      nome: document.getElementById("nome").value,
      dataNascimento: document.getElementById("dataNasc").value,
      email: document.getElementById("email").value,
      sexoGenero: document.getElementById("sexoGenero").value,
      nacionalidade: document.getElementById("nacionalidade").value,
      naturalidade: document.getElementById("naturalidade").value,
      profissao: document.getElementById("profissao").value,
      escolaridade: document.getElementById("escolaridade").value,
      estadoCivil: document.getElementById("estadoCivil").value,
      mae: document.getElementById("mae").value,
      pai: document.getElementById("pai").value,
    };

    // Verifica se o formulário está sendo usado para criar ou editar um paciente
    const idPaciente = formularioModal.getAttribute("data-id-paciente");
    if (idPaciente) {
      // Se o formulário está sendo usado para editar um paciente, atualiza os dados do paciente na API
      await editaPaciente(idPaciente, paciente);
    } else {
      // Se o formulário está sendo usado para criar um novo paciente, envia os dados do paciente para a API
      await addPaciente(paciente);
    }

    // Fecha o modal após o envio dos dados
    closeModal();
  });
}

const preencheFormularioModal = async (id) => {
  // Busca os dados do paciente na API usando seu ID
  const response = await fetch(`http://localhost:3000/pacientes/${id}`);
  const paciente = await response.json();

  // Preenche os campos do formulário com os dados do paciente
  document.getElementById("cpf").value = paciente.CPF;
  document.getElementById("nome").value = paciente.nome;
  document.getElementById("dataNasc").value = paciente.dataNascimento;
  document.getElementById("email").value = paciente.email;
  document.getElementById("sexoGenero").value = paciente.sexoGenero;
  document.getElementById("nacionalidade").value = paciente.nacionalidade;
  document.getElementById("naturalidade").value = paciente.naturalidade;
  document.getElementById("profissao").value = paciente.profissao;
  document.getElementById("escolaridade").value = paciente.escolaridade;
  document.getElementById("estadoCivil").value = paciente.estadoCivil;
  document.getElementById("mae").value = paciente.mae;
  document.getElementById("pai").value = paciente.pai;

  // Altera o texto do botão de salvar no modal
  document.querySelector("#formularioModal button[type=submit]").textContent = "Salvar alterações";

  // Adiciona o ID do paciente ao formulário para indicar que ele está sendo usado para editar um paciente existente
  formularioModal.setAttribute("data-id-paciente", id);
};

// Função que cria uma nova linha na tabela de pacientes
const criaLinha = (paciente) => {
  const tr = document.createElement("tr");
  const tdId = document.createElement("td");
  const tdNome = document.createElement("td");
  const tdCPF = document.createElement("td");
  const tdfuncoes = document.createElement("td");

  tdId.innerText = paciente.id;
  tdNome.innerText = paciente.nome;
  tdCPF.innerText = paciente.CPF;
  tdfuncoes.innerHTML = `  <button class="btn btn-primary" onclick="preencheFormularioModal(${paciente.id}); openModal()"><img src="/pictures/edit_icon.png"></button>
  <button class="btn btn-danger" onclick="deletaPaciente(${paciente.id})"><img src="/pictures/delete_icon.png" alt=""></button>
  <a href="/html/formulario.html" class="btn btn-warning"><img src="/pictures/form_icon.png" alt=""></a>`;


  tr.appendChild(tdId);
  tr.appendChild(tdNome);
  tr.appendChild(tdCPF);
  tr.appendChild(tdfuncoes);

  return tr;
}

// Função que busca todos os pacientes na API e os exibe na tabela
const exibePacientes = async () => {
  const apiResponse = await fetch("http://localhost:3000/pacientes");
  const pacientes = await apiResponse.json();

  const tbody = document.querySelector("#pacientes tbody");

  pacientes.forEach((paciente) => {
    const tr = criaLinha(paciente);
    tbody.appendChild(tr);
  });
}

// Adiciona um listener para o evento de carregamento da página
window.addEventListener("load", () => {
  exibePacientes();
});

document.getElementById("exit-button").addEventListener("click", () => {
  // Alterna entre exibir e ocultar o modal
  const exitModal = document.getElementById("exit-modal");
  if (exitModal.style.display === "block") {
    exitModal.style.display = "none";
  } else {
    exitModal.style.display = "block";
  }
});
