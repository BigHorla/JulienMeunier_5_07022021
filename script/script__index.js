const boutique = document.getElementById("magasin");
let catalogue = new Array();

//Pour les navigateur avec fetch
if (window.fetch) {
  fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((response) => {
      catalogue = response;
      miseEnRayon(boutique);//Création du catalogue de produit
      console.log(
        "Catalogue chargé, " + catalogue.length + " article(s) trouvé(s) :"
      );
    });
} else {//pour les navugateur sans fetch
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      catalogue = JSON.parse(this.responseText); //Création du catalogue de produit
      console.log(
        "Catalogue chargé, " + catalogue.length + " article(s) trouvé(s) :"
      );
      console.log(catalogue);
      miseEnRayon(boutique);
    }
  };
  request.open("GET", "http://localhost:3000/api/teddies");
  request.send();
}

checkPanier();
