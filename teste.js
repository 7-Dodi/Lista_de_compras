//Criando um vetor com os dados que estão armazenados no Local Storage
const array = JSON.parse(localStorage.getItem("lista"));

//Caso não tenha nenhum dado armazenado no Local Storage
if(array == null ){
    array = [];
}

//Buscando os elementos do HTML, responsáveis pela interação
const adicionar = document.querySelector("#adcItem");
const tabela = document.querySelector("table");

//Função para adicionar os itens no vetor, e logo após adicioná-los no Local Storage
function adicionarItem (item) {
    array.push(item);
    localStorage.setItem("lista", JSON.stringify(array));
    alert("Produto adicionado");

    const name = document.querySelector("#name").value = "";
    const valor = document.querySelector("#valor").value = "";
}

//Função para remover os itens do Local Storage
function removerItem (item){
    array.splice(item, 1);
    localStorage.setItem("lista", JSON.stringify(array));
    alert("Produto removido");
    listarItem();
}

//Função para concluir item
function concluirItem (item){
    alert("Produto comprado");
    item.style.backgroundColor = '#5f985e';
    item.style.color = "#fff";
}

//Função para imprimir os itens na tela
function listarItem (){
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
        buttonRemover.addEventListener("click", ()=>{
            removerItem(i);
        });
        
        //Especificação do checkbox para a comprar do item
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("click", ()=>{
            concluirItem(tr);
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
    }
}

//Event Listener para adicionar os itens
adicionar.addEventListener("click", ()=>{
    const name = document.querySelector("#name").value;
    const valor = document.querySelector("#valor").value;

    const item ={
        nome: name,
        value: valor,
    }

    adicionarItem(item);
    listarItem();
});

//Evento load para sempre imprimir os itens do Local Storage
window.addEventListener("load", ()=>{
    listarItem();
});