const listaAtributos = new Array();

function addAtributo(){
  const caixaDeTexto = document.getElementById("set-atributo");
  
  if(listaAtributos.includes(caixaDeTexto.value) == false && caixaDeTexto.value != ""){
    const newDiv = document.createElement("div");

    newDiv.classList.add("atributo-item");
    newDiv.id = caixaDeTexto.value;

    const currentDiv = document.getElementById("atributos");
    newDiv.addEventListener("click", (e) => {
      let idSelf = e.target.id;
      listaAtributos.splice(listaAtributos.indexOf(String(idSelf)), 1);
      currentDiv.removeChild(document.getElementById(idSelf));
    });

    const newContent = document.createTextNode(caixaDeTexto.value);
    newDiv.appendChild(newContent);

    currentDiv.appendChild(newDiv);
    listaAtributos.push(String(caixaDeTexto.value));
    caixaDeTexto.value = "";
  } else {
    $("#naopode-atributo").show();
    $("#naopode-atributo").fadeOut(1000);
  }
}

function gerarCodigo(){

  // Pega o elemento que mais vai ser usado : "caixa"

  const caixaElement = document.getElementById("caixa");

  // Remove todo o conteúdo da caixa

  if(caixaElement.hasChildNodes()){
    while(caixaElement.firstChild){
      caixaElement.removeChild(caixaElement.firstChild);
    }
  }

  // Inicia o texto da classe

  const classElement = document.getElementById("nome-classe");
  const newClass = document.createElement("p");

  newClass.innerText = "class "+classElement.value+":";
  caixaElement.appendChild(newClass);

  // Faz o __init__

  let newP = "<p>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self";

  listaAtributos.forEach((atributo) => {
    newP += ", "+atributo
  });
  
  newP += "):</p>";

  caixaElement.insertAdjacentHTML('beforeend', newP);

  listaAtributos.forEach((atributo) => {
    const newInitP = "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self."+atributo+" = "+atributo+"</p>";

    caixaElement.insertAdjacentHTML('beforeend', newInitP);
  });

  // Pega umas checkbox

  const getBoxElement = document.getElementById("colocar-gets");
  const setBoxElement = document.getElementById("colocar-sets");

  if(getBoxElement.checked){
    listaAtributos.forEach((atributo) => {
      caixaElement.insertAdjacentHTML('beforeend', "<p></p>");

      const capitalizedAtributo = atributo[0].toUpperCase()+atributo.slice(1);
      const newGetP = "<p>&nbsp;&nbsp;&nbsp;&nbsp;def "+"get"+capitalizedAtributo+"(self):</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self."+atributo+"</p>";
      caixaElement.insertAdjacentHTML('beforeend', newGetP);
    });
  }

  if(setBoxElement.checked){
    listaAtributos.forEach((atributo) => {
      caixaElement.insertAdjacentHTML('beforeend', "<p></p>");

      const capitalizedAtributo = atributo[0].toUpperCase()+atributo.slice(1);
      const newGetP = "<p>&nbsp;&nbsp;&nbsp;&nbsp;def "+"set"+capitalizedAtributo+"(self, "+atributo+"):</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self."+atributo+" = "+atributo+"</p>";
      caixaElement.insertAdjacentHTML('beforeend', newGetP);
    });
  }
}
