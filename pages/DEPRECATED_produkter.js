// -----------------------------------------------------------------------------------
// Import dependencies                                                               |
// -----------------------------------------------------------------------------------
import { Product, productList } from "../components/Products/Products.js";
import { cart } from "../components/ShoppingCart/ShoppingCart.js";

// -----------------------------------------------------------------------------------
// Define constants                                                                  |
// -----------------------------------------------------------------------------------
const localStorageKey = "productList";
const filteredProductList = productList.filterByCategory("men's clothing");
console.log("Filtered products for category 'men's clothing':", filteredProductList);
// -----------------------------------------------------------------------------------
// Functions                                                                         |
// -----------------------------------------------------------------------------------
export function renderProductsPageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Produkter - ShopTilUDie";

  // -------------------------- OUTPUT HTML FOR PRODUCTS PAGE -----------------------------
  target.innerHTML = /* html */ `
    <style src="/components/Products/Products.css"></style>
    <div class="pb-5">
    <div class="container pt-4">
    <nav class="breadcrumb" aria-label="breadcrumb">
        <ol class="breadcrumb fw-bold text-capitalize my-0">
            <li class="breadcrumb-item"><a href="#">Products</a></li>
            <li class="breadcrumb-item active" aria-current="page"><a href="#">(PH)Winter Wear</a></li>
        </ol>
    </nav>
    </div>
    <div class="container p-2">
      <div class="bd-example m-0 border-0">
        <div id="product-container" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

                <!-- Product cards will be injected here -->

        </div>
      </div>
    </div>
        <div class="pagination-container"></div>
        </div>
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
        productList.setupEventListeners();
      });
  } else {
    productList.loadFromLocalStorage();
    console.log("Loaded products from local storage.");
    productList.products.forEach((product) => {
      product.createProductCard(product);
    });
    productList.setupEventListeners();
  }
}