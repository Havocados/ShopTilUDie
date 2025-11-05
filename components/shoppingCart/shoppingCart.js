// -----------------------------------------------------------------------------------
// Import dependencies                                                               |
// -----------------------------------------------------------------------------------
import { Product, ProductList } from '../productCard/productCard.js';    

// -----------------------------------------------------------------------------------
// Class declaration for our shopping cart and its methods                           |
// -----------------------------------------------------------------------------------
class ShoppingCart {
    #items;
    #costTotal;
    constructor() {
        this.#items = [];
        this.#costTotal = 0.00;
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
        this.printTotalCost();
        this.printNumberOfItemsOnBadge();
    }

    removeItem(productId) {
        const itemIndex = this.#items.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
            this.#items[itemIndex].quantity -= 1;
            if (this.#items[itemIndex].quantity <= 0) {
                this.#items.splice(itemIndex, 1);
            }
            this.saveToLocalStorage();
            this.printTotalCost();
            this.printNumberOfItemsOnBadge();
        }
    }

    getItems() {
        return this.#items;
    }
    
    /*  
    Method to clear the entire cart
    used when clicking "Delete All" button
     */
    clearCart() {
        this.#items = [];
        this.saveToLocalStorage();
        document.getElementById('cart-items').innerHTML = '';
        this.loadFromLocalStorage();
        this.printTotalCost();
        this.printNumberOfItemsOnBadge();
    }

    /*  
        Method to render cart items in the offcanvas
        used for populating the cart view
        called when opening the cart and after adding/removing items
        to update the view, reflecting current cart state
     */
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
                <h6 class="fw-bold cart-item-title pr-2">${item.product.title}</h6>
                <p class="cart-item-price">$${item.product.price}</p>
                <p class="cart-item-quantity">Qty: ${item.quantity}</p>`;
            itemElement.appendChild(cartItem);

            cartItemsContainer.appendChild(itemElement);
        });
    };

    // --- Methods to calculate and print total cost ---
    calculateTotalCost () {
        this.#costTotal = this.#items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        const twoDigitsTotal = parseFloat(this.#costTotal.toFixed(2));
        return twoDigitsTotal;
    };

    printTotalCost (containerId='cart-total-price') {
        const totalCost = this.calculateTotalCost();
        const totalContainer = document.getElementById(containerId);
        totalContainer.textContent = totalCost;
    }; 
    // --- End methods to calculate and print total cost ---

    printNumberOfItemsOnBadge (badgeId='cart-item-count-badge') {
        const totalItems = this.#items.reduce((total, item) => total + item.quantity, 0);
        const badgeContainer = document.getElementById(badgeId);
        badgeContainer.textContent = totalItems;
    ;}

    toJSON() {
        return this.#items.map(item => ({ product: item.product.toJSON(), quantity: item.quantity }));
    };

    loadFromLocalStorage() {
        const cartJSON = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        this.#items = cartJSON.map(item => ({ product: Product.fromObject(item.product), quantity: item.quantity }));
    };

    saveToLocalStorage() {
        const cartJSON = this.toJSON();
        localStorage.setItem('shoppingCart', JSON.stringify(cartJSON));
    };
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
          <div id="cart-total" class="mt-3">
              <h5>Total: $<span id="cart-total-price">0.00</span></h5>
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

// On app load - create cart instance, initialize elements, setup event listeners, load from local storage and render items
const cart = new ShoppingCart();
initializeOffcanvasCart();
cart.initElements();
cart.setupEventListeners();
cart.loadFromLocalStorage();
cart.renderCartItems();

export { initializeOffcanvasCart, cart };
