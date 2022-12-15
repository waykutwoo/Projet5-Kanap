// Mise en place de la page de confirmation. Cette page est affichée après avoir validé le formulaire de commande.
// récupérer l’ID de commande de l’URL actuelle et l’afficher dans un élément HTML avec l’ID  orderId
// creation de l'objet currentPageUrl
// crée un nouvel objet url
// l’objet url pour accéder aux paramètres de recherche de l’URL (ceux qui viennent après le symbole « ? » dans l’URL du navigateur), puis récupère la valeur du paramètre « order » et la stocke dans la variable orderIdorderId
// la propriété textContent de l’objet orderIdSpan pour remplacer son contenu actuel par l’ID de commande stocké dans la variable orderIdorderId
// ce code affiche l’ID de commande de la page courante dans un élément HTML avec l’ID  orderId

// URLSearchParams manipuler les paramètres de recherche dans une URL

// la propriété textContent de l’objet orderIdSpan pour remplacer son contenu actuel par l’ID de commande stocké dans la variable orderIdorderId
// ce code affiche l’ID de commande de la page courante dans un élément HTML avec l’ID  orderId
// création de l'objet response
const currentPageUrl = document.location.href;
const url = new URL(currentPageUrl);
const orderId = url.searchParams.get("order");
const orderIdSpan = document.getElementById("orderId");
const response = new URL("http://localhost:3000/api/products");
console.log(response);
orderIdSpan.textContent = `${orderId}`;


