import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { addProductToDB } from '../actions';
import { notifyCreateProductMessage } from '../utils';

function AddProduct(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState('');

    const { dispatch } = props;

    function handleAddProduct(e) {
        e.preventDefault();

        if (!name || !description || !price || !rating || !image) {
            return;
        }

        let product = {
            name,
            description,
            rating,
            image,
            price
        }

        dispatch(addProductToDB(product));
    }

    return (
        <Container
            style={{
                maxWidth: '45vw',
                border: '2px solid grey',
                borderRadius: 5,
                marginTop: '2%',
                backgroundColor: 'white',
                padding: '10px'
            }}
        >
            <h4>Add Product</h4>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label><h6>Name</h6></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label><h6>Description</h6></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label><h6>Price</h6></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label><h6>Image</h6></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image url"
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRating">
                    <Form.Label><h6>Rating</h6></Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Rating"
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="outline-secondary"
                    type="submit"
                    onClick={function (e) {
                        handleAddProduct(e);
                        notifyCreateProductMessage();
                    }}
                >
                    <b>Add</b>
                </Button>
            </Form>
        </Container>

    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(AddProduct);