import { scrollToTop } from "../../scripts/main.js";
import { productList } from "../Products/Products.js";
import { cart, myOffcanvas } from "../ShoppingCartTemp/ShoppingCartTemp.js";


const AddedToCart = new CustomEvent("AddedToCart", { detail: {  } });

export function renderProductDetails(
  productId,
  target = document.getElementById("main-content")
) {
  if (!productList) {
    target.innerHTML = "<p>Loading product details...</p>";
    return;
  }
  const product = productList.findProductById(productId);
  if (!product) {
    target.innerHTML = "<p>Product not found.</p>";
    return;
  }

  // Set the document title
  document.title = `${product.title} - ShopTilUDie`;

  // -------------------------- OUTPUT HTML FOR PRODUCT DETAILS PAGE -----------------------------
  target.innerHTML = /* html */ `
    <div class="container pt-4">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb fw-bold text-capitalize">
            <li class="breadcrumb-item"><a href="#">Products</a></li>
            <li class="breadcrumb-item"><a href="#">${product.category}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${product.title}</li>
        </ol>
    </nav>
    </div>
    <div class="container py-5">
    <div class="row">
        <div class="col-md-6">
        <img src="${product.image}" alt="${product.title}" class="img-fluid">
        </div>
        <div class="col-md-6">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p class="fw-bold">Pris: ${product.price} kr</p>
        <p class="fw-bold">Betyg: ${product.rating.rate} (${product.rating.count} recensioner)</p>
        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Lägg till i Kundvagn</button>
        </div>
    </div>
    </div>
    `;
  // -------------------------- END OUTPUT HTML FOR PRODUCT DETAILS PAGE -----------------------------

  // Setup event listener for Add to Cart button
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const productToAdd = productList.findProductById(productId);
      if (productToAdd) {
        AddedToCart.detail.productId = productId;
        document.dispatchEvent(AddedToCart);
      }
    });
  });
}

// Setup listening for category selection event in category component
document.addEventListener("SelectedProduct", (e) => {
  const productId = e.detail.productId;
  renderProductDetails(productId);
  scrollToTop();
});

// Setup listening for AddedToCart event in ShoppingCart component
document.addEventListener("AddedToCart", (e) => {
  const productId = e.detail.productId;
  const itemToAdd = productList.findProductById(productId);
  cart.addItem(itemToAdd);
  cart.renderCartItems();
  myOffcanvas.show();
});