import { NotificationManager } from "react-notifications";

export function notifySuccessEditMessage() {
    NotificationManager.success('Success', 'Updated the product');
}

export function notifyUnsaveInfoMessage() {
    NotificationManager.info('Product is not updated');
}

export function notifyProductAddedToCartMessage(name) {
    NotificationManager.success('Success', `${name} product added to cart`);
}

export function notifyProductDeletedMessage(name) {
    NotificationManager.success('Success', `${name} product removed!`);
}

export function notifyCreateProductMessage() {
    NotificationManager.success('Success', 'Product created!!');
}