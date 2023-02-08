import { db } from "..";

// action types
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const UPDATE_PRODUCT_QUANTITY_IN_CART = 'UPDATE_PRODUCT_QUANTITY_IN_CART';

// action creators
export function fetchProducts(sortOrder) {
    return function (dispatch) {
        let products = [];
        if (sortOrder) {
            db
                .collection("products")
                .orderBy('price', sortOrder)
                .get()
                .then((snapshot) => {
                    products = snapshot.docs.map((doc) => {
                        let data = {
                            ...doc.data(),
                            id: doc.id
                        }

                        return data;
                    });

                    dispatch({
                        type: FETCH_PRODUCTS,
                        products
                    });
                });
        } else {
            db
                .collection("products")
                .get()
                .then((snapshot) => {
                    products = snapshot.docs.map((doc) => {
                        let data = {
                            ...doc.data(),
                            id: doc.id
                        }

                        return data;
                    });

                    dispatch({
                        type: FETCH_PRODUCTS,
                        products
                    });
                });
        }

    }
}

export function addProductToDB(product) {
    return function (dispatch) {
        db
            .collection("products")
            .add(product)
            .then((docRef) => console.log(docRef))
            .catch((error) => console.log('Error in creating product in firebase', error));

        dispatch({
            type: ADD_PRODUCT,
            product
        })
    }
}

export function updateProduct(product, id, productIndex) {
    return function (dispatch) {
        const docRef = db.collection('products').doc(id);

        docRef
            .update({
                name: product.name,
                price: product.price,
                rating: product.rating,
                image: product.image,
                description: product.description
            })
            .then(() => console.log('Updated product successfully'))
            .catch((e) => console.log('Error in updating product', e));
        dispatch({
            type: UPDATE_PRODUCT,
            product,
            productIndex
        })
    }
}

export function deleteProduct(product) {
    return function (dispatch) {
        const docRef = db.collection('products').doc(product.id);

        docRef
            .delete()
            .then(() => console.log('Deleted product successfully'))
            .catch((e) => console.log('Error in deleting product', e));

        dispatch({
            type: DELETE_PRODUCT,
            deleteProduct: product
        })
    }
}

export function addProductToCart(cartProduct) {
    return {
        type: ADD_PRODUCT_TO_CART,
        cartProduct
    }
}

export function removeProductToCart(deleteProduct) {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        deleteProduct
    }
}

export function updateProductQuantity(productIndex, changeInQty) {
    return {
        type: UPDATE_PRODUCT_QUANTITY_IN_CART,
        productIndex,
        changeInQty
    }
}