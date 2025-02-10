import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/products/'; // Définition de l'URL de base

// 🔹 Récupérer tous les produits
export function getProducts() {
  return axios.get(BASE_URL)
    .then(response => response.data);
}

// 🔹 Supprimer un produit par ID
export function deleteProduct(productId) {
  return axios.delete(`${BASE_URL}${productId}`)  // Pas de double slash
    .then(response => response.data);
}

// 🔹 Ajouter un produit
export function addProduct(product) {
  return axios.post(BASE_URL, {
    name: product.name.value,
    price: product.price.value,
    quantity: product.quantity.value,
    date_of_buying: product.date_of_buying.value,
    buyer_name: product.buyer_name.value
  })
  .then(response => response.data);
}

// 🔹 Mettre à jour un produit par ID
export function updateProduct(product_id, product) {
  return axios.put('http://127.0.0.1:8000/products/' + product_id + '/', {
    name: product.name.value,
    price: product.price.value,
    quantity: product.quantity.value,
    date_of_buying: product.date_of_buying.value,
    buyer_name: product.buyer_name.value
  })
   .then(response => response.data)
}


