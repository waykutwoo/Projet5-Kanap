// Description: This file contains the functions that allow the user to add, remove and modify the quantity of products in the cart.

const cartItems = document.getElementById("cart__items");

// Description: This function is used to add a product to the cart

function createTag(newTagName) {
  return document.createElement(newTagName);
}

// Description: This function is used to add a class to an element
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalQuantityElement = document.getElementById("totalQuantity");
const displayedTotal = document.getElementById("totalPrice");
let removeButton;
let quantityInputField;
let getParentArticle;
let updatedProduct;

const eventListener = function () {
  quantityInputField = document.querySelectorAll(
    ".cart__item__content__settings__quantity > .itemQuantity"
  );
  quantityInputField.forEach((element) => {
    let quantity = element.value;
    if (quantity > 100) {
      quantity = 100;
    }
    element.setAttribute("value", quantity);
    productQuantity += quantity;
    element.addEventListener("change", pushLocalStorageQuantity);
  });
  removeButton = document.querySelectorAll(".deleteItem");
  removeButton.forEach((element) => {
    element.addEventListener("click", removeFromCart);
  });
};

// Description: This function is used to convert the cart into an array
const getUnitQuantities = function () {
  let quantity = element.value;
  if (quantity > 100) {
    quantity = 100;
  }
  quantityInputField.setAttribute("value", quantity);
};

const quantityInputFields = document.querySelectorAll(".cart-quantity-input");

// Description: This function is used to validate the quantity of products in the cart
const validateQuantity = function (event) {
  const inputField = event.target;
  let quantity = inputField.value;
  if (quantity > 100) {
    quantity = 100;
  }
  inputField.value = quantity;
};

// Description: This function is used to update the quantity of products in the cart
quantityInputFields.forEach(function (inputField) {
  inputField.addEventListener("input", validateQuantity);
});

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

// Description: This function is used to convert the cart into an array
const addToCart = function () {
  let cartTotalQuantity = 0;
  for (let i = 0; i < quantityInputField.length; i++) {
    cartTotalQuantity += Number(quantityInputField[i].value);
  }

  if (cartTotalQuantity >= 100) {
    alert(
      "Vous ne pouvez pas ajouter d'autres articles au panier car le nombre total d'articles est déjà limité à 100."
    );
    return;
  }
};
console.log(addToCart);

// Description: This function is used to convert the cart into an array
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

const removeFromCart = function () {
  getParentArticle = this.closest("article");
  getProductToUpdate();
  if (updatedProduct) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article du panier?")) {
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
  }
};

const pushLocalStorageQuantity = function () {
  getParentArticle = this.closest("article");
  getProductToUpdate();
  if (cart.length === 0) {
    alert("Le panier est vide");
  } else if (updatedProduct) {
    const indexOfUpdatedProduct = cart.indexOf(updatedProduct);
    let quantity = parseInt(quantityInputField[indexOfUpdatedProduct].value);
    if (quantity > 100) {
      alert("La quantité ne peut pas dépasser 100");
      quantity = 100;
    }
    updatedProduct.quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    eventListener();
    getCartTotal();
    convertCartToArray();
  }
};

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

let cartItemImage;
let cartItemImageAlt;
let productName;
let productColor;
let productPrice;
let productQuantity = [];
let displayPrice = [];
let cartContent = "";
let i = 0;
//
// Description: This function is used to display the cart
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

// Description: This function is used to display the cart total price
displayCart();

const formInputs = document.querySelectorAll(
  ".cart__order__form__question > input"
);
const formInputsErrors = document.querySelectorAll(
  ".cart__order__form__question > p"
);
const orderButton = document.getElementById("order");

const formInputValidation = function () {
  formInputs.forEach((inputField) => {
    inputField.addEventListener("change", checkInput);
  });
  orderButton.addEventListener("click", sendCartAndInput);
};

// Description: This function is used to check the input fields
const nameCriterias = /^[a-zçèé]+[a-zçèé ,.'-]+$/i;
const emailCriterias =
  /^[a-zA-Z0-9.èé!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let validationStatus = [undefined, undefined, undefined, undefined, undefined];
let errorName;

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
        console.log(validationStatus[i]);
      } else if (this.id == "email") {
        validationStatus[i] = emailCriterias.test(this.value);
        console.log(validationStatus[i]);
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

let contact;

// Description: This function is used to save the input fields
const saveInputForm = function () {
  contact = {
    firstName: `${formInputs[0].value}`,
    lastName: `${formInputs[1].value}`,
    address: `${formInputs[2].value}`,
    city: `${formInputs[3].value}`,
    email: `${formInputs[4].value}`,
  };
};

// Description: This function is used to send the cart and the input fields
const products = [];

const convertCartToArray = function () {
  cart.forEach((product) => {
    cart.find((product) => product.id);
    products.push(product.id);
  });
};

// Description: This function is used to merge the cart and the input fields
let orderProducts;

const mergeInputs = function () {
  convertCartToArray();
  saveInputForm();
  orderProducts = {
    contact,
    products,
  };
};

// Description: This function is used to send the cart and the input fields
function sendCartAndInput(event) {
  event.preventDefault();
  if (
    !validationStatus.includes(false) &&
    !validationStatus.includes(undefined)
  ) {
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

// Description: This function is used to display the cart total price
if (cart.length === 0) {
  document.getElementById("limitedWidthBlock").innerHTML =
    "Votre panier est vide";
  document.getElementById("limitedWidthBlock").title = "Votre panier est vide";
  console.log("Panier vide");
}

const product = cart.findIndex((product) => product.id === "id");

if (product !== -1) {
  const product = cart[product];

  if (product.quantity === 0) {
    cart.splice(product, 1);
  }

  if (cart.length === 0) {
    console.log("Panier vide");
  }
}
if (cart.length === 0) {
  alert("Le panier est vide");
}

// Description: This function is used to display the cart total price
const calculatePrice = () => {
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;

    if (totalPrice >= 100) {
      totalPrice = 100;
      break;
    }
  }

  return totalPrice;
};

console.log(calculatePrice(cart));

// Description: This function is used to display the cart total price
