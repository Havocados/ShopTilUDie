import { fetchJSON } from '../../scripts/main.js';

const footerTarget = document.querySelector('footer');
const navbarDataFilename = './components/Navbar/Navbar.json';

if (footerTarget.innerHTML.trim() === '') { // Only render if footer is empty
    footerTarget.innerHTML += /* html */`

    <div class="col mb-4">
        <h5>Populära Kategorier</h5>
        <ul class="nav flex-column" id="footer-navigation-list">

        </ul>
    </div>
    <div class="col mb-4">
        <h5>Kundservice</h5>
        <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Leverans</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Köpvillkor</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Presentkort</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Returer</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Vanliga frågor</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Kontakta Kundtjänst</a></li>
        </ul>
    </div>
    <div class="col mb-4">
        <h5>Om ShopTillUDie</h5>
        <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Vilka är vi?</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Jobba hos oss</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Press</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Hållbarhet</a></li>
        </ul>
    </div>
    <div class="col mb-4">
            <a href="index.php" class="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            aria-label="Bootstrap">
            <img src="assets/images/shopTillUDieLogo.png" alt="ShopTilUDie Logo" height="32" class="me-2">
        </a>
    <p class="text-body-secondary">© 2025</p>
    </div>
    `;

    // When the footer structure is rendered, populate the links
    renderFooterLinks();
} else {
    console.warn('Footer target element is not empty. Footer HTML output skipped to avoid overwriting existing content.');
};

function renderFooterLinks(){
    fetchJSON(navbarDataFilename).then(navbarData => {
        const navigationListTarget = document.getElementById('footer-navigation-list');
        // -------------------------- OUTPUT HTML FOR NAV LINKS -----------------------
        navbarData.pages.forEach(page => {
            navigationListTarget.innerHTML += /* html */`
            <li class="nav-item mb-2">
                <a class="nav-link p-0 text-body-secondary"
                    href="#">
                    ${page.displayName}
                </a>
            </li>`;
        });
        // -------------------------- END OUTPUT HTML FOR NAV LINKS -------------------
    });
};