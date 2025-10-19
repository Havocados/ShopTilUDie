export function tjansterPageContent(target=document.getElementById('main-content')) {
    target.innerHTML = /* html */`
      <div class="section p-4 text-start bg-light">
        <div class="container">
          <h1>Welcome to the Tjänster page</h1>
          <p>This is the content of the Tjänster page.</p>
        </div>
      </div>
    `;
}