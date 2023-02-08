import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import Product from '../components/Product';

function Products(props) {
    const { dispatch, products } = props;
    const [sortApplied, setSortApplied] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    // Sort the products based on the sort filter applied
    useEffect(() => {
        handleSortOrderProducts();
    }, [sortApplied])

    function handleSortOrderProducts() {
        if (sortApplied) {
            dispatch(fetchProducts('asc'));
        } else {
            dispatch(fetchProducts());
        }
    }

    return (
        <Container
            style={{
                position: 'relative'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin: '10px 0'
                }}
            >
                <Button
                    variant='light'
                    style={{
                        borderRadius: 20,
                    }}
                    onClick={() => {
                        setSortApplied(!sortApplied);
                    }}
                >
                    Sort by price
                    {sortApplied &&
                        <img
                            src='https://cdn-icons-png.flaticon.com/512/1828/1828666.png'
                            alt='cross-icon'
                            style={{
                                width: 15,
                                height: 15,
                                marginLeft: 5
                            }}
                        />
                    }
                </Button>
            </div>

            {products.productsList.map((product, index) => {
                return (
                    <Product
                        product={product}
                        dispatch={dispatch}
                        productIndex={index}
                        key={`product-${index}`}
                    />
                )
            })}


        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Products);