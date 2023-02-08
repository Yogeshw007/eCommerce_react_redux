import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import React from 'react';
import ProductDetail from "../pages/ProductDetail";

function App() {
  return (
    <div className="App" style={{ backgroundColor: 'lightgrey', minHeight: '100vh' }}>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
