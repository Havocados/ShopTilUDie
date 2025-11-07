export function tjansterPageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Tjänster - ShopTilUDie";
  
  // Swap out the inner HTML of the main content area
  target.innerHTML = /* html */ `
      <div style="min-height:80vh;" class="section p-4 text-start text-hero bg-light">
        <div class="container">
          <h1 class="mb-4">Vi bygger för närvarande ut våra tjänster</h1>
          <p class="lead">
            Vänligen återkom snart för att se våra spännande nya erbjudanden!
          </p>
        </div>
      </div>
    `;
}
