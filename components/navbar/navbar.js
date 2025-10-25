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
import { fetchJSON } from '../../scripts/main.js';

// Import page content functions
import { homePageContent } from '../../pages/home.js';
import { bostaderPageContent } from '../../pages/bostader.js';
import { aboutPageContent } from '../../pages/om-oss.js';
import { kontaktPageContent } from '../../pages/kontakt.js';
import { tjansterPageContent } from '../../pages/tjanster.js';
// -----------------------------------------------------------------------------------
// Define constants                                                                  |
// -----------------------------------------------------------------------------------
// PLACEHOLDER IDEA, mapping page IDs to content functions
// call this when swapping main content
const pageContentMap = {
    "home": homePageContent,
    "bostader": bostaderPageContent,
    "om-oss": aboutPageContent,
    "kontakt": kontaktPageContent,
    "tjanster": tjansterPageContent
};

const navbarTarget = document.querySelector('nav.navbar');
const navbarDataFilename = './components/navbar/navbar.json';

// -----------------------------------------------------------------------------------
// Define variables                                                                  |
// -----------------------------------------------------------------------------------
let navbarItems = [];

// -----------------------------------------------------------------------------------
// Call the function to render the navbar                                            |
// -----------------------------------------------------------------------------------
(async () => {
    // Wait for the links to be fetched before rendering
    await fetchLinks();
    renderNavbar();
})();

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
    // Setup event listeners for link highlighting
    addLinkEventListeners();
    // Initially load home page content
    homePageContent();
};

/* Function to fetch navbar links
This function retrieves the navbar data from the JSON file and
returns a promise that resolves when the links are fetched */
function fetchLinks() {
    return fetchJSON(navbarDataFilename).then(navbarData => {
        // Build list of links
        navbarData.pages.forEach(page => {
            navbarItems.push(page);
        });
    });
};

/* Function to render navbar links
This function populates the navbar with links based on the fetched data */
function renderNavbarLinks() {
    const navigationListTarget = document.getElementById('navigation-list');
    let linksHTML = '';
    console.log("Rendering navbar links:", navbarItems);
    navbarItems.forEach(page => {
        console.log("Rendering link for page:", page.name);
        // -------------------------- OUTPUT HTML FOR NAVBAR ---------------
        linksHTML += /* html */`
        <li class="nav-item mx-2">
            <a class="nav-link link-body-emphasis"
                href="#"
                id="link-${page.id}">
                ${page.displayName}
            </a>
        </li>`;
        // -------------------------- OUTPUT HTML FOR NAVBAR ---------------
    });
    navigationListTarget.innerHTML = linksHTML;
    // At the end of rendering links, setup event listeners for changing main content
    addLinkEventListeners();
};

/* Function to swap main content based on page ID
This function replaces the inner HTML of the main content area */
function swapMainContent(pageId) {
    const mainContentTarget = document.getElementById('main-content');
    const pagesContentMap = navbarItems.map(item => item.id);
    if (pagesContentMap.includes(pageId)) {
        pageContentMap[pageId](mainContentTarget);
        highlightActivePage(pageId);
    }
};

/* Function to add event listeners to navbar links
This function sets up click event listeners on each navbar link
and swaps the main content out based on the link clicked */
function addLinkEventListeners() {
    const navigationListTarget = document.getElementById('navigation-list');
    navigationListTarget.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageId = link.id.replace('link-', '');
            swapMainContent(pageId);
            highlightActivePage(link.textContent.trim());
        });
    });
};

/* Function to highlight the active page link
This function adds the 'active' class to the currently active link
and removes it from other links in the navbar */
function highlightActivePage(pageId) {
    const navigationListTarget = document.getElementById('navigation-list');
    const navLinks = navigationListTarget.getElementsByClassName('nav-link');
    Array.from(navLinks).forEach(link => {
        if (link.id === `link-${pageId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

function collapseNavbar() {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: true
        });
        bsCollapse.hide();
    }
}

// Collapse navbar after clicking a link (for mobile view)
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav-link')) {
        collapseNavbar();
    }
});