import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateProduct } from '../services/ProductService'; // Utilise ProductService

const UpdateProductModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(props.product.product_id, e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        },
        (error) => {
            alert("Failed to Update Product");
        });
    };

    return (
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Product Information
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" name="name" required defaultValue={props.product.name} placeholder="Enter product name" />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" required defaultValue={props.product.price} placeholder="Enter price" />
                                </Form.Group>
                                <Form.Group controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" name="quantity" required defaultValue={props.product.quantity} placeholder="Enter quantity" />
                                </Form.Group>
                                <Form.Group controlId="date_of_buying">
                                    <Form.Label>Date of Buying</Form.Label>
                                    <Form.Control type="date" name="date_of_buying" required defaultValue={props.product.date_of_buying} />
                                </Form.Group>
                                <Form.Group controlId="buyer_name">
                                    <Form.Label>Buyer Name</Form.Label>
                                    <Form.Control type="text" name="buyer_name" required defaultValue={props.product.buyer_name} placeholder="Enter buyer's name" />
                                </Form.Group>
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
};

export default UpdateProductModal;
