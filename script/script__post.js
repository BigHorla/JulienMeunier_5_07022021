const commandeId = document.getElementById("commandeId");
const nomPrenom = document.getElementById("nomPrenom");
const adressePostale = document.getElementById("adressePostale");
const userlocation = document.getElementById("location");
const emailAdresse = document.getElementById("emailAdresse");
const totalPriceOrder = document.getElementById("totalPriceOrder");

checkRemoves();

let lePanier = getPanier();
let response;
let ids = [];

for (let element of lePanier) {
  ids.push(element._id);
}

let data = {
  contact: {
    firstName: new URL(window.location.href).searchParams.get("prenom"),
    lastName: new URL(window.location.href).searchParams.get("nom"),
    address: new URL(window.location.href).searchParams.get("adresse"),
    city: new URL(window.location.href).searchParams.get("ville"),
    email: new URL(window.location.href).searchParams.get("email"),
  },
  products: ids,
};

if (window.fetch) {
  const orderRequest = fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  orderRequest.then(async (response) => {
    try {
      response = await response.json();
      console.log(response);
      commandeId.textContent = response.orderId;
      nomPrenom.textContent =
        response.contact.firstName + " " + response.contact.lastName;
      adressePostale.textContent = response.contact.address;
      userlocation.textContent =
        new URL(window.location.href).searchParams.get("codePostal") +
        " " +
        response.contact.city;
      emailAdresse.textContent = response.contact.email;
      totalPriceOrder.textContent = "TOTAL : " + numStr(getTotalPrice());
    } catch (e) {
      console.log(e);
    }
  });
} else {
  const orderRequest = new XMLHttpRequest();
  orderRequest.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
      response = JSON.parse(this.responseText);
      console.log(response);
      commandeId.textContent = response.orderId;
      nomPrenom.textContent =
        response.contact.firstName + " " + response.contact.lastName;
      adressePostale.textContent = response.contact.address;
      userlocation.textContent =
        new URL(window.location.href).searchParams.get("codePostal") +
        " " +
        response.contact.city;
      emailAdresse.textContent = response.contact.email;
      totalPriceOrder.textContent = "TOTAL : " + numStr(getTotalPrice());
    }
  };

  orderRequest.open("POST", "http://localhost:3000/api/teddies/order");
  orderRequest.setRequestHeader("Content-Type", "application/json");
  orderRequest.send(JSON.stringify(data));
}
