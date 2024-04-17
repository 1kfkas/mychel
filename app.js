const listaAtributos = new Map();

function addAtributo() {
  const caixaDeTexto = document.getElementById("set-atributo");
  
  if(listaAtributos.has(caixaDeTexto.value) == false && caixaDeTexto.value != ""){
    const newDiv = document.createElement("div");

    newDiv.classList.add("atributo-item");
    newDiv.id = caixaDeTexto.value;

    const currentDiv = document.getElementById("atributos");
    newDiv.addEventListener("click", (e) => {
      let idSelf = e.target.id;
      listaAtributos.delete(String(idSelf));
      currentDiv.removeChild(document.getElementById(idSelf));
    });

    const newContent = document.createTextNode(caixaDeTexto.value);
    newDiv.appendChild(newContent);

    currentDiv.appendChild(newDiv);
    listaAtributos.set(String(newDiv.id), String(caixaDeTexto.value));
    caixaDeTexto.value = "";
  } else {
    $("#naopode-atributo").show();
    $("#naopode-atributo").fadeOut(1000);
  }
}

/*
document.getElementById("set-atributo").addEventListener("keypress", function(event){
  console.log("Allou");
  
});
*/

$("#set-atributo").ready(function(){
  document.getElementById("set-atributo").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
      event.preventDefault();
      addAtributo();
    }
  });
});
