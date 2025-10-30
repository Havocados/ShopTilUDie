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
        const existingItem = this.#items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.#items.push({ product, quantity: 1 });
        }
        this.saveToLocalStorage();
    }

    removeItem(productId) {
        const itemIndex = this.#items.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
            this.#items[itemIndex].quantity -= 1;
            if (this.#items[itemIndex].quantity <= 0) {
                this.#items.splice(itemIndex, 1);
            }
            this.saveToLocalStorage();
        }
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
            removeBtn.addEventListener('click', () => {
                this.removeItem(item.product.id);
                this.renderCartItems();
            });

            // Add the X button to the item element
            itemElement.appendChild(removeBtn);

            // Add the item text
            const cartItem = document.createElement('div');
            cartItem.innerHTML /* html */= `
                <h6 class="fw-bold cart-item-title">${item.product.title}</h6>
                <p class="cart-item-price">$${item.product.price}</p>
                <p class="cart-item-quantity">Qty: ${item.quantity}</p>`;
            itemElement.appendChild(cartItem);

            cartItemsContainer.appendChild(itemElement);
        });
    }

    toJSON() {
        return this.#items.map(item => ({ product: item.product.toJSON(), quantity: item.quantity }));
    }

    loadFromLocalStorage() {
        const cartJSON = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        this.#items = cartJSON.map(item => ({ product: Product.fromObject(item.product), quantity: item.quantity }));
    }

    saveToLocalStorage() {
        const cartJSON = this.toJSON();
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
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-primary flex-fill" id="btn-checkout">Go to Checkout</button>
            <button class="btn btn-danger flex-fill" id="btn-clear-cart">Delete All</button>
          </div>
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

export { initializeOffcanvasCart, cart };
