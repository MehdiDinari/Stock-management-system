import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddProductModal from "./AddProductModal"; // Remplace l'ancien AddStudentModal
import UpdateProductModal from "./UpdateProductModal"; // Remplace l'ancien UpdateStudentModal
import { getProducts, deleteProduct } from '../services/ProductService'; // Utilise ProductService

const Manage = () => {
    const [products, setProducts] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editProduct, setEditProduct] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (products.length && !isUpdated) {
            return;
        }
        getProducts()
            .then(data => {
                if (mounted) {
                    setProducts(data);
                }
            });
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, products]);

    const handleUpdate = (e, product) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditProduct(product);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            e.preventDefault();
            deleteProduct(productId)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                },
                (error) => {
                    alert("Failed to delete product");
                });
        }
    };

    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <p id="manage"></p>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Date of Buying</th>
                            <th>Buyer Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) =>
                            <tr key={product.product_id}>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.date_of_buying}</td>
                                <td>{product.buyer_name}</td>
                                <td>
                                    <Button className="mr-2" variant="danger"
                                        onClick={event => handleDelete(event, product.product_id)}>
                                        <RiDeleteBin5Line />
                                    </Button>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Button className="mr-2"
                                        onClick={event => handleUpdate(event, product)}>
                                        <FaEdit />
                                    </Button>
                                    <UpdateProductModal show={editModalShow} product={editProduct} setUpdated={setIsUpdated}
                                        onHide={EditModelClose}></UpdateProductModal>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleAdd}>
                        Add Product
                    </Button>
                    <AddProductModal show={addModalShow} setUpdated={setIsUpdated}
                        onHide={AddModelClose}></AddProductModal>
                </ButtonToolbar>
            </div>
        </div>
    );
};

export default Manage;
