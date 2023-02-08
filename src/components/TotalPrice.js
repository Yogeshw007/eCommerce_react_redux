import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

function TotalPrice(props) {
    const { cart } = props;
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let price = 0;
        cart.cartProductsList.forEach(product => {
            price += (product.price * product.qty);
        });
        setTotalPrice(price);
    }, [cart])

    return (
        <div
            className='d-flex justify-content-between'
            style={{
                border: '1px solid black',
                backgroundColor: 'white',
                margin: '1rem 0px',
                padding: 10,
            }}
        >
            <p><b>TotalPrice</b></p>
            <p>
                <b>Rs. </b>
                {totalPrice}</p>
        </div>
    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(TotalPrice);