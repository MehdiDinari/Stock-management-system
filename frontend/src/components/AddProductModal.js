import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addProduct } from '../services/ProductService'; // Utilise ProductService

const AddProductModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        },
        (error) => {
            alert("Failed to Add Product");
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
                        Fill In Product Information
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" name="name" required placeholder="Enter product name" />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" required placeholder="Enter price" />
                                </Form.Group>
                                <Form.Group controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" name="quantity" required placeholder="Enter quantity" />
                                </Form.Group>
                                <Form.Group controlId="date_of_buying">
                                    <Form.Label>Date of Buying</Form.Label>
                                    <Form.Control type="date" name="date_of_buying" required />
                                </Form.Group>
                                <Form.Group controlId="buyer_name">
                                    <Form.Label>Buyer Name</Form.Label>
                                    <Form.Control type="text" name="buyer_name" required placeholder="Enter buyer's name" />
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

export default AddProductModal;
