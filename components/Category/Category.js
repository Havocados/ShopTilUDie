import { productList } from "../Products/Products.js";

const categories = [];
export const SelectedCategory = new CustomEvent("SelectedCategory", { detail: {  } });

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
            <li class="py-1">
                <a class="dropdown-item text-capitalize text-center py-1" data-category="${category}" href="#">${category}</a>
            </li>
        `;
    });

    // Event listener for category links

    target.querySelectorAll("a[data-category]").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = e.target.getAttribute("data-category");
            SelectedCategory.detail.category = category;
            console.log("Dispatching SelectedCategory event for category:", category);
            document.dispatchEvent(SelectedCategory);
            console.log(`Category link clicked: ${category}`);
            console.log(SelectedCategory)
            //renderCategoryPageContent(category);
        });
    });
}