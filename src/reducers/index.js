import { combineReducers } from "redux";
import {
    FETCH_PRODUCTS,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    UPDATE_PRODUCT_QUANTITY_IN_CART
} from "../actions";


const initialProductState = {
    productsList: [],
    count: 0
}

const initialCartState = {
    cartProductsList: [],
    count: 0
}

export function products(state = initialProductState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                productsList: action.products,
                count: action.products.length
            }
        case ADD_PRODUCT:
            return {
                productsList: [...state.productsList, action.product],
                count: state.count + 1
            }
        case UPDATE_PRODUCT:
            let updatedProducts = [...state.productsList];

            updatedProducts[action.productIndex] = action.product;

            return {
                ...state,
                productsList: updatedProducts
            }
        case DELETE_PRODUCT:
            let products = [...state.productsList];
            products = products.filter((prod) => {
                return prod.name !== action.deleteProduct.name;
            });

            return {
                productsList: products,
                count: products.length
            }
        default:
            return state;
    }
}

export function cart(state = initialCartState, action) {
    switch (action.type) {

        case ADD_PRODUCT_TO_CART:
            return {
                cartProductsList: [...state.cartProductsList, action.cartProduct],
                count: state.cartProductsList.length + 1
            }
        case REMOVE_PRODUCT_FROM_CART:
            {
                let products = [...state.cartProductsList];
                products = products.filter((prod) => {
                    return prod.name !== action.deleteProduct.name;
                });

                return {
                    cartProductsList: products,
                    count: state.count - action.deleteProduct.qty
                }
            }
        case UPDATE_PRODUCT_QUANTITY_IN_CART:
            {
                let updatedProducts = [...state.cartProductsList];

                updatedProducts[action.productIndex].qty += action.changeInQty;

                let updatedQty = 0;

                state.cartProductsList.forEach((cartProduct) => {
                    updatedQty += cartProduct.qty;
                });

                return {
                    ...state,
                    cartProductsList: updatedProducts,
                    count: updatedQty
                }
            }
        default:
            return state;
    }
}


export default combineReducers({
    products,
    cart
});