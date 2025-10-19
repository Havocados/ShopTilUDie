/*
Navbar component script

Description:
    This script fetches the navbar data and renders the navbar links
    dynamically.
Usage:
    Used in all pages that include the navbar component.
*/

// -----------------------------------------------------------------------------------
// Import dependencies                                                  |
// -----------------------------------------------------------------------------------
import { fetchJSON } from '../../scripts/main.js';

// -----------------------------------------------------------------------------------
// Define constants                                                                  |
// -----------------------------------------------------------------------------------
const navbarTarget = document.querySelector('nav.navbar');
const navbarDataFilename = './components/navbar/navbar.json';

// -----------------------------------------------------------------------------------
// Call the function to render the navbar                                            |
// -----------------------------------------------------------------------------------
renderNavbar();

// -----------------------------------------------------------------------------------
// Function declarations                                                             |
// -----------------------------------------------------------------------------------
function renderNavbar() {
    // -------------------------- OUTPUT HTML FOR NAVBAR -----------------------------
    navbarTarget.innerHTML = /* html */`
    <div class="container pt-1 pb-3 my-1 border-bottom">
        <a  href="index.php"
            class="d-flex align-items-center link-body-emphasis text-decoration-none"
            aria-label="Bootstrap">
        <svg class="bi" width="103" height="60" aria-hidden="true">
            <use xlink:href="#blge-logo-nav"></use>
        </svg>
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
        <div class="collapse navbar-collapse justify-content-end"
             id="navbarSupportedContent">
            <ul class="navbar-nav me-0 mb-2 mb-lg-0" id="navigation-list">

            </ul>
        </div>
    </div>`;
    // -------------------------- END OUTPUT HTML FOR NAVBAR --------------------------
    
    // When the navbar structure is rendered, populate the links
    renderNavbarLinks();
};

function renderNavbarLinks() {
    fetchJSON(navbarDataFilename).then(navbarData => {
        const navigationListTarget = document.getElementById('navigation-list');
        // -------------------------- OUTPUT HTML FOR NAV LINKS -----------------------
        navbarData.pages.forEach(page => {
            navigationListTarget.innerHTML += /* html */`
            <li class="nav-item mx-2">
                <a class="nav-link link-body-emphasis"
                   href="${page.link}">
                   ${page.name}
                </a>
            </li>`;
        });
        // -------------------------- END OUTPUT HTML FOR NAV LINKS -------------------
    });
};
// -----------------------------------------------------------------------------------
// End of function declarations                                                      |
// -----------------------------------------------------------------------------------