const minusBtn = document.getElementById("selectQuantity__minus");
const plusBtn = document.getElementById("selectQuantity__plus");

minusBtn.addEventListener("click", function () {
  const displayQuantity = document.getElementById("selectQuantity__quantity");
  if (displayQuantity.textContent != "0") {
    displayQuantity.textContent = parseInt(displayQuantity.textContent, 10) - 1;
  }
});
plusBtn.addEventListener("click", function () {
  const displayQuantity = document.getElementById("selectQuantity__quantity");
  displayQuantity.textContent = parseInt(displayQuantity.textContent, 10) + 1;
});

let product;
let colorChoice = "";
product_id = new URL(window.location.href).searchParams.get("_id");

//Pour les navigateur avec fetch
if (window.fetch) {
  fetch("http://localhost:3000/api/teddies/"+product_id)
    .then((response) => response.json())
    .then((response) => {
      product = response;
      displayProductInfo(product);
      getColors(product.colors);
    });
} else {//pour les navugateur sans fetch
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      catalogue = JSON.parse(this.responseText); //Création du catalogue de produit
      console.log(
        "Catalogue chargé, " + catalogue.length + " article(s) trouvé(s) :"
      );
      product = response;
      displayProductInfo(product);
      getColors(product.colors);
    }
  };
  request.open("GET", "http://localhost:3000/api/teddies/"+product_id);
  request.send();
}
checkPanier();

