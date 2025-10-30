import { Product, ProductList } from "../components/productCard/productCard.js";
import { ShoppingCart } from "../components/shoppingCart/shoppingCart.js";

const productList = new ProductList();
const cart = new ShoppingCart();
const localStorageKey = "productList";

export function produkterPageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Produkter - ShopTilUDie";

  // Swap out the inner HTML of the main content area
  target.innerHTML = /* html */ `
  <div class="input-group mb-3">
      <select class="custom-select" name="category" id="category-select">
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
    </div>

    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div
          id="product-container"
          class="grid row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 gap-2"
        >
            <!-- Product cards will be injected here -->
        </div>

        <div class="pagination-container"></div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script type="module" src="../shoppingCart/shoppingCart.js"></script>
    <script type="module" src="../productCard/productCard.js"></script>

    <style lang="">
      .product-card img {
        max-width: 100%;
        height: auto;
      }
    </style>
    `;

  // If there are no products in local storage, fetch from API
  if (!localStorage.getItem(localStorageKey)) {
    productList
      .fetchAllProducts()
      .then(() => {
        productList.products.forEach((product) => {
          productList.addProduct(product);
        });
      })
      .then(() => {
        // Save to local storage
        productList.saveToLocalStorage();
        console.log("Fetched products and saved to local storage.");
      })
      .then(() => {
        // Render product cards after they've been fetched and stored
        productList.products.forEach((product) => {
          product.createProductCard(product);
        });
        setupCartEventListeners();
      });
  } else {
    productList.loadFromLocalStorage();
    console.log("Loaded products from local storage.");
    productList.products.forEach((product) => {
      product.createProductCard(product);
    })
    setupCartEventListeners();
  }
}

// Setup event listeners for Add To Cart buttons in all cards
function setupCartEventListeners() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
          const productId = parseInt(e.target.getAttribute('data-id'));
          const productToAdd = productList.products.find(prod => prod.id === productId);
          if (productToAdd) {
                    cart.addItem(productToAdd);
                    cart.renderCartItems();
                }
            });
        });
    }