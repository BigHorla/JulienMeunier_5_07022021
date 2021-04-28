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

let colorChoice = "";

displayProductInfo();
checkPanier();
getColors();
