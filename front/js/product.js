// Description: This file is used to display the product page
import { url_api } from "./utils.js";

const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const productId = url.searchParams.get("id");

function createTag(newTagName) {
  return document.createElement(newTagName);
}

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

const selectedColor = document.getElementById("colors");
const cartButton = document.getElementById("addToCart");
const selectedQuantity = document.getElementById("quantity");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let productInCart;

// Description: This function is used to add a product to the cart
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

cartButton.addEventListener("click", addToCart);
