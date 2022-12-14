// methode get
const itemsSection = document.getElementById("items");
// Déclarer affecter une valeur a une varaiable, un objet du DOM

// Fonction createTag pour créer une nouvelle balise HTML quand la fonction est appelée
function createTag(newTagName) {
  return document.createElement(newTagName);
}

// Récupère les données de l'API, puis ajoute les éléments du commentaire index.html correspondants
// La fonction fléché "=>" va immédiatement executé la tache de {}
// Fonction qui crée un "get" `fetch` la `response` est transmis a `.then` et renvoi une reponse json valide
// creation de balise d'ancrage ajouté aux éléments avec un id dans le code html
// les classes des éléments sont mise a jour, les nom ont été redéfini

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
// en effectuant des requêtes réseau des erreurs peuvent etre générées lors du code précédent, elles seront détectées par ce '.catch()

createProductsCards();
