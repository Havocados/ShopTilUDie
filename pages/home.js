import heroData from "../data/splash-hero.json" with { type: "json" };
import { SelectedCategory } from "../components/Category/Category.js";

export function homePageContent(
  target = document.getElementById("main-content")
) {
  document.title = "Home - ShopTilUDie";

  // ----------------------------------- START OF INNER HTML FOR HOME PAGE  -----------------------------------
  target.innerHTML = /* html */ `
  <div id="hero-bg" class="pb-4 pb-lg-0 text-center bg-dark text-white">
    <div class="container">
      <div class="row align-items-center g-5 py-0 px-5 vh-80" >
        <div class="col-10 col-sm-8 col-lg-6">
          <img src="assets/images/young-woman-medium-shot-pose.png" class="d-block mx-lg-auto img-fluid max-vh-80" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
        </div>
          <div class="col-lg-6 text-white">
            <h1 class="display-5 fw-bold lh-1 mb-3">
              ${heroData.title}
            </h1>
            <p class="lead">
              ${heroData.subtitle}
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" 
                      class="btn btn-lg btn-hero px-4 me-md-2"
                      id="hero-cta-button">
            </button>

            </div>
          </div>
      </div>  
    </div>
  </div>
    `;
  // ----------------------------------- END OF INNER HTML FOR HOME PAGE  -----------------------------------
  
  // Quick and dirty listener for the CTA to go to one of the product pages for an arbitrary category (women's clothes)
  document.getElementById("hero-cta-button").innerText = heroData.cta;
  document
    .getElementById("hero-cta-button")
    .addEventListener("click", () => {
      SelectedCategory.detail.category = "women's clothing";
      document.dispatchEvent(SelectedCategory);
      scrollToTop();
    });
}
