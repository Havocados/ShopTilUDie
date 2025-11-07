export function aboutPageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Om Oss - ShopTilUDie";

  // Swap out the inner HTML of the main content area
  target.innerHTML = /* html */ `
      <div class="section p-4 text-start bg-light">
        <div class="container">
        <section id="om-oss-section">
          <h1>
            Hypertext Accordion
          </h1>
          <details>
            <summary>Details</summary>
            <p>
              Lorem ipsum dolor sit amet, eu alia suscipit mei. Reque iriure delectus vix id, ex sed forensibus suscipiantur. In eos exerci mollis apeirian, an qui latine alienum. Ad mea libris maluisset, consul assueverit sea ex.
            </p>
          </details>
          <details>
            <summary>Features</summary>
            <p>
              Lorem ipsum dolor sit amet, eu alia suscipit mei. Reque iriure delectus vix id, ex sed forensibus suscipiantur. In eos exerci mollis apeirian, an qui latine alienum. Ad mea libris maluisset, consul assueverit sea ex.
            </p>
          </details>
          <details>
            <summary>Information
            </summary>
            <p>Lorem ipsum dolor sit amet, eu alia suscipit mei. Reque iriure delectus vix id, ex sed forensibus suscipiantur. In eos exerci mollis apeirian, an qui latine alienum. Ad mea libris maluisset, consul assueverit sea ex. </p>
          </details>
          <details>
            <summary>Specifications
            </summary>
            <p>Lorem ipsum dolor sit amet, eu alia suscipit mei. Reque iriure delectus vix id, ex sed forensibus suscipiantur. In eos exerci mollis apeirian, an qui latine alienum. Ad mea libris maluisset, consul assueverit sea ex. </p>
          </details>
        </section>
        </div>
        <script type="module" src="/components/productCard/productCard.js"></script>
        <style>
        
          #om-oss-section {
            padding-top: 4rem;
            width: 50%;
            margin: auto;
          }
          #om-oss-section h1 {
            font-size: 2rem;
            font-weight: 500;
          }
          #om-oss-section details[open] summary ~ * {
            animation: omoss-open 0.3s ease-in-out;
          }
          @keyframes omoss-open {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          #om-oss-section details summary::-webkit-details-marker {
            display: none;
          }
          #om-oss-section details summary {
            width: 100%;
            padding: 0.5rem 0;
            border-top: 1px solid black;
            position: relative;
            cursor: pointer;
            font-size: 1.25rem;
            font-weight: 300;
            list-style: none;
            outline: 0;
          }
          #om-oss-section details summary:after {
            content: "+";
            color: black;
            position: absolute;
            font-size: 1.75rem;
            line-height: 0;
            margin-top: 0.75rem;
            right: 0;
            font-weight: 200;
            transform-origin: center;
            transition: 200ms linear;
          }
          #om-oss-section details[open] summary:after {
            transform: rotate(45deg);
            font-size: 2rem;
          }
          #om-oss-section details p {
            font-size: 0.95rem;
            margin: 0 0 1rem;
            padding-top: 1rem;
          }
        </style>
      </div>
    `;
}
