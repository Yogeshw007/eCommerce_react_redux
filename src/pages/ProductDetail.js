import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '..';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { addProductToCart } from '../actions';
import { notifyProductAddedToCartMessage } from '../utils';

function ProductDetail(props) {
    const { productId } = useParams();
    const { dispatch } = props;

    const [product, setProduct] = useState({});
    const [addToCartState, setAddToCartState] = useState(true);

    useEffect(() => {
        const docRef = db
            .collection('products')
            .doc(productId);

        docRef
            .get()
            .then((doc) => setProduct(doc.data()))
            .catch((err) => console.log(err))

    }, []);

    function handleAddProductToCart() {
        let cartProduct = {
            ...product,
            qty: 1
        }
        dispatch(addProductToCart(cartProduct));
        setAddToCartState(false);
    }

    return (
        <Card style={{ width: '50rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 15 }}>
            <Card.Img
                variant="top"
                src={product.image}
                style={{
                    width: 250,
                    height: 250
                }}
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <Card.Text>
                    <b>Description: </b>
                    <span>{product.description}</span>
                </Card.Text>
                <div>
                    <div>
                        <p>
                            <b>Rs. </b>
                            {product.price}
                        </p>

                    </div>
                    <div>
                        <p>
                            <b>Rating : </b>
                            {product.rating}
                        </p>
                    </div>

                </div>
                {
                    addToCartState ?
                        <Button
                            className=""
                            variant="primary"
                            onClick={() => {
                                handleAddProductToCart();
                                notifyProductAddedToCartMessage(product.name);
                            }}

                        >
                            Add To Cart
                        </Button>
                        :
                        <Button
                            className=""
                            variant="dark"
                            disabled
                        >
                            Added To Cart
                        </Button>
                }
            </Card.Body>

        </Card >
    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ProductDetail);