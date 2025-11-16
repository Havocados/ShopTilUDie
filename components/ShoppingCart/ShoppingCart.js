import { Product } from "../Products/Products.js";
import { showConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog.js"

class ShoppingCart {
  #items;
  #costTotal;
  constructor() {
    this.#items = [];
    this.#costTotal = 0;
  }

  initElements() {
    this.buttonElements = {
      // btnShoppingCart: document.getElementById('view-cart-button'),
      btnCheckout: document.getElementById("btn-checkout"),
      btnClearCart: document.getElementById("btn-toggle-clear-cart-alert"),
      btnIncrementQuantity: document.querySelectorAll(".button-plus"),
      btnDecrementQuantity: document.querySelectorAll(".button-minus"),
    };
  }

  setupEventListeners() {
    this.buttonElements.btnCheckout.addEventListener("click", () => {
      // NYI
      // cart.checkout();
      return;
    });

    this.buttonElements.btnClearCart.addEventListener("click", () => {
      showConfirmationDialog(
        "Är du säker?",
        "Detta kommer att rensa alla objekt i din kundvagn."
      );
    });
  }

  addItem(product) {
    const existingItem = this.#items.find(
      (item) => item.product.id === product.id
    );
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
    const itemIndex = this.#items.findIndex(
      (item) => item.product.id === productId
    );
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

  removeAllOfItem(productId) {
    const itemIndex = this.#items.findIndex(
      (item) => item.product.id === productId
    );
    if (itemIndex !== -1) {
      this.#items.splice(itemIndex, 1);
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
    document.getElementById("cart-items").innerHTML = "";
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
  renderCartItems(containerId = "cart-items") {
    const cartItems = this.getItems();
    const cartItemsContainer = document.getElementById(containerId);
    cartItemsContainer.innerHTML = "";
    cartItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className =
        "cart-item rounded my-2 position-relative";

      // Add the cart items
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item d-flex align-items-center shadow-sm ps-4";
      // -------------------------- OUTPUT HTML FOR CART ITEM -----------------------------
      cartItem.innerHTML /* html */ = `
        <div class="cart-item-image">
            <img src="${item.product.image}" alt="${item.product.title}" class="img-fluid">
        </div>
        <div class="row cart-item-details mx-auto px-2 justify-content-between w-100">
            <h6 class="fw-bold cart-item-title pr-4 clamp-3-lines">${
              item.product.title
            }</h6>
            <div class="d-flex flex-row mb-2 mt-auto">
                <p class="my-auto mr-2">Antal: </p>
                <div class="d-flex justify-content-between">
                    <div class="input-group w-auto justify-content-center align-items-center">
                        <button id="button-minus" class="border rounded-circle increment-icon mx-1" data-item-id="${
                        item.product.id
                        }">
                            -
                        </button>
                        <p class="mx-2 my-auto cart-item-quantity"><strong>${
                        item.quantity
                        }</strong></p>
                        <button value="+" id="button-plus" class="border rounded-circle increment-icon mx-1" data-item-id="${
                        item.product.id
                        }">+</button>
                    </div>
                </div>
            </div>
            <p class="h6 cart-item-price my-auto">${item.product.price * item.quantity} SEK</p>
        </div>
        <div class="remove-btn">
            ✖
        </div>`;
      // -------------------------- END OUTPUT HTML FOR CART ITEM -------------------------

      // Add event listener to the remove button, increment and decrement buttons
      // for this current cart item, and bind the actions to the cart methods responsible
      // for modifying the cart state
      const removeBtn = cartItem.querySelector(".remove-btn");
      const btnIncrement = cartItem.querySelector("#button-plus");
      const btnDecrement = cartItem.querySelector("#button-minus");

      removeBtn.addEventListener("click", () => {
        this.removeAllOfItem(item.product.id);
        this.renderCartItems();
      });
      btnIncrement.addEventListener("click", () => {
        this.addItem(item.product);
        this.renderCartItems();
      });
      btnDecrement.addEventListener("click", () => {
        if (item.quantity <= 1) {
          return;
        }
        this.removeItem(item.product.id);
        this.renderCartItems();
      });

      itemElement.appendChild(cartItem);
      cartItemsContainer.appendChild(itemElement);
    });
  }

  // --- Methods to calculate and print total cost ---
  calculateTotalCost() {
    this.#costTotal = this.#items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const twoDigitsTotal = parseFloat(this.#costTotal.toFixed(2));
    return twoDigitsTotal;
  }

  printTotalCost(containerId = "cart-total-price") {
    const totalCost = this.calculateTotalCost();
    const totalContainer = document.getElementById(containerId);
    totalContainer.textContent = totalCost;
  }
  // --- End methods to calculate and print total cost ---

  printNumberOfItemsOnBadge(badgeId = "cart-item-count-badge") {
    const totalItems = this.#items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const badgeContainer = document.getElementById(badgeId);
    badgeContainer.textContent = totalItems;
  }

  toJSON() {
    return this.#items.map((item) => ({
      product: item.product.toJSON(),
      quantity: item.quantity,
    }));
  }
  
  loadFromLocalStorage() {
    const cartJSON = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    this.#items = cartJSON.map((item) => ({
      product: Product.fromObject(item.product),
      quantity: item.quantity,
    }));
  }

  saveToLocalStorage() {
    const cartJSON = this.toJSON();
    localStorage.setItem("shoppingCart", JSON.stringify(cartJSON));
  }
}

/* 
Function to initialize the offcanvas cart structure in the DOM
we also initialize the product list and setup event listeners
 */
function initializeOffcanvasCart() {
  document.body.innerHTML += /* html */ `
      <div class="offcanvas offcanvas-end px-2" tabindex="-1" id="offcanvasRightScroll" aria-labelledby="offcanvasRightScrollLabel">
        <div class="offcanvas-header">
          <h3 class="offcanvas-title font-family-jaro" id="offcanvasRightScrollLabel">Din Kundvagn</h3>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div id="cart-items-container">
              <div id="cart-items">
                  <!-- Cart items will be injected here -->
              </div>
          </div>
          <div id="cart-total" class="mt-3 border-top border-bottom py-auto">
              <h5 class="mb-0 py-2">Totalt: <span id="cart-total-price">0</span> SEK</h5>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-primary flex-fill"
                    id="btn-checkout">
                        Gå till kassan
            </button>
            <button class="btn btn-secondary flex-fill"
                    id="btn-toggle-clear-cart-alert"
                    data-bs-toggle="modal"
                    data-bs-target="#alertModal">
                        Rensa kundvagn
            </button>
          </div>
        </div>
      </div>
    `;
  // Initialize cart
}

// On this script-file load , run through the necessary steps to setup products and cart
export const cart = new ShoppingCart();
initializeOffcanvasCart();
cart.initElements();
cart.setupEventListeners();
cart.loadFromLocalStorage();
cart.renderCartItems();
cart.printTotalCost();

// Initialize Bootstrap offcanvas instance
// Important for controlling the offcanvas via JS when needed
export const myOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRightScroll'));

// export { myOffcanvas, cart };
// export default cart;