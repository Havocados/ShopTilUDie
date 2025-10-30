import { Product } from "../productCard/productCard";
import { ShoppingCart } from "../shoppingCart/shoppingCart";

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        this.items.push(product);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
    }
}

export { ShoppingCart };