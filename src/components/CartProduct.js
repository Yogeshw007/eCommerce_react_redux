import React from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { removeProductToCart, updateProductQuantity } from '../actions';

function CartProduct(props) {
    const { cartProduct, index, dispatch } = props;

    function handleUpdateQuantity(changeInQty) {
        dispatch(updateProductQuantity(index, changeInQty));
    }

    function handleDeleteProduct() {
        dispatch(removeProductToCart(cartProduct));
    }

    return (
        <Row
            style={{
                border: '1px solid black',
                backgroundColor: 'white',
                margin: '1rem 0px',
                padding: 10
            }}
        >
            <Col md>
                <Image
                    src={cartProduct.image}
                    alt="product-image"
                    style={{
                        width: 200,
                        height: 200
                    }}
                />
            </Col>
            <Col
                md
                style={{
                    // margin: 'auto'
                }}
            >
                <div>
                    <Link to={`/product/${cartProduct.id}`}>
                        <p style={{textAlign: 'center'}}>{cartProduct.name}</p>
                    </Link>
                </div>
                <div>

                    <p style={{textAlign: 'center'}}>
                        <b>Price : </b>
                        {`Rs.${cartProduct.price}`}
                    </p>
                </div>
            </Col>
            <Col
                md
                style={{
                    margin: 'auto',
                    textAlign: 'center'
                }}
            >
                <div className='qty-details'>
                    <p className='qty-text'>
                        <b>Qty</b>
                    </p>
                    <p className='qty-value'>
                        {cartProduct.qty}
                    </p>
                </div>
            </Col>
            <Col
                md
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant='outline-secondary'
                    onClick={() => handleUpdateQuantity(1)}
                    style={{
                        marginRight: 5
                    }}
                >
                    +
                </Button>
                <Button
                    variant='outline-secondary'
                    disabled={cartProduct.qty > 1 ? false : true}
                    onClick={() => handleUpdateQuantity(-1)}
                    style={{
                        marginRight: 5
                    }}
                >
                    -
                </Button>
                <Button
                    variant='danger'
                    onClick={handleDeleteProduct}
                >
                    <Image
                        src='https://cdn-icons-png.flaticon.com/512/9340/9340260.png'
                        alt='delete-icon'
                        style={{
                            width: 20,
                            height: 20,

                        }}
                    />
                </Button>
            </Col>
        </Row >
    )
}

export default CartProduct