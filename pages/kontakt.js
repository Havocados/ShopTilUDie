export function kontaktPageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Kontakt - ShopTilUDie";
  const helpdeskImage = 'assets/images/helpdesk.png';
  // Swap out the inner HTML of the main content area
  target.innerHTML = /* html */ `
    <div id="hero-bg-helpdesk">
    <div class="container">
      <div class="row align-items-center g-5 py-0" >
        <div class="col-10 col-sm-8 col-lg-6">
          <img src="${helpdeskImage}" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy">
        </div>
          <div class="col-lg-6 text-hero">
            <h1 class="display-5 fw-bold lh-1 mb-3">
              Har du frågor? Kontakta oss!
            </h1>
            <p class="lead">
              Vi svarar inom 24 timmar, måndag till fredag.
              Ingen fråga är för liten eller för stor!
            </p>
          </div>
      </div>  
    </div>
  </div>
    <div class="container">
      <form class="row g-3 py-5">
        <div class="col-md-3">
            <label for="form_fname" class="form-label">Förnamn</label>
            <input type="text" class="form-control" id="form_fname" placeholder="John" required>
        </div>
        <div class="col-md-3">
            <label for="form_lname" class="form-label">Efternamn</label>
            <input type="text" class="form-control" id="form_lname" placeholder="Blund" required>
        </div>
        <div class="col-md-6">
            <label for="form_email" class="form-label">Epost</label>
            <input type="email" class="form-control" id="form_email" placeholder="namn@exempel.com" required>
        </div>
        <div class="col-md-12 mb-3">
            <label for="form_message" class="form-label">Meddelande</label>
            <textarea class="form-control" id="form_message" rows="3" required></textarea>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Skicka meddelande</button>
        </div>
    </form>
  </div>
  `;
}
