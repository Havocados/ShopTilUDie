import { Product } from "../Products/Products.js";
import { cart } from "../ShoppingCart/ShoppingCart.js";

export function renderProductDetails(
  productId,
  target = document.getElementById("main-content")
) {
  const productList = localStorage.getItem("productList");
  if (!productList) {
    target.innerHTML = "<p>Loading product details...</p>";
    return;
  }
  const parsedProducts = JSON.parse(productList);
  const products = parsedProducts.map((item) => Product.fromObject(item));
  const product = products.find((prod) => prod.id === productId);
  console.log("Rendering details for product ID:", product);
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
        <p class="fw-bold">Price: $${product.price}</p>
        <p class="fw-bold">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
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
      const productToAdd = products.find((prod) => prod.id === productId);
      if (productToAdd) {
        cart.addItem(productToAdd);
        cart.renderCartItems();
      }
    });
  });
}
