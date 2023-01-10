// Création des cartes produits
const itemsSection = document.getElementById("items");

function createTag(newTagName) {
  return document.createElement(newTagName);
}

function createProductsCards() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      return response.json();
    })
    .then((productList) => {
      productList.forEach((product) => {
        const productLink = createTag("a");
        const articleTag = createTag("article");
        const productImage = createTag("img");
        const productName = createTag("h3");
        const productDescription = createTag("p");
        productLink.appendChild(articleTag);
        articleTag.append(productImage, productName, productDescription);
        itemsSection.appendChild(productLink);
        productLink.href = `./product.html?id=${product._id}`;
        productImage.src = `${product.imageUrl}`;
        productImage.alt = `${product.altTxt}`;
        productName.classList.add("productName");
        productName.textContent = `${product.name}`;
        productDescription.classList.add("productDescription");
        productDescription.textContent = `${product.description}`;
      });
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
}

createProductsCards();
