/*
Navbar component script

Description:
    This script fetches the navbar data and renders the navbar links
    dynamically.
Usage:
    Used in all pages that include the navbar component.
*/

// -----------------------------------------------------------------------------------
// Import dependencies                                                               |
// -----------------------------------------------------------------------------------
import navbarData from "./Navbar.json" with { type: "json" };
import { cart } from "../ShoppingCart/ShoppingCart.js";
import { renderCategoryLinks, getCategories } from "../Category/Category.js";

// Import page content functions
import { homePageContent } from "../../pages/home.js";
//import { renderProductsPageContent } from "../../pages/produkter.js";
import { aboutPageContent } from "../../pages/about.js";
import { kontaktPageContent } from "../../pages/kontakt.js";
import { tjansterPageContent } from "../../pages/tjanster.js";
// -----------------------------------------------------------------------------------
// Define constants                                                                  |
// -----------------------------------------------------------------------------------
// PLACEHOLDER IDEA, mapping page IDs to content functions
// call this when swapping main content
const pageContentMap = {
  home: homePageContent,
  //produkter: renderProductsPageContent,
  about: aboutPageContent,
  kontakt: kontaktPageContent,
  tjanster: tjansterPageContent,
};

const navbarTarget = document.querySelector("nav.navbar");

// -----------------------------------------------------------------------------------
// Define variables                                                                  |
// -----------------------------------------------------------------------------------
let navbarItems = navbarData.pages;

// -----------------------------------------------------------------------------------
// Call the function to render the navbar                                            |
// -----------------------------------------------------------------------------------
// Initialize navbar and SPA navigation
renderNavbar();
addLinkEventListeners();

// Initial render based on current path
renderRoute(window.location.pathname);


// -----------------------------------------------------------------------------------
// Functions                                                                         |
// -----------------------------------------------------------------------------------
function renderNavbar() {
  // -------------------------- OUTPUT HTML FOR NAVBAR -----------------------------
  navbarTarget.innerHTML = /* html */ `
    <div class="container py-2 my-1">
        <a  href="index.html"
            class="d-flex align-items-center link-body-emphasis text-decoration-none"
            aria-label="Bootstrap">
            <img src="assets/images/shopTillUDieLogo.png" alt="ShopTilUDie" class="navbar-logo" />
        </a>
        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end border-0"
             id="navbarSupportedContent">
            <button
              id="view-cart-button"
              class="btn btn-primary px-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRightScroll"
              aria-controls="offcanvasRightScroll"
            >
              <span class="position-relative">
                <span class="badge rounded-pill bg-danger" id="cart-item-count-badge">
                  0
                  <span class="visually-hidden">items in cart</span>
                </span>
              </span>
              <i class="bi bi-cart" style="font-size: 1.5rem; color: black;"></i>
            </button>
            <ul class="navbar-nav me-0 mb-2 mb-lg-0" id="navigation-list">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                <ul class="dropdown-menu" id="product-categories-dropdown">
                  <!-- Category links will be populated here -->
                </ul>
              </li>
                  <!-- Additional navbar items will be populated here -->
            </ul>

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

/* Function to render navbar links
This function populates the navbar with links based on the fetched data */
function renderNavbarLinks() {
  const navigationListTarget = document.getElementById("navigation-list");
  let linksHTML = "";
  navbarItems.forEach((page) => {
    // Use route-style hrefs and data-spa-link for SPA navigation
    if (page.id === "home") {
      return; // Skip adding home link to navbar
    }
    
    linksHTML += /* html */ `
        <li class="nav-item mx-2">
            <a class="nav-link link-body-emphasis" href="/${page.id}" data-spa-link id="link-${page.id}">
                ${page.displayName}
            </a>
        </li>`;
  });
  navigationListTarget.innerHTML += linksHTML;
}

/* Function to add event listeners to navbar links
This function sets up click event listeners on each navbar link
and swaps the main content out based on the link clicked */
function addLinkEventListeners() {
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[data-spa-link]");
    if (link) {
      e.preventDefault();
      const path = link.getAttribute("href");
      history.pushState({ path }, "", path);
      renderRoute(path);
      highlightActivePage(link.id.replace("link-", ""));
    }
  });

  window.addEventListener("popstate", (event) => {
    const path = (event.state && event.state.path) || window.location.pathname;
    renderRoute(path);
    highlightActivePage(path.replace("/", ""));
  });
}

/* SPA route rendering function
   This function is responsible for rendering the appropriate content
   based on the current route */
function renderRoute(path) {
  const mainContentTarget = document.getElementById("main-content");
  const pageId = path.replace("/", "");
  if (pageContentMap[pageId]) {
    pageContentMap[pageId](mainContentTarget);
  } else {
    // Default to home if route not found
    pageContentMap["home"](mainContentTarget);
  }
}

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

// ---- TODO: Possibly refactor this into somewhere else. ------------
// Navbar collapse functionality for mobile view
// -------------------------------------------------------------------
function collapseNavbar() {
  const navbarCollapse = document.getElementById("navbarSupportedContent");
  if (navbarCollapse.classList.contains("show")) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: true,
    });
    bsCollapse.hide();
  }
}

// Collapse navbar after clicking a link (for mobile view)
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("nav-link")) {
    collapseNavbar();
  }
});
// -------------------------------------------------------------------
