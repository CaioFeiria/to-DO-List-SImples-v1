const listaTarefas = document.querySelector("#listaTarefas");
const titulo = document.querySelector("#input_titulo");
const descricao = document.querySelector("#input_descricao");
let arrayTarefas = [];
let tarefaId = 0;
let camposErro = false;

document.querySelector("#btn_adicionar").addEventListener("click", () => {
  if (validarCampos()) {
    const tarefa = {
      id: ++tarefaId,
      titulo: titulo.value,
      descricao: descricao.value,
    };  

    arrayTarefas.push(tarefa);
    criarItemLista();
    limpar();
  }
});

function criarItemLista() {
  listaTarefas.innerHTML = "";

  arrayTarefas.forEach((tarefa) => {
    const itemLista = document.createElement("li");
    itemLista.setAttribute("data-idLi", tarefa.id);
    itemLista.innerHTML = `
            <div>
                <input type="checkbox" class="form-check-input" onclick="liConcluida(this)">
                <span>
                    <strong>${tarefa.id} -</strong> 
                    <strong>${tarefa.titulo}:</strong>
                    ${tarefa.descricao}
                </span>
            </div>
            <button type="button" onclick="excluirTarefa(${tarefa.id})">
                <img src="images/excluir.png" alt="Logo excluir" width="30" height="30">
            </button>
        `;
    listaTarefas.appendChild(itemLista);
  });
}

function limpar() {
  titulo.value = "";
  descricao.value = "";
}

function excluirTarefa(id) {
  for (let i = 0; i < arrayTarefas.length; i++) {
    if (arrayTarefas[i].id === id) {
      if (confirm("Deseja realmente excluir essa tarefa?")) {
      arrayTarefas.splice(i, 1);
      criarItemLista();
      alert("Tarefa excluída com sucesso!");
      break;
      }
    }
  }
}

function liConcluida(inputCheckbox) {
  const div = inputCheckbox.parentNode;
  const span = div.querySelector("span");
  if (inputCheckbox.checked) {
    span.classList.add("feito");
  } else {
    span.classList.remove("feito");
  }
}

function validarCampos(){
  if (titulo.value !== "" && descricao.value !== ""){
    mensagemErro();
    return true;
  } else{
    mensagemErro();
    return false;
  }
}

function mensagemErro(){
  const inputs = document.querySelectorAll("#container_form input");

  inputs.forEach(input => {
    const divPai = input.parentNode;
    const spanExistente = divPai.querySelector(".span_erro");

    if (spanExistente){
      spanExistente.remove();
    }

    if (input.value === ""){
      const spanMensagem = document.createElement("span");

      if (input.placeholder === ""){
        spanMensagem.textContent = "O campo é obrigatório";
      } else{
        spanMensagem.textContent = `Preencha o campo ${input.placeholder}`;
      }

      spanMensagem.classList.add("span_erro");
      divPai.appendChild(spanMensagem);
    }
  });
}