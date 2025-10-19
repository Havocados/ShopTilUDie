export function homePageContent(target=document.getElementById('main-content')) {
    target.innerHTML = /* html */`
    <div class="section p-4 text-start bg-light">
        <div class="container">
          <h1>Welcome to the Home Page</h1>
          <p>This is the main content of the home page.</p>
        </div>
    </div>
    `;
}