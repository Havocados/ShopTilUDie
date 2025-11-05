export function homePageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Home - ShopTilUDie";
  
  // Swap out the inner HTML of the main content area
  target.innerHTML = /* html */ `
    <div class="row align-items-center g-5 py-0 px-5 vh-80" id="hero-section-home">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="assets/images/young-woman-medium-shot-pose.png" class="d-block mx-lg-auto img-fluid max-vh-80" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
      </div>
      <div class="col-lg-6 text-white">
        <h1 class="display-5 fw-bold lh-1 mb-3">Ready to get your cozy on?</h1>
        <p class="lead">At ShopTilUDie, we have a great selection of winter clothing to keep you warm and stylish in the holiday season. Our collection features cozy sweaters, stylish coats, all made from GORE‑TEX® and natural wool.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" 
                  class="btn btn-lg btn-hero px-4 me-md-2">Look through our winter selection</button>
        </div>
      </div>
    </div>  
    `;
}
