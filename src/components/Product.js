import React, { useState } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addProductToCart, deleteProduct, updateProduct } from '../actions';

import { NotificationContainer } from 'react-notifications';
import { notifyUnsaveInfoMessage, notifySuccessEditMessage, notifyProductDeletedMessage, notifyProductAddedToCartMessage } from '../utils';


function Product(props) {
    const { product, dispatch, productIndex } = props;
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [rating, setRating] = useState(product.rating);
    const [id] = useState(product.id);
    const [editMode, setEditMode] = useState(false);
    const [addToCart, setAddToCart] = useState(false);

    function handleUpdateProduct() {
        let updatedProduct = {
            name,
            description,
            price,
            rating,
            image: product.image
        };

        dispatch(updateProduct(updatedProduct, product.id, productIndex));
    }

    function handleDeleteProduct() {
        dispatch(deleteProduct(product));
        notifyProductDeletedMessage(product.name);
    }

    function handleAddProductToCart() {
        let cartProduct = {
            ...product,
            qty: 1
        }
        dispatch(addProductToCart(cartProduct));
    }

    return (
        <Row
            style={{
                border: '1px solid black',
                backgroundColor: 'white',
                margin: '1rem 0px',
                padding: '1rem'
            }}
        >
            <Col md>
                <Link to={`/product/${product.id}`}>
                    <Image
                        src={product.image}
                        alt="product-image"
                        style={{
                            width: 250,
                            height: 250
                        }}
                    />
                </Link>
            </Col>
            <Col
                md
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <div>
                    {
                        editMode ?
                            <input type="text" value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                            :
                            <Link to={`/product/${id}`}>
                                <span>{product.name}</span>
                            </Link>


                    }
                </div>
                <div>
                    <span><b>Price : </b></span>
                    {
                        editMode ?
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                            :
                            <span>{product.price}</span>

                    }
                </div>
                <div>
                    <b>Rating : </b>
                    {
                        editMode ?
                            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                            :
                            <span>{product.rating}</span>

                    }
                </div>
            </Col>
            <Col
                md
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                {
                    editMode ?
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        :
                        <p><b>Description : </b>{product.description}</p>

                }
                <div>
                    {
                        !editMode ?
                            <React.Fragment>
                                <Button
                                    variant='light'
                                    onClick={() => {
                                        setEditMode(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant='light'
                                    onClick={() => {
                                        handleDeleteProduct();
                                    }}
                                >
                                    <Image
                                        src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                                        alt="delete-icon"
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </Button>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Button
                                    variant='light'
                                    onClick={() => {
                                        setEditMode(false);
                                        notifyUnsaveInfoMessage();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant='light'
                                    onClick={() => {
                                        handleUpdateProduct();
                                        setEditMode(false);
                                        notifySuccessEditMessage();
                                    }}
                                >
                                    Save
                                </Button>
                            </React.Fragment>
                    }
                </div>
                <div>
                    {
                        addToCart ?
                            <div
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <span
                                    style={{
                                        padding: 4,
                                        border: '1px solid grey',
                                        borderRadius: 5,
                                        backgroundColor: 'grey',
                                        color: 'white'
                                    }}
                                >
                                    Added to cart
                                </span>
                            </div>
                            :
                            <Button
                                onClick={() => {
                                    handleAddProductToCart();
                                    setAddToCart(true);
                                    notifyProductAddedToCartMessage(product.name);
                                }}
                            >
                                Add to cart
                            </Button>
                    }
                </div>
            </Col>
            <NotificationContainer />
        </Row >
    )
}

export default Product;