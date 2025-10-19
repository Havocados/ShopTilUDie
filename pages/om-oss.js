export function aboutPageContent(target=document.getElementById('main-content')) {
    target.innerHTML = /* html */`
      <div class="section p-4 text-start bg-light">
        <div class="container">
          <h1>Welcome to the Om oss page</h1>
          <p>This is the content of the Om oss page.</p>
        </div>
      </div>
    `;
}