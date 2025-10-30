// -----------------------------------------------------------------------------------
// Import dependencies                                                               |
// -----------------------------------------------------------------------------------
import { Product, ProductList } from '../productCard/productCard.js';    

// -----------------------------------------------------------------------------------
// Class declaration for our shopping cart and its methods                           |
// -----------------------------------------------------------------------------------
class ShoppingCart {
    #items;
    constructor() {
        this.#items = [];
    }
    initElements() {
        this.buttonElements = {
            // btnShoppingCart: document.getElementById('view-cart-button'),
            btnCheckout: document.getElementById('btn-checkout'),
            btnDeleteAll: document.getElementById('btn-clear-cart')
        };
    }

    setupEventListeners(){
        // this.buttonElements.btnShoppingCart.addEventListener('click', () => {
        //     cart.renderCartItems();
        // });
        this.buttonElements.btnCheckout.addEventListener('click', () => {
            //cart.checkout();
            return
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
        document.getElementById('cart-items').innerHTML = '';
        this.loadFromLocalStorage();
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

    toJSON() {
        return this.#items.map(item => item.toJSON());
    }

    loadFromLocalStorage() {
        const cartJSON = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        this.#items = cartJSON.map(item => Product.fromObject(item));
    }

    saveToLocalStorage() {
        const cartJSON = this.#items.map(item => item.toJSON());
        localStorage.setItem('shoppingCart', JSON.stringify(cartJSON));
    }
}

// -----------------------------------------------------------------------------------
// Function to initialize the offcanvas cart structure in the DOM                    |
// we also initialize the product list and setup event listeners
// -----------------------------------------------------------------------------------
function initializeOffcanvasCart() {
    document.body.innerHTML += /* html */ `
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRightScroll" aria-labelledby="offcanvasRightScrollLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightScrollLabel">Your Cart</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div id="cart-items-container">
              <div id="cart-items">
                  <!-- Cart items will be injected here -->
              </div>
          </div>
          <button class="btn btn-primary" id="btn-checkout">Go to Checkout</button>
          <button class="btn btn-danger" id="btn-clear-cart">Delete All</button>
        </div>
      </div>
    `;
    // Initialize cart
}

const cart = new ShoppingCart();
initializeOffcanvasCart();
cart.initElements();
cart.setupEventListeners();
cart.loadFromLocalStorage();
cart.renderCartItems();

export { initializeOffcanvasCart };
