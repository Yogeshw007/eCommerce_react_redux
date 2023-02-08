import React from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import CartProduct from '../components/CartProduct';
import TotalPrice from '../components/TotalPrice';

function Cart(props) {
    const { cart, dispatch } = props;
    const { cartProductsList, count } = cart;

    return (
        <Container>
            {
                cartProductsList.map((cartProduct, index) => {
                    return (
                        <CartProduct
                            cartProduct={cartProduct}
                            key={`cart-item-${cartProduct.id}`}
                            dispatch={dispatch}
                            index={index}
                        />
                    )

                })
            }
            <TotalPrice />
        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Cart);