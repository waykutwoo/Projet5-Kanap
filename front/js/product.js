// Récupérer l’id du produit à afficher ayant été cliqué sur la page d’accueil
import { url_api } from "./utils.js";

// stock l’URL de la page actuelle dans une variable appelée 'currentPageUrl
// crée un nouvel objet 'URLcurrentPageUrl. Cet objet URL permet d’analyser et de manipuler facilement l’URL de la page actuelle
// opérations pour récupérer l’ID du produit à partir de l’URL de la page actuelle
// la constante currentPageUrl est définie en utilisant la propriété location de l’objet window pour récupérer l’URL complète de la page actuelle
// un nouvel objet URL est créé à l’aide de cette URL, et la méthode searchParams de cet objet est utilisée pour récupérer les paramètres de recherche de l’URL
// la méthode get"id", qui est l’ID du produit,cette valeur est stockée dans la constante productId.
const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const productId = url.searchParams.get("id");

// Crée un nouvel élément html avec l'argument (newTagName) et retourne un nouvel élément de document créé en utilisant le nom de la balise fourni en argument
// cette fonction permet de créer des éléments de document de différents types (paragraphes, images, boutons, etc.) et les ajouter à la page web en fonction des données ou des actions de l’utilisateur
function createTag(newTagName) {
  return document.createElement(newTagName);
}
// Récupère les données de l'API, puis ajoute les éléments html correspondants
// "=" affectation d'une valeur a la variable "i"
// "let" pour cree un objet avec une variable "i" operateur "=" pour lui donner une valeur
// "for et while" utilisation de boucle pour repeter les taches
// "for" boucle qui repete un certain nombre de fois
// "while" boucle vérifie si une condition est true ou s'arret si false
// racourci parametre productList va chercher le nom du produit dans la list de produit
// "``" backtick pour definir une chaine

// fonction remplir la page produit
//  boucle while productId
// La boucle while productList[i]._id) est différent de l’ID du produit recherché (productId). Si c’est le cas, elle incrémente l’index i pour passer au produit suivant dans la liste, et répète cette vérification jusqu’à ce qu’elle trouve un produit dont l’ID correspond à productId.

function fillProductPages() {
  fetch(url_api + "products")
    .then((response) => {
      return response.json();
    })
    .then((productList) => {
      let i = 0;
      while (productList[i]._id !== productId) {
        i++;
      }
      // Racourci "$" et "{}" est une concaténation "``" pour supprimer les "" et les +
      // opérations pour mettre à jour les informations d’un produit sur une page web en fonction de l’ID du produit
      // fonction createTag "img" (image), qui sera utilisé pour afficher l’image du produit
      // méthode getElementsByClassName de l’objet document pour récupérer la première occurrence de l’élément de document ayant la classe "item__img", et ajoute l’élément d’image du produit en tant qu’enfant de cet élément
      // méthode getElementById "title" utilise la propriété textContent de cet élément pour mettre à jour son contenu texte avec le nom du produit correspondant à l’ID spécifié dans la variable productId dans la liste de produits (productList[i])
      // afficher les informations détaillées sur un produit (couleur,titre,prix ect) en fonction de son ID et utiliser les informations du produit pour mettre à jour l’élément de document correspondant sur la page web, afin que l’utilisateur puisse voir le nom du produit sélectionné

      const productImage = createTag("img");
      document.getElementsByClassName("item__img")[0].appendChild(productImage);
      document.getElementById("title").textContent = `${productList[i].name}`;
      document.getElementById("price").textContent = `${productList[i].price}`;
      document.getElementById(
        "description"
      ).textContent = `${productList[i].description}`;
      productImage.src = `${productList[i].imageUrl}`;
      productImage.alt = `${productList[i].altTxt}`;
      let colorNumber = 0;
      for (const colorOption in productList[i].colors) {
        const productOptions = createTag("option");
        document.getElementById("colors").appendChild(productOptions);
        productOptions.value = `${productList[i].colors[colorNumber]}`;
        productOptions.textContent = `${productList[i].colors[colorNumber]}`;
        colorNumber++;
      }
    })
    .catch((err) => {
      var mainElement = document.getElementById("main");
      mainElement.innerHTML =
        "Nous n'avons pas pu retrouver le produit veuillez contacter l'admin";

      if (err === null) {
        console.log("Le produit a été trouvé :"), err;
      } else {
        console.log("Le produit n'a pas été trouvé");
      }
    });
}

fillProductPages();

//"===" test la valeur et le type
//"==" test si true ou false
//"!==" test si la valeur est la meme
// méthode getElementById de l’objet document pour récupérer l’élément de document ayant l’identifiant "colors, addToCart, quantity, cart"
// définir une variable nommée cart localStorage sous la clé "cart" Si la valeur dans localStorage est null, La variable "cart" est initialisée dans un tableau vide
const selectedColor = document.getElementById("colors");
const cartButton = document.getElementById("addToCart");
const selectedQuantity = document.getElementById("quantity");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let productInCart;

// fonction nommée addToCart selectedQuantity Les variables ont une valeur spécifiée et, si ce n’est pas le cas, affiche un message d’alerte qui ouvre une fenêtre avec un message à l’utilisateur
// définir une nouvelle variable nommée newProductInCart et l’initialiser en un objet avec trois propriétés : color, id et quantity. color est définie sur la valeur de la propriété selectedColor variable, le id est définie sur la valeur de productId variable, et le quantity est défini sur le résultat de la conversion du selectedQuantity à un nombre à l’aide du Number constructeur
// le code vérifie si un élément avec un 'id spécifique' existe dans le panier et affecte cet élément au productInCart variable. Si le productInCart variable est véridique, cela signifie qu’un élément spécifié id et color propriétés existe dans le panier tableau. Si productInCart variable est undefined, cela signifie qu’un tel élément n’existe pas dans le panier cart tableau.

const addToCart = () => {
  if (selectedColor.value == "" || selectedQuantity.value == 0) {
    alert("Veuillez choisir la couleur ainsi que la quantitée");
  } else {
    if (Number(selectedQuantity.value) < 0) {
      alert("Veuillez entrez une quantité supérieur à zéro");
      return;
    }
    if (Number(selectedQuantity.value) > 100) {
      alert("Veuillez entrez une quantité inférieure ou égale à 100");
      return;
    }
    let newProductInCart = {
      color: selectedColor.value,
      id: productId,
      quantity: new Number(selectedQuantity.value),
    };
    productInCart = cart.find((product) => product.id == productId);
    const findProductIndex = cart.indexOf(productInCart);
    if (productInCart) {
      productInCart = cart.find(
        (product) =>
          product.color == selectedColor.value && product.id == productId
      );
      if (productInCart) {
        productInCart.quantity =
          parseInt(productInCart.quantity) + parseInt(selectedQuantity.value);
        if (productInCart.quantity > 100) {
          productInCart.quantity = 100;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Votre commande a été ajouté dans le panier");
      } else {
        cart.splice(findProductIndex, 0, newProductInCart);
        alert("Votre commande a été ajouté dans le panier");
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      cart.push(newProductInCart);
      alert("Votre commande a été ajouté dans le panier");
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

// localstorage
// méthode setItem de l’objet localStorage pour stocker la valeur de la variable cart dans le navigateur sous la clé "cart"
// méthode getItem de l’objet localStorage pour récupérer la valeur de la variable cart dans le navigateur sous la clé "cart"
// méthode removeItem de l’objet localStorage pour supprimer la valeur de la variable cart dans le navigateur sous la clé "cart"
// méthode clear de l’objet localStorage pour supprimer toutes les valeurs de la variable cart dans le navigateur sous la clé "cart"

cartButton.addEventListener("click", addToCart);

// écouteur d’événement pour l’événement « click » sur un élément avec l’identifiant cartButton, addToCart sera appelée.
