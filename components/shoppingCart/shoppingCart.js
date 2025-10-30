import { Product, ProductList } from '../productCard/productCard.js';    

class ShoppingCart {
    #items;
    constructor() {
        this.#items = [];
    }
    initElements() {
        this.buttonElements = {
            btnShoppingCart: document.getElementById('view-cart-button'),
            btnCheckout: document.getElementById('go-to-checkout'),
            btnDeleteAll: document.getElementById('delete-all')
        };
    }

    setupEventListeners(){
        this.buttonElements.btnShoppingCart.addEventListener('click', () => {
            cart.renderCartItems();
        });
        this.buttonElements.btnCheckout.addEventListener('click', () => {
            cart.checkout();
        });
        this.buttonElements.btnDeleteAll.addEventListener('click', () => {
            cart.clearCart();
        });
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

    renderCartItems(containerId='cart-items') {
        const cartItems = this.getItems();
        const cartItemsContainer = document.getElementById(containerId);
        cartItemsContainer.innerHTML = '';
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
        document.querySelectorAll('#cart-items .btn-close').forEach(button => {
            button.addEventListener('click', function (e) {
                const itemId = e.target.closest('.bg-info').querySelector('span').textContent.split(' - ')[0];
                cart.removeItem(itemId);
                cart.renderCartItems();
            });
        });
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

export { ShoppingCart };
