// -----------------------------------------------------------------------------------
// Import dependencies                                                               |
// -----------------------------------------------------------------------------------
import { Product, ProductList } from "../components/productCard/productCard.js";
import { cart } from "../components/shoppingCart/shoppingCart.js";

// -----------------------------------------------------------------------------------
// Define constants                                                                  |
// -----------------------------------------------------------------------------------
const productList = new ProductList();
const localStorageKey = "productList";

// -----------------------------------------------------------------------------------
// Functions                                                                         |
// -----------------------------------------------------------------------------------
export function produkterPageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Produkter - ShopTilUDie";

  // -------------------------- OUTPUT HTML FOR PRODUCTS PAGE -----------------------------
  target.innerHTML = /* html */ `
    <div class="container pb-4">
      <div class="input-group mb-3 pt-3 justify-content-end">
        <span class="input-group-text" id="basic-addon1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
          </svg>
        </span>
        <select class="custom-select fw-bold" name="category" id="category-select">
          <option class="fw-bold" value="all">All</option>
          <option class="fw-bold" value="electronics">Electronics</option>
          <option class="fw-bold" value="jewelery">Jewelery</option>
          <option class="fw-bold" value="men's clothing">Men's Clothing</option>
          <option class="fw-bold" value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      <div class="bd-example m-0 border-0">
        <div id="product-container" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

                <!-- Product cards will be injected here -->

        </div>
      </div>
    </div>
        <div class="pagination-container"></div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script type="module" src="../productCard/productCard.js"></script>

    `;
  // -------------------------- END OUTPUT HTML FOR PRODUCTS PAGE ----------------------------

  // If there are no products in local storage, fetch from API
  if (!localStorage.getItem(localStorageKey)) {
    productList
      .fetchAllProducts()
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
    });
    setupCartEventListeners();
  }
}

// Setup event listeners for Add To Cart buttons in all cards
function setupCartEventListeners() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const productToAdd = productList.products.find(
        (prod) => prod.id === productId
      );
      if (productToAdd) {
        cart.addItem(productToAdd);
        cart.renderCartItems();
      }
    });
  });
}
