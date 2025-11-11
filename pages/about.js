import { populateFAQAccordion } from "../components/FrequentlyAccordion/FrequentlyAccordion.js";

export function aboutPageContent(
  target = document.getElementById("main-content")
) {
  document.title = "Om Oss - ShopTilUDie";

  // ----------------------------------- START OF INNER HTML FOR ABOUT PAGE  -----------------------------------
  target.innerHTML = /* html */ `
      <div class="section p-4 text-start bg-light">
        <div class="container">
        <div class="section p-4 text-center">
            <h1 class="my-3 fw-bold shop-orange">Har du funderingar? Vi har svar.</h1>
            <div class="container py-4 px-sm-3 text-start">
                <div class="accordion" id="faqAccordion">

                    <!-- FAQ accordion-items skapas och infogas dynamiskt av fetch_questions.js -->
                    <script type="module" src="scripts/fetch_questions.js"></script>

                </div>
            </div>
        </div>
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
  // ----------------------------------- END OF INNER HTML FOR ABOUT PAGE  -----------------------------------
  populateFAQAccordion();
}
