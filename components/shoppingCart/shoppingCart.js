import { Product, ProductList } from '../productCard/productCard.js';    

class ShoppingCart {
    #items;
    constructor() {
        this.#items = [];
    }

    addItem(product) {
        this.#items.push(product);
        this.saveToLocalStorage();
    }

    removeItem(productId) {
        this.#items = this.#items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
    }

    getItems() {
        return this.#items;
    }

    clearCart() {
        this.#items = [];
        this.saveToLocalStorage();
    }

    // Helper method to create cart item JSON representation
    toJSON() {
        return this.#items.map(item => item.toJSON());
    }

    // Load cart items from local storage
    loadFromLocalStorage() {
        const cartJSON = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        this.#items = cartJSON.map(item => Product.fromObject(item));
    }

    saveToLocalStorage() {
        const cartJSON = this.#items.map(item => item.toJSON());
        localStorage.setItem('shoppingCart', JSON.stringify(cartJSON));
    }
}

// Event handler for cart buttons
const cart = new ShoppingCart();
const productList = new ProductList();

// First time populating the cart from local storage
cart.loadFromLocalStorage();

document.addEventListener('click', function (e) {
    // Define button variable inside the event listener
    const button = e.target.closest('button.add-to-cart');
    if (!button) return;
    const productId = button.getAttribute('data-id');

    // Load products from local storage
    productList.loadFromLocalStorage();

    // Add the product to the cart
    const productToAdd = productList.products.find(prod => prod.id == productId);
    if (productToAdd) {
        cart.addItem(productToAdd);
    }
});

// Event handler for populating cart view
document.getElementById('view-cart-button').addEventListener('click', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    const cartItems = cart.getItems();
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'bg-info bg-opacity-25 rounded my-2 p-2 position-relative';

        // Create the X button
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn-close position-absolute top-0 end-0 m-2';
        removeBtn.setAttribute('aria-label', 'Remove');
        removeBtn.addEventListener('click', function (e) {
            cart.removeItem(item.id);
            // Remove the item element from the DOM
            itemElement.remove();
        });

        // Add the X button to the item element
        itemElement.appendChild(removeBtn);

        // Add the item text
        const textSpan = document.createElement('span');
        textSpan.textContent = `${item.title} - $${item.price}`;
        itemElement.appendChild(textSpan);

        cartItemsContainer.appendChild(itemElement);
    });
});

// Event handler for delete all button
document.querySelector('.btn.btn-danger').addEventListener('click', function () {
    cart.clearCart();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
});

export { ShoppingCart };