// afficher le contenu de la page panier dans la page panier
// aller chercher dans le DOM les éléments par Id
// creation d'un nouveau nom de balise "cart__items"
// creation d'une fonction pour créer une nouvelle balise
// retourne dans le DOM l'élément crée

const cartItems = document.getElementById("cart__items");

function createTag(newTagName) {
  return document.createElement(newTagName);
}
// return dans le DOM l'élément crée
// utilisation du loacalstorage pour acceder a array depuis la page panier

const cart = JSON.parse(localStorage.getItem("cart")) || [];

// = affectation, || operateur "ou" logique, [] racourci pour crée un tableau vide array
// création des fonctions supprimer /calculer le total /envoi de la commande qui seront utilisée dans la fonction du pannier cart

const totalQuantityElement = document.getElementById("totalQuantity");
const displayedTotal = document.getElementById("totalPrice");
let removeButton;
let quantityInputField;
let getParentArticle;
let updatedProduct;
// "let" creation de variable
// "any" n'importe quel
// Ajoute un event listener sur les <input> quantité de chaque produit et leur bouton "Supprimer"
// () crée la fonction immédiatement exécutable dans le DOM
// fonction retourne une valeur du DOM
// cart.html
// => fonction flechée arrow qui va automatiquement évaluer l’expression à droite du signe => et retourner son résultat
// += affectation de d'addition
// objet ataché a une variable separé par un "."
// "querySelectorAll" selectionne tous les elements qui correspondent au selecteur CSS
// "addEventListener" ajoute un event listener sur les <input> quantité de chaque produit et leur bouton "Supprimer"
// "setAttribute" ajoute un attribut a un element
// "textContent" retourne le contenu textuel d'un element

const eventListener = function () {
  quantityInputField = document.querySelectorAll(
    ".cart__item__content__settings__quantity > .itemQuantity"
  );
  quantityInputField.forEach((element) => {
    element.setAttribute("value", element.value);
    productQuantity += element.value;
    element.addEventListener("change", pushLocalStorageQuantity);
  });
  removeButton = document.querySelectorAll(".deleteItem");
  removeButton.forEach((element) => {
    element.addEventListener("click", removeFromCart);
  });
};

const getUnitQuantities = function () {
  quantityInputField.setAttribute("value", element.value);
};
// "=" affectation d'une valeur a une variable
// "{}" invoque une fonction

// "let" pour cree une variable "i" compteur "=" pour lui donner une valeur
// !== "!" si non logique (condition false) "==" l'égalité simple verifie la valeur
// Quand la quantité dans les <input> change, calcule le total depuis les quantités affichées et le prix des produits
// "Number" objet qui represente un nombre
// "textContent" retourne le contenu textuel d'un element
// "value" retourne la valeur d'un element
// "length" retourne la taille d'un objet
// "push" ajoute un ou plusieurs elements a la fin d'un tableau et retourne la nouvelle taille du tableau
// "splice" ajoute et/ou supprime n'import quel éléments de tableau
// "closest" retourne le premier element parent qui correspond au selecteur CSS
const getCartTotal = function () {
  let cartTotalPrice = new Number();
  let cartTotalQuantity = new Number();
  let i = 0;
  while (i !== quantityInputField.length) {
    cartTotalQuantity += Number(quantityInputField[i].value);
    cartTotalPrice += displayPrice[i] * quantityInputField[i].value;
    i++;
  }
  totalQuantityElement.textContent = cartTotalQuantity;
  displayedTotal.textContent = cartTotalPrice;
  eventListener();
};

// Compare l'id et couleur de l'élément 'article' avec ceux contenus dans le panier en localstorage
// Si l'élément est trouvé, retourne l'objet correspondant
// "find" retourne la valeur du premier element du tableau qui satisfait une fonction de test

const getProductToUpdate = function () {
  let parentArticleDataset = {
    color: getParentArticle.dataset.color,
    id: getParentArticle.dataset.id,
  };
  updatedProduct = cart.find(
    (product) =>
      product.color == parentArticleDataset.color &&
      product.id == parentArticleDataset.id
  );
  return updatedProduct;
};
// && et et
// == egalité simple verifie la valeur
// Trouve l'index du produit dans cart pour le supprimer, le retirer du DOM et forcer un recalcul du total
// "splice" ajoute et/ou supprime n'import quel éléments de tableau
// "closest" retourne le premier element parent qui correspond au selecteur CSS
const removeFromCart = function () {
  getParentArticle = this.closest("article");
  getProductToUpdate();
  if (updatedProduct) {
    const indexOfRemovedProduct = cart.indexOf(updatedProduct);
    const removeProduct = cart.splice(indexOfRemovedProduct, 1);
    getParentArticle.remove();
    localStorage.setItem("cart", JSON.stringify(cart));
    eventListener();
    getCartTotal();
    if (cart.length === 0) {
      document.getElementById("limitedWidthBlock").innerHTML =
        "Votre panier est vide";
      console.log("Panier vide");
    }
  }
};
// "splice" ajoute et/ou supprime n'import quel éléments de tableau
// Trouve l'index du produit dans le cart pour mettre à jour sa quantité, puis force un recalcul du total
//  Element.closest() cible le produit a supprimer (où modifie la quantité) grâce à son identifiant et sa couleur
// "parseInt" convertit une chaine de caractères en nombre entier
// "indexOf" retourne l'index du premier element du tableau qui satisfait une fonction de test

const pushLocalStorageQuantity = function () {
  getParentArticle = this.closest("article");
  getProductToUpdate();
  if (updatedProduct) {
    const indexOfUpdatedProduct = cart.indexOf(updatedProduct);
    updatedProduct.quantity = parseInt(
      quantityInputField[indexOfUpdatedProduct].value
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    eventListener();
    getCartTotal();
    convertCartToArray();
  }
};
// localstorage
// "setItem" ajoute un element au localstorage
// "JSON.stringify" convertit une valeur JavaScript en chaine JSON
// "JSON.parse" convertit une chaine JSON en objet JavaScript
// "getItem" retourne la valeur d'un element du localstorage
// "removeItem" supprime un element du localstorage
// "clear" supprime tous les elements du localstorage

// Crée un nouveau bloc article pour chaque produit du panier
// "createElement" cree un nouvel element HTML
// "appendChild" ajoute un noeud enfant a un noeud parent
// "setAttribute" definit ou change la valeur d'un attribut d'un element
// "innerHTML" retourne le contenu HTML d'un element
// "textContent" retourne le contenu textuel d'un element
// "value" retourne la valeur d'un element
// "length" retourne la taille d'un objet
// "push" ajoute un ou plusieurs elements a la fin d'un tableau et retourne la nouvelle taille du tableau
// "splice" ajoute et/ou supprime n'import quel éléments de tableau

// "createElement" cree un nouvel element HTML
const createInnerContent = function () {
  cartContent += `<article class="cart__item" data-id="${cart[i].id}" data-color="${productColor}">
  <div class="cart__item__img"><img src="${cartItemImage}" alt="${cartItemImageAlt}"></div>
  <div class="cart__item__content">
  <div class="cart__item__content__description">
  <h2>${productName}</h2>
  <p>${productColor}</p>
  <p>${productPrice} €</p>
  </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
  <p>Qté : </p>
  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
  </div>
  <div class="cart__item__content__settings__delete">
  <p class="deleteItem">Supprimer</p>
  </div>
  </div>
  </div>
  </article>`;
};

// "let" permet de déclarer des variables limitées à la portée du bloc, instruction, ou expression dans laquelle elle est utilisée

let cartItemImage;
let cartItemImageAlt;
let productName;
let productColor;
let productPrice;
let productQuantity = [];
let displayPrice = [];
let cartContent = "";
let i = 0;

// Fonction principale du panier
// "fetch" permet de récupérer des données à partir d'une URL
// "then" retourne une promesse
// "response" retourne la réponse d'un serveur
// "json" retourne les données au format JSON
// "forEach" execute une fonction donnée sur chaque element du tableau
// "find" retourne la valeur du premier element du tableau qui satisfait une fonction de test
// "push" ajoute un ou plusieurs elements a la fin d'un tableau et retourne la nouvelle taille du tableau
// "innerHTML" retourne le contenu HTML d'un element
// "textContent" retourne le contenu textuel d'un element
function displayCart() {
  const url = "http://localhost:3000/api/products";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((APIProductList) => {
      while (i !== cart.length) {
        const matchingProduct = APIProductList.find(
          (product) => product._id === cart[i].id
        );
        APIProductList.forEach((productInList) => {
          if (matchingProduct) {
            cartItemImage = `${matchingProduct.imageUrl}`;
            cartItemImageAlt = `${matchingProduct.altTxt}`;
            productName = `${matchingProduct.name}`;
            productColor = `${cart[i].color}`;
            productPrice = `${matchingProduct.price}`;
          }
        });
        createInnerContent();
        displayPrice.push(productPrice);
        i++;
      }
      cartItems.innerHTML += cartContent;
      eventListener();
      getCartTotal();
      formInputValidation();
    });
}

displayCart();

// "querySelectorAll" retourne une NodeList statique (non-live) représentant une liste des elements du document correspondant au groupe de selecteurs spécifiés
// "getElementById" retourne l'element qui a l'identifiant spécifié
// "forEach" execute une fonction donnée sur chaque element du tableau
// "addEventListener" ajoute un eventListener à un element
// "preventDefault" annule l'evenement si celui-ci est annulable, sans stopper la propagation de l'evenement
// "checkInput" verifie si les champs du formulaire sont remplis correctement

const formInputs = document.querySelectorAll(
  ".cart__order__form__question > input"
);
const formInputsErrors = document.querySelectorAll(
  ".cart__order__form__question > p"
);
const orderButton = document.getElementById("order");

// Ajoute un eventListener à chaque élément champs du formulaire
// "checkInput" verifie si les champs du formulaire sont remplis correctement

const formInputValidation = function () {
  formInputs.forEach((inputField) => {
    inputField.addEventListener("change", checkInput);
  });
  orderButton.addEventListener("click", sendCartAndInput);
};
// "criteria" critéres d'expression Regexp
// "validationStatus" tableau qui contient les status de validation des champs du formulaire

const nameCriterias = /^[a-zçèé]+[a-zçèé ,.'-]+$/i;
const emailCriterias =
  /^[a-zA-Z0-9.èé!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let validationStatus = [undefined, undefined, undefined, undefined, undefined];
let errorName;
// Détecte le champs qui a été modifié, vérifie s'il répond aux critères de saisie définis, et si false modifie la balise html d'erreur correspondante. Si la saisie est à nouveau valide après modification, retire le message d'erreur.
// "targetElement" element cible
// "i" index
// "while" execute une fonction donnée sur chaque element du tableau
// "id" retourne l'identifiant d'un element
// "name" retourne le nom d'un element
// "item" retourne l'element à l'index spécifié dans un tableau
// "value" retourne la valeur d'un element

const checkInput = function (targetElement) {
  let i = 0;
  while (i < 5) {
    if (this.id == `${formInputs.item(i).name}`) {
      if (
        this.id == "firstName" ||
        this.id == "lastName" ||
        this.id == "city"
      ) {
        validationStatus[i] = nameCriterias.test(this.value);
        console.log(validationStatus[i]); // affiche la valeur de validationStatus[i]
      } else if (this.id == "email") {
        validationStatus[i] = emailCriterias.test(this.value);
        console.log(validationStatus[i]); // affiche la valeur de validationStatus[i]
      } else if (this.id == "address") {
        1;
        if (formInputs[i].value.length > 5) {
          validationStatus[i] = true;
          0;
        } else {
          validationStatus[i] = false;
        }
      }
      errorName = document.getElementById(`${formInputsErrors.item(i).id}`);
      if (validationStatus[i] == false) {
        errorName.textContent = "Vérifiez votre saisie";
      } else {
        errorName.textContent = "";
      }
      break;
    }
    i++;
  }
};

// j'ai ajouté des accolades autour de chaque condition afin de rendre le code plus lisible.0
let contact;

// Sauvegarde le contenu des champs du formulaire dans une variable contact

const saveInputForm = function () {
  contact = {
    firstName: `${formInputs[0].value}`,
    lastName: `${formInputs[1].value}`,
    address: `${formInputs[2].value}`,
    city: `${formInputs[3].value}`,
    email: `${formInputs[4].value}`,
  };
};

const products = [];

// Extrait le contenu du panier en localstorage et le sauvegarde dans une variable products
// "forEach" pour chaque
// "find" retourne la valeur du premier element du tableau qui satisfait une fonction de test fournie
// "push" ajoute un ou plusieurs elements à la fin d'un tableau et retourne la nouvelle longueur du tableau

const convertCartToArray = function () {
  cart.forEach((product) => {
    cart.find((product) => product.id);
    products.push(product.id);
  });
};

let orderProducts;

// Regroupe le contenu du panier et le contenu des champs du formulaire dans un unique object
// ajout de propriété a l'objet déclaré
// mergeInputs() est exécutée et fusionne les valeurs entrées par l’utilisateur

const mergeInputs = function () {
  convertCartToArray();
  saveInputForm();
  orderProducts = {
    contact,
    products,
  };
};

// Vérifie que tous les champs du formulaire sont valides, et si oui : envoie le contenu du panier, redirige vers la page de confirmation correspondant à l'order id, et vide le localstorage
// méthode stringify() pour convertir un objet JavaScript en chaîne de caractères JSON
// requête en utilisant la méthode fetch et l'URL cible
// méthode fetch() pour récupérer les données
// méthode json() pour convertir les données au format JSON
// méthode catch() pour gérer les erreurs
// Définissez le type de données à envoyer au serveur (ici, "POST" et "JSON" )

function sendCartAndInput(event) {
  event.preventDefault();
  if (
    !validationStatus.includes(false) &&
    !validationStatus.includes(undefined)
  ) {
    // mergeInputs() est exécutée et fusionne les valeurs entrées par l’utilisateur
    mergeInputs();
    const url = "http://localhost:3000/api/products/order";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(orderProducts),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        localStorage.clear();
        window.location.href = `confirmation.html?order=${response.orderId}`;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert(
      "Le formulaire n'a pas pu être validé. Tous les champs sont-ils correctement remplis?"
    );
  }
}

if (cart.length === 0) {
  document.getElementById("limitedWidthBlock").innerHTML =
    "Votre panier est vide";
  document.getElementById("limitedWidthBlock").title = "Votre panier est vide";
  console.log("Panier vide");
}

// Trouvez l'index du produit dans le panier
const product = cart.findIndex((product) => product.id === "id");

// Si le produit existe dans le panier
if (product !== -1) {
  // Récupérez le produit
  const product = cart[product];

  // Si la quantité est égale à 0, supprimez le produit du panier
  if (product.quantity === 0) {
    cart.splice(product, 1);
  }

  // Si le panier est vide, affichez un message "Panier vide"
  if (cart.length === 0) {
    console.log("Panier vide");
  }
}
