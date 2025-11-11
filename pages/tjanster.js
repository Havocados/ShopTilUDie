export function tjansterPageContent(
  target = document.getElementById("main-content")
) {
  document.title = "Tjänster - ShopTilUDie";
  
  // ----------------------------------- START OF INNER HTML FOR SERVICES PAGE  -----------------------------------
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
  // ----------------------------------- END OF INNER HTML FOR SERVICES PAGE  -----------------------------------
}
