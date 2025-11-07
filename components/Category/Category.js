import { productList } from "../Products/Products.js";

const categories = [];

export function getCategories() {
    productList.products.forEach((product) => {
    if (!categories.includes(product.category)) {
        categories.push(product.category);
    }
    });
    console.log("Extracted categories:", categories);
    return categories;
}

export function renderCategoryLinks(
    target = document.getElementById("product-categories-dropdown")
) {
    categories.forEach((category) => {
        target.innerHTML += /* html */ `
            <li>
                <a class="dropdown-item text-capitalize" data-category="${category}" href="#">${category}</a>
            </li>
        `;
    });
    // Event listener for category links
    target.querySelectorAll("a[data-category]").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = e.target.getAttribute("data-category");
            console.log(`Category link clicked: ${category}`);
            renderCategoryPageContent(category);
        });
    });
}

export function renderCategoryPageContent(
    category,
    target = document.getElementById("main-content")
) {
    document.title = `ShopTillUDie - ${category}`;
    const filteredProducts = productList.filterByCategory(category);

    target.innerHTML = /* html */ `
    <style src="/components/Category/Category.css"></style>
    <div class="container py-4">
        <nav class="breadcrumb" aria-label="breadcrumb">
            <ol class="breadcrumb fw-bold text-capitalize my-0">
                <li class="breadcrumb-item"><a href="#">Products</a></li>
                <li class="breadcrumb-item active" aria-current="page"><a href="#">${category}</a></li>
            </ol>
        </nav>
        <div id="category-product-container" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <!-- Product cards will be injected here -->
        </div>
    </div>
    `;

    // Render product cards for the filtered products
    const productContainer = document.getElementById("category-product-container");
    filteredProducts.forEach((product) => {
        product.createProductCard(product, "category-product-container");
    });

    productList.setupEventListeners();
}