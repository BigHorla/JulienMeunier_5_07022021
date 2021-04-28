const panier = document.getElementById("panier");
const ficheContact = document.getElementById("orderInformation");
const panierBtn = document.getElementById("orderPanier");

affichePanier();

panierBtn.addEventListener("click", function () {
  panier.style.display = "none";
  panierBtn.style.display = "none";
  ficheContact.style.display = "inherit";
});
