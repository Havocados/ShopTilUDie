import { renderProductDetails } from "../ProductDetails/ProductDetails.js";
import { scrollToTop } from "../../scripts/main.js";

const SelectedProduct = new CustomEvent("SelectedProduct", { detail: {  } });

class Product {
  #category;
  #description;
  #id;
  #image;
  #price;
  #rating;
  #title;

  constructor(category, description, id, image, price, rating, title) {
    this.#category = category;
    this.#description = description;
    this.#id = id;
    this.#image = image;
    this.#price = price;
    this.#rating = rating;
    this.#title = title;
  }

  /* Getters */
  get category() {
    return this.#category;
  }
  get description() {
    return this.#description;
  }
  get id() {
    return this.#id;
  }
  get image() {
    return this.#image;
  }
  get price() {
    return this.#price;
  }
  get rating() {
    return this.#rating;
  }
  get title() {
    return this.#title;
  }

  /* Setters */
  set category(newCategory) {
    this.#category = newCategory;
  }
  set description(newDescription) {
    this.#description = newDescription;
  }
  set id(newId) {
    this.#id = newId;
  }
  set image(newImage) {
    this.#image = newImage;
  }
  set price(newPrice) {
    this.#price = newPrice;
  }
  // Rating is an array with count and rate
  set rating(newRating) {
    this.#rating = newRating;
  }
  set title(newTitle) {
    this.#title = newTitle;
  }

  // convert product to json object
  toJSON() {
    return {
      category: this.#category,
      description: this.#description,
      id: this.#id,
      image: this.#image,
      price: this.#price,
      rating: this.#rating,
      title: this.#title,
    };
  }

  // create product from json object
  static fromObject(jsonobj) {
    const product = new Product();
    product.category = jsonobj.category;
    product.description = jsonobj.description;
    product.id = jsonobj.id;
    product.image = jsonobj.image;
    product.price = jsonobj.price;
    product.rating = jsonobj.rating;
    product.title = jsonobj.title;
    return product;
  }

  // Fetch product data from API
  // for a given productId
  fetchProduct(productId = 1) {
    return fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        return new Product(
          data.category,
          data.description,
          data.id,
          data.image,
          data.price,
          data.rating,
          data.title
        );
      });
  }

  exchangeDollarToSEK(dollarAmount) {
    const exchangeRate = 9.58; // Exchange rate from USD to SEK as of 2025-11-05
    return Math.round(dollarAmount * exchangeRate);
  }

  createProductCard(product, containerId = "product-container") {
    const productContainer = document.getElementById(containerId);
    const productCard = document.createElement("div");
    productCard.className = "col";
    // -------------------------- OUTPUT HTML FOR PRODUCT CARD -----------------------------
    productCard.innerHTML = /* html */ `
        <div class="card">
            <div class="image-box justify-content-center d-flex mx-4 mt-4">
                <img class="card-img" src="${product.image}" alt="${product.title}" style="max-height:200px" />
            </div>
            <div class="card-body d-flex flex-column">
                <h2 class="card-title fw-bold my-auto clamp-2-lines">${product.title}</h2>
                <p class="card-text text-center py-2">${product.price} kr</p>
                <button class="btn btn-primary w-100 go-to-product" data-id="${product.id}">Visa produkt</button>
          </div>
        </div>
          
        `;
    // -------------------------- END OUTPUT HTML FOR PRODUCT CARD -------------------------
    productContainer.appendChild(productCard);
  }
}

class ProductList {
  #products = [];
  constructor(products = []) {
    this.#products = products;
  }

  get products() {
    return this.#products;
  }

  set products(newProducts) {
    this.#products = newProducts;
  }

  initElements() {
    this.buttonElements = {
      btnGoToProduct: document.querySelectorAll(".go-to-product"),
    };
  }

  setupEventListeners() {
    this.initElements();
    this.buttonElements.btnGoToProduct.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = this.#products.find(
          (prod) => prod.id === productId
        );
        if (product) {
          SelectedProduct.detail.productId = productId;
          document.dispatchEvent(SelectedProduct);
        } else {
          console.error(`Product with ID: ${productId} not found.`);
        }
      });
    });
  }

  addProduct(product) {
    this.#products.push(product);
  }

  removeProduct(productId) {
    this.#products = this.#products.filter(
      (product) => product.id !== productId
    );
  }
  
  findProductById(productId) {
    return this.#products.find((product) => product.id === productId);
  }
  
  convertPricesUSDToSEK() {
    this.#products.forEach((product) => {
      product.price = product.exchangeDollarToSEK(product.price);
    });
  }

  fetchAllProducts(apiURL = "https://fakestoreapi.com/products") {
    return fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        this.#products = data.map((item) => Product.fromObject(item));
        // Convert prices to SEK after fetching
        this.convertPricesUSDToSEK();
        return this.#products;
      });
  }

  saveToLocalStorage(name = "productList") {
    const productsJSON = this.#products.map((product) => product.toJSON());
    localStorage.setItem(name, JSON.stringify(productsJSON));
  }

  loadFromLocalStorage() {
    const productsJSON = JSON.parse(localStorage.getItem("productList")) || [];
    this.#products = productsJSON.map((item) => Product.fromObject(item));
  }

  filterByCategory(category) {
    return this.#products.filter((product) => product.category === category);
  }
}

// ------------- Singleton instance of ProductList ----------------
// I was having issues with multiple instances and data not persisting
// also managing localStorage and fetching from API was causing problems
// when not awaiting properly, so this should help with that.
// Probably not optimal for larger databases, where I assume you might want
// to fetch on demand and paginate the imports.
const productList = new ProductList();
if (!localStorage.getItem("productList")) {
  productList
    .fetchAllProducts()
    .then(() => {
      productList.saveToLocalStorage();
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
  } else {
    productList.loadFromLocalStorage();
  }
// -----------------------------------------------------------------

// Function to render category page content
// triggered when a category is selected from the dropdown via the CustomEvent in Category.js
export function renderCategoryPageContent(
    category,
    target = document.getElementById("main-content")
) {
    document.title = `ShopTillUDie - ${category}`;
    const filteredProducts = productList.filterByCategory(category);
    // -------------------------- OUTPUT HTML FOR CATEGORY SUBNAV -----------------------
    target.innerHTML = /* html */ `
    <style src="/components/Category/Category.css"></style>
    <div class="container py-4">
        <nav class="breadcrumb" aria-label="breadcrumb">
            <ol class="breadcrumb fw-bold text-capitalize my-0">
                <li class="breadcrumb-item"><a href="#">Products</a></li>
                <li class="breadcrumb-item active" aria-current="page">${category}</li>
            </ol>
        </nav>
        <div id="category-product-container" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <!-- Product cards will be injected here -->
        </div>
    </div>
    `;
    // -------------------------- END OUTPUT HTML FOR CATEGORY SUBNAV -----------------------

    // Render product cards for the filtered products
    filteredProducts.forEach((product) => {
        product.createProductCard(product, "category-product-container");
    });

    productList.setupEventListeners();
}

// Setup listening for category selection event in category component
document.addEventListener("SelectedCategory", (e) => {
  const category = e.detail.category;
  renderCategoryPageContent(category);
  scrollToTop();
});

export { Product, productList };
