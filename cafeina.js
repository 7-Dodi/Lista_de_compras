//Criando um vetor com os dados que estão armazenados no Local Storage
let array = JSON.parse(localStorage.getItem("lista"));

//Caso não tenha nenhum dado armazenado no Local Storage
if (array == null) {
  array = [];
}

//Buscando os elementos do HTML, responsáveis pela interação
const adicionar = document.querySelector("#adcItem");
const tabela = document.querySelector("table");
const nome = document.querySelector("#name");
const valor = document.querySelector("#valor");

//Função para adicionar os itens no vetor, e logo após adicioná-los no Local Storage
function adicionarItem(item) {
  array.push(item);
  localStorage.setItem("lista", JSON.stringify(array));
  alert("Produto adicionado");

  //Logo após ser adicionado, limpar os campos de texto
  nome.value = "";
  valor.value = "";
}

//Função para remover os itens do Local Storage
function removerItem(item) {
  array.splice(item, 1);
  localStorage.setItem("lista", JSON.stringify(array));
  alert("Produto removido");
  listarItem();
}

//Função para concluir item
function concluirItem(item, checkbox, arr, i) {
  //Item: O TR do produto;
  //Checkbox: Referente ao estado do checkbox;
  //ARR: Dados do produto modificado;
  //I: índece do produto que será modificado;
  if (checkbox.checked) { //Caso o estado do CheckBox seja TRUE;
    alert("Produto comprado");
    item.style.backgroundColor = "#5f985e";
    item.style.color = "#fff";
  } else { //Caso contrário
    alert("Produto não comprado");
    item.style.backgroundColor = "";
    item.style.color = "";
  }
  array[i] = arr; //Modificar o campo do produto com as especificações
  localStorage.setItem("lista", JSON.stringify(array)); //Salvá-lo
}

//Função para imprimir os itens na tela
function listarItem() {
  tabela.textContent = " ";

  let lista = JSON.parse(localStorage.getItem("lista"));

  //Adicionando os títulos das linhas da tabela
  let trTitle = document.createElement("tr");
  let nomeTitle = document.createElement("th");
  let valorTitle = document.createElement("th");
  let concTitle = document.createElement("th");
  let removerTitle = document.createElement("th");

  tabela.appendChild(trTitle);
  trTitle.appendChild(nomeTitle);
  trTitle.appendChild(valorTitle);
  trTitle.appendChild(concTitle);
  trTitle.appendChild(removerTitle);

  nomeTitle.textContent = "Nome";
  valorTitle.textContent = "Valor";
  concTitle.textContent = "Comprado";
  removerTitle.textContent = "Remover";

  for (let i in lista) {
    let arr = JSON.parse(localStorage.getItem("lista"));
    arr = arr[i];

    //Criando elementos da tabela
    let tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdValor = document.createElement("td");
    let tdComprar = document.createElement("td");
    let tdRemover = document.createElement("td");

    //Especificações do button para remoção dos itens
    let buttonRemover = document.createElement("button");
    buttonRemover.textContent = "Remover";
    buttonRemover.classList.add("removerButton");
    buttonRemover.addEventListener("click", () => {
      removerItem(i);
    });

    //Especificação do checkbox para a comprar do item
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("click", () => {
      //Modificando o campo da situação do Checkbox
      if (checkbox.checked) {
        arr.checkbox = 1;
      } else {
        arr.checkbox = null;
      }
      concluirItem(tr, checkbox, arr, i);
    });

    //Organização dos arquivos
    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tr.appendChild(tdComprar);
    tdComprar.appendChild(checkbox);
    tr.appendChild(tdRemover);
    tdRemover.appendChild(buttonRemover);
    tabela.appendChild(tr);

    tdNome.textContent = arr.nome;
    tdValor.textContent = `R$ ${arr.value}`;

    //Para garantir a edição dos produtos
    if (arr.checkbox != null) {
      tr.style.backgroundColor = "#5f985e";
      tr.style.color = "#fff";
      checkbox.checked = true;
    } else {
      tr.style.backgroundColor = "";
      tr.style.color = "";
      checkbox.checked = false;
    }
  }
}

//Event Listener para adicionar os itens
adicionar.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const valor = document.querySelector("#valor").value;

  const item = {
    nome: name,
    value: valor,
    checkbox: null
  };

  adicionarItem(item);
  listarItem();
});

//Evento load para sempre imprimir os itens do Local Storage
window.addEventListener("load", () => {
  listarItem();
});
