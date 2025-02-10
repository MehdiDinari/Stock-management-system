import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import { getProducts } from '../services/ProductService';  // Import du bon service
import "../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then(data => {
        console.log("Produits reçus:", data); // 🔍 Debug: Vérifie les données reçues
        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Erreur lors du chargement des produits:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="before-table"></p>

        {/* Affichage du Spinner en attendant le chargement */}
        {loading && <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}

        {/* Affichage des erreurs si elles existent */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Affichage du tableau seulement si des produits sont disponibles */}
        {!loading && !error && products.length > 0 ? (
          <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>  {/* ✅ Nouvelle colonne */}
                <th>Date of Buying</th>
                <th>Buyer Name</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{(product.price * product.quantity).toFixed(2)}</td>  {/* ✅ Calcul de Total */}
                  <td>{product.date_of_buying}</td>
                  <td>{product.buyer_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && !error && <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
