//Convertie les nombres en prix
const numStr = (a, b) => {
  a = '' + a;
  b = b || ' ';
  let c = '',
      d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (let i = a.length-1; i >= 0; i--) {
    c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
    d++;
  }
  return(c+" €");
}
//Affiche les articles disponibles 
const miseEnRayon = (boutique) =>{
  for(let element of catalogue){
      //----------------------------------------------------------------------------Creation de l'article.card
      newArticle = document.createElement("a");
      newArticle.classList.add("card");
      //----------------------------------------------------------------------------Config des infos dans l'url
      newArticle.setAttribute("href", "product.html?colors="+element.colors
      +"&description="+element.description
      +"&imageUrl="+element.imageUrl
      +"&name="+element.name+"&price="
      +element.price+"&_id="
      +element._id);
      //----------------------------------------------------------------------------Creation du conteneur de l'image
      imageArticleContainer = document.createElement("div");
      imageArticleContainer.classList.add("card__image");
      //----------------------------------------------------------------------------Creation de l'image
      newArticle_Image = document.createElement("img");
      newArticle_Image.setAttribute("src", element.imageUrl);
      //----------------------------------------------------------------------------Nom de l'article
      newArticle__name = document.createElement("h2");
      newArticle__name.textContent = element.name;
      //----------------------------------------------------------------------------Prix de l'article
      newArticle__price = document.createElement("p");
      newArticle__price.textContent = numStr(element.price);
      //----------------------------------------------------------------------------Description de l'article
      newArticle__description = document.createElement("p");
      newArticle__description.textContent = element.description;
      //----------------------------------------------------------------------------Implémentation des éléments
      newArticle.append(imageArticleContainer);
      imageArticleContainer.append(newArticle_Image);
      newArticle.append(newArticle__name);
      newArticle.append(newArticle__price);
      newArticle.append(newArticle__description);      
      boutique.append(newArticle);
  }
}
//Supprime le panier
const deletePanier = () =>{
  localStorage.removeItem("Panier");
}
//Recupère le panier dans le LS
const getPanier = () => {
  return(JSON.parse(localStorage.getItem('Panier')))
}
//Supprime les éléments du panier dont l'utilisateur indique une quantité de zero
const checkRemoves = () => {
  let panier = getPanier();
  let newPanier = [];
  for(let element in panier){
    if(panier[element].quantity != 0){
      newPanier.push(panier[element]);
    }
  }
  if(newPanier.lenght == 0){
    deletePanier();
  }else{
    localStorage.setItem("Panier", JSON.stringify(newPanier));
  }
   
}
//Retourne le nombre d'article dans le panier
const getQuantity = () => {
  let panier = getPanier();
  let count = 0 ;
  for(let element in panier){
    count += parseInt(panier[element].quantity,10);
  }
  return(count);
}
//retourne le prix total du panier
const getTotalPrice = () =>{
  let panier = getPanier();
  let count = 0 ;
  for(let element in panier){
    count += parseInt(panier[element].totalPrice,10);
  }
  return(count);
}
//Affiche le nombre d'article dans le panier sur le bouton "panier"
const checkPanier = () =>{
  checkRemoves();
  if(getQuantity() == 0){
    document.getElementById("panier-btn-content").textContent = "Panier";
  }else{
    document.getElementById("panier-btn-content").textContent = "Panier ("+getQuantity()+")";
  }
}
//Affichage du panier dans "panier.html"
const affichePanier = () =>{

  displayArea = document.getElementById("contenuPanier");
  displayArea.textContent ="";
  let allItems =  getPanier();
  let totalPrice = 0;
  if(allItems === null || allItems == undefined || allItems.length == 0){
    document.getElementById("titre").textContent = "Oh non.."
    document.getElementById("panier").style.display = "none";
    document.getElementById("orderPanier").style.display = "none";
    let sadBear = document.createElement("div");
    sadBear.classList.add("soSad");
    let sadMessage = document.createElement("p");
    sadMessage.textContent = "Votre panier est vide..."
    document.getElementById("MainSection").append(sadBear);
    document.getElementById("MainSection").append(sadMessage);

  }else{
    for(let item in allItems){
      
      //new row in table
      let newRow = document.createElement("tr");
      displayArea.append(newRow);
      //Display item name
      newInput = document.createElement("td");  
      newInput.textContent = allItems[item].name;
      displayArea.append(newInput);
      //Display color choice
      newInput = document.createElement("td");
      let newColor = document.createElement("div");
      newColor.classList.add("panier-color");
      newColor.style.backgroundColor = allItems[item].color;
      newInput.append(newColor);
      displayArea.append(newInput);
      //Display count
      displayArea.append(newInput);
      newInput = document.createElement("td");
      let quantitySelector = document.createElement("input");
      quantitySelector.classList.add("panier-select");
      quantitySelector.setAttribute("type","number");
      quantitySelector.setAttribute("min","0");
      quantitySelector.setAttribute("max","100");
      quantitySelector.setAttribute("value",allItems[item].quantity);
      quantitySelector.setAttribute("indexInBasket",item);
      quantitySelector.addEventListener('change', function() {
        setNewQuantity(item ,parseInt(quantitySelector.value,10));
      })
      newInput.append(quantitySelector);
      /* newInput.textContent = allItems[item].quantity; */
      displayArea.append(newInput);
      //Display price
      newInput = document.createElement("td");
      newInput.textContent = numStr(allItems[item].totalPrice);
      displayArea.append(newInput);
      //Add price to bill
      totalPrice += allItems[item].totalPrice;            
  }
      document.getElementById("totalPrice").textContent = numStr(totalPrice);
      document.getElementById("totalQuantity").textContent = getQuantity()+" article(s)"
  }
}
//Permet de changer la quantité d'article dans un lot, par son indice dans le tableau
const setNewQuantity = (article, newQuantity) => {
  let panier = getPanier();
  panier[article].quantity = newQuantity;
  panier[article].totalPrice = panier[article].quantity*panier[article].price;
  localStorage.setItem("Panier", JSON.stringify(panier));  
  affichePanier();
}
//affiche les infos du produit selectioné sur la page
const displayProductInfo = (product) =>{
  const titre = document.getElementById("titre");
  const image = document.getElementById("fiche-produit__image");
  const nom = document.getElementById("fiche-produit__nom");
  const prix = document.getElementById("fiche-produit__prix");
  const description = document.getElementById("fiche-produit__description");
  const button = document.getElementById("order");

  titre.textContent = "En savoir plus sur "+new URL(window.location.href).searchParams.get("name");
  nom.textContent = new URL(window.location.href).searchParams.get("name");
  prix.textContent = numStr(new URL(window.location.href).searchParams.get("price"));
  description.textContent = new URL(window.location.href).searchParams.get("description");
  image.setAttribute('src', new URL(window.location.href).searchParams.get("imageUrl"));
  button.textContent = "Adopter "+new URL(window.location.href).searchParams.get("name");       
}
//affiche le choix de couleurs en fonction du retour de l'API
const getColors = () =>{
  const colorSection = document.getElementById("colors-section")
  const colorsData = new URL(window.location.href).searchParams.get("colors");
  colors = colorsData.split(',');
  for(let element in colors){
      newColor = document.createElement("div");
      newColor.classList.add("colorViewer");
      newColor.setAttribute("onclick", "chooseColor(\""+colors[element]+"\")")
      newColor.style.backgroundColor = colors[element];

      //! Pour les couleurs qui n'existent pas en mot clé :
      if(colors[element] === "Pale brown"){
          newColor.style.backgroundColor = "#A0522D" ;
      }
      if(colors[element] === "Dark brown"){
          newColor.style.backgroundColor = "#800000" ;
      }
      colorSection.append(newColor);
  }
}
//Permet de selectioner une couleur pour un produit
const chooseColor = (color) =>{
  
  //! Pour les couleurs qui n'existent pas en mot clé :
  /*NB : Les valeurs sont en rgb dans le DOM
  Meme si elles ont été attribuées en Hexadecimal */

  if(color == "Pale brown"){
      colorChoice = "rgb(160, 82, 45)"
  }else if(color == "Dark brown"){
       colorChoice = "rgb(128, 0, 0)";
  }else{
      colorChoice = color;
  }

  let displays = document.getElementsByClassName("colorViewer");
  //Galvaudage des couleurs non séléctionées
  for(let element of displays){
      let colorTest = element.style.backgroundColor;

      if(colorTest != "rgb(160, 82, 45)" || colorTest != "rgb(128, 0, 0)"){

          if(colorTest.toUpperCase() == colorChoice.toUpperCase()){
              //Si c'est la couleur selectionée...
              element.style.opacity = "1";
              document.getElementById("fiche-produit__image").style.borderColor = colorChoice;
          }else{
              //Sinon : Galvaudage ! (mise en "dé-valeur")
              element.style.opacity = "0.4";
          }
          
      }else{// pour les couleur qui n'existe pas en mot clé :

          if(colorTest == "rgb(160, 82, 45)"){// pale brown

              if("rgb(160, 82, 45)" == colorChoice){
                  //Si c'est la couleur selectionée...
                  element.style.opacity = "1";
                  document.getElementById("fiche-produit__image").style.borderColor = "rgb(160, 82, 45)";
              }else{
                  //Sinon : Galvaudage ! (mise en "dé-valeur")
                  element.style.opacity = "0.4";
              }

          }else{//dark brown
              if("rgb(128, 0, 0)" == colorChoice){
                  //Si c'est la couleur selectionée...
                  element.style.opacity = "1";
                  document.getElementById("fiche-produit__image").style.borderColor = "#800000";
              }else{
                  //Sinon : Galvaudage ! (mise en "dé-valeur")
                  element.style.opacity = "0.4";
              }
          }
      }
  }
  document.getElementById("fiche-produit__image").style.borderColor = colorChoice;
}
//Créer un lot contenant les articles identiques
const createBatch = () =>{
  let newBatch = {
      name : new URL(window.location.href).searchParams.get("name"),
      color : colorChoice,
      quantity : parseInt(document.getElementById("selectQuantity__quantity").textContent, 10),
      price : parseInt(new URL(window.location.href).searchParams.get("price"), 10),
      totalPrice : parseInt(document.getElementById("selectQuantity__quantity").textContent, 10)*parseInt(new URL(window.location.href).searchParams.get("price"), 10),
      image : new URL(window.location.href).searchParams.get("imageUrl"),
      _id : new URL(window.location.href).searchParams.get("_id")
  }
  return(newBatch);
}
//Lance une animation de confirmation lors de l'ajout d'un article au panier
const animationConfirmation = async() =>{
  let confirmBox = document.getElementById("add-confirm");
  confirmBox.classList.add("confirmAnimation");

  setTimeout(function(){
      confirmBox.classList.remove("confirmAnimation");
      confirmBox.classList.remove("confirmAnimationText");
  }, 5000);
}
//Permet l'ajout d'article au panier
const ajouterAuPanier = () =>{
  if(colorChoice === "" && document.getElementById("selectQuantity__quantity").textContent === "0"){
      alert("Choisissez une couleur et une quantité pour "+new URL(window.location.href).searchParams.get("name")+" !")
  }else if(colorChoice != "" && document.getElementById("selectQuantity__quantity").textContent === "0"){
      alert("Choisissez une quantité pour "+new URL(window.location.href).searchParams.get("name")+" !")
  }else if(colorChoice === "" && document.getElementById("selectQuantity__quantity").textContent != "0"){
      alert("Choisissez une couleur pour "+new URL(window.location.href).searchParams.get("name")+" !")
  }else{
              
      let panier = getPanier();
      let newBatch = createBatch();
      animationConfirmation();

      if(panier === null || panier === []){    
          console.log(document.getElementById("selectQuantity__quantity").textContent+" "+new URL(window.location.href).searchParams.get("name")+" de couleur \""+colorChoice+"\" ajouté(s) au panier");
          panier = [];
          panier.push(newBatch);
      }else{
          //Si l'élément est déjà présent dans le panier...
          
          if(panier.find(element => element._id == newBatch._id && element.color == newBatch.color) != undefined){
              //modification de la quantité
              let element = panier.find(element => element._id == newBatch._id && element.color == newBatch.color)
              element.quantity += newBatch.quantity;
              element.totalPrice = element.quantity * element.price;
          //sinon...
          }else{
              //ajout de l'article au panier
              panier.push(newBatch);
          }   
      }
      //Sauvegarde du nouveau panier
      localStorage.setItem("Panier", JSON.stringify(panier));  
      checkPanier();     
  }
}