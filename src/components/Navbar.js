import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Navbar(props) {
    const { cart } = props;
    return (
        <Nav
            bg="primary"
            variant="dark"

        >
            <Container>
                <Nav.Brand>
                    <Link
                        to={'/'}
                        style={{
                            color: 'white'
                        }}
                    >
                        <h3>eCommerce</h3>
                    </Link>
                </Nav.Brand>
                <Nav>
                    <Link
                        to={'/'}
                        style={{
                            color: 'white',
                            marginRight: 20
                        }}
                    >
                        <h5>Products</h5>
                    </Link>
                    <Link
                        to={'/add-product'}
                        style={{
                            color: 'white'
                        }}
                    >
                        <h5>Add Product</h5>
                    </Link>
                </Nav>
                <Nav
                    style={{
                        position: 'relative'
                    }}
                >
                    <Link
                        to={'/cart'}
                        style={{
                            padding: 5
                        }}
                    >
                        <Image
                            src='https://cdn-icons-png.flaticon.com/512/3144/3144456.png'
                            alt='cart-icon'
                            style={{ width: '2rem', color: 'white' }}
                        />
                        <div
                            style={{
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'green',
                                color: 'white',
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                position: 'absolute',
                                top: 0,
                                right: -10,
                                border: '3px solid white'
                            }}
                        >
                            {cart.count}
                        </div>
                    </Link>
                </Nav>
            </Container >
        </Nav >
    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Navbar);