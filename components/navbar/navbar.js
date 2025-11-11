/*
    This script fetches the navbar data and renders the navbar links
    dynamically.
*/

// Import data
import navbarData from "./Navbar.json" with { type: "json" };
// Import dependencies
import { cart } from "../ShoppingCart/ShoppingCart.js";
import { renderCategoryLinks, getCategories } from "../Category/Category.js";

// Import page content functions
import { homePageContent } from "../../pages/home.js";
import { aboutPageContent } from "../../pages/about.js";
import { kontaktPageContent } from "../../pages/kontakt.js";
import { tjansterPageContent } from "../../pages/tjanster.js";

// PLACEHOLDER IDEA, mapping page IDs to content functions
// call this when swapping main content
// This can probably be improved with dynamic imports later on
const pageContentMap = {
  home: homePageContent,
  about: aboutPageContent,
  kontakt: kontaktPageContent,
  tjanster: tjansterPageContent,
};

const navbarTarget = document.querySelector("nav.navbar");
export const CollapseNavbar = new Event("CollapseNavbar");

// Extract navbar items from data
let navbarItems = navbarData.pages;

function renderNavbar() {
  // -------------------------- OUTPUT HTML FOR NAVBAR -----------------------------
  navbarTarget.innerHTML = /* html */ `
    <div class="container py-2 my-1">
        <a  href="index.html"
            class="d-flex align-items-center link-body-emphasis text-decoration-none"
            aria-label="Bootstrap">
            <img src="assets/images/shopTillUDieLogo.png" alt="ShopTilUDie" class="navbar-logo" />
        </a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end border-0"
             id="navbarSupportedContent">
          <ul class="navbar-nav me-0 mb-2 mb-lg-0" id="navigation-list">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Produkter
                </a>
              <ul class="dropdown-menu" id="product-categories-dropdown">
                <!-- Category links will be populated here -->
              </ul>
            </li>
                <!-- Additional navbar items will be populated here -->
          </ul>
          <div class="w-auto d-flex justify-content-center justify-content-lg-end">
            <button id="view-cart-button" class="btn btn-primary px-3 justify-content-center" type="button"
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightScroll" aria-controls="offcanvasRightScroll"
            >
              <span class="position-relative">
                <span class="badge rounded-pill bg-danger" id="cart-item-count-badge">
                  0
                <span class="visually-hidden">items in cart</span>
                </span>
              </span>
              <i class="bi bi-cart" style="font-size: 1.5rem; color: black;"></i>
            </button>
          </div>
        </div>
    </div>`;
  // -------------------------- END OUTPUT HTML FOR NAVBAR --------------------------

  // When the navbar structure is rendered, populate the links
  renderNavbarLinks();
  cart.printNumberOfItemsOnBadge();

  // Populate category links
  getCategories();
  renderCategoryLinks();

  // Initially load home page content
  homePageContent();
}

// Run function immediately to initialize navbar and SPA navigation
renderNavbar();

/* Function to render navbar links
This function populates the navbar with links based on the fetched data */
function renderNavbarLinks() {
  const navigationListTarget = document.getElementById("navigation-list");
  let linksHTML = "";
  navbarItems.forEach((page) => {
    if (page.id === "home") {
      return; // Skip adding home link to navbar
    }
    linksHTML += /* html */ `
      <li class="nav-item mx-2">
        <a class="nav-link text-center link-body-emphasis" href="#" id="link-${page.id}">
          ${page.displayName}
        </a>
      </li>`;
  });
  navigationListTarget.innerHTML += linksHTML;
}

// Behavior to collapse navbar on custom event CollapseNavbar
// default bootstrap behavior breaks in current SPA setup
document.addEventListener("CollapseNavbar", () => {
const navbarCollapseElement = document.getElementById("navbarSupportedContent");
const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseElement);
if (bsCollapse && navbarCollapseElement.classList.contains("show")) {
  bsCollapse.hide();
}
});

// Event listener for using the navbar links for SPA navigation
const navigationList = document.getElementById("navigation-list");
navigationList.addEventListener("click", (e) => {
// Prevent default link behavior
e.preventDefault();
const target = e.target;
if (target.tagName === "A" && target.id.startsWith("link-")) {
  const pageId = target.id.replace("link-", ""); // Extract page ID
  // If we have a mapping for this page, call the corresponding function
  if (pageContentMap[pageId]) {
    pageContentMap[pageId]();
    highlightActivePage(pageId);

    // Collapse the navbar after clicking a link (for mobile view)
    document.dispatchEvent(CollapseNavbar);
  }
}
});

/* Function to highlight the active page link
This function adds the 'active' class to the currently active link
and removes it from other links in the navbar */
function highlightActivePage(pageId) {
  const navigationListTarget = document.getElementById("navigation-list");
  const navLinks = navigationListTarget.getElementsByClassName("nav-link");
  Array.from(navLinks).forEach((link) => {
    if (link.id === `link-${pageId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}