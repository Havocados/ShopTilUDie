/*
Footer component script
Description: This file handles the rendering of the footer component.
*/

// -----------------------------------------------------------------------------------
// Import dependencies                                                               |
// -----------------------------------------------------------------------------------
import { fetchJSON } from '../../scripts/main.js';
// -----------------------------------------------------------------------------------
// Define constants                                                                  |
// -----------------------------------------------------------------------------------
const footerTarget = document.querySelector('footer');
const navbarDataFilename = './components/navbar/navbar.json';

// -----------------------------------------------------------------------------------
// Define variables                                                                  |
// -----------------------------------------------------------------------------------
// NONE

// -----------------------------------------------------------------------------------
// Render footer HTML                                                                |
// -----------------------------------------------------------------------------------
if (footerTarget.innerHTML.trim() === '') {
    footerTarget.innerHTML += /* html */`
    <div class="col mb-3">
        <a href="index.php" class="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            aria-label="Bootstrap">
            <svg class="bi me-2" width="160" height="128" aria-hidden="true">
                <use xlink:href="#blge-logo"></use>
            </svg>
        </a>
        <p class="text-body-secondary">© 2025</p>
    </div>
    <div class="col mb-3"></div>
    <div class="col mb-3"></div>
    <div class="col mb-3"></div>
    <div class="col mb-3">
        <h5>Sektion</h5>
        <ul class="nav flex-column" id="footer-navigation-list">

        </ul>
    </div>`;

    // When the footer structure is rendered, populate the links
    renderFooterLinks();
} else {
    console.warn('Footer target element is not empty. Footer HTML output skipped to avoid overwriting existing content.');
}

function renderFooterLinks(){
    fetchJSON(navbarDataFilename).then(navbarData => {
        const navigationListTarget = document.getElementById('footer-navigation-list');
        // -------------------------- OUTPUT HTML FOR NAV LINKS -----------------------
        navbarData.pages.forEach(page => {
            navigationListTarget.innerHTML += /* html */`
            <li class="nav-item mb-2">
                <a class="nav-link p-0 text-body-secondary"
                    href="${page.link}">
                    ${page.name}
                </a>
            </li>`;
        });
    // -------------------------- END OUTPUT HTML FOR NAV LINKS -------------------
    });
}
// -----------------------------------------------------------------------------------
// End of footer HTML output                                                         |
// -----------------------------------------------------------------------------------