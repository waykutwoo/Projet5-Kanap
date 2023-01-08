// methode get
const itemsSection = document.getElementById("items"); // récupère l'élément du DOM avec l'id "items"
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
      // creation d'une boucle forEach pour parcourir le tableau
      productList.forEach((product) => {
        const productLink = createTag("a"); // creation de balise d'ancrage
        const articleTag = createTag("article");
        const productImage = createTag("img");
        const productName = createTag("h3");
        const productDescription = createTag("p");
        productLink.appendChild(articleTag); // ajout de la balise article dans la balise a
        articleTag.append(productImage, productName, productDescription);
        itemsSection.appendChild(productLink);
        productLink.href = `./product.html?id=${product._id}`; // ajout de l'id dans l'url
        productImage.src = `${product.imageUrl}`; // ajout de l'image
        productImage.alt = `${product.altTxt}`;
        productName.classList.add("productName"); // ajout de la classe
        productName.textContent = `${product.name}`; // ajout du nom
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
