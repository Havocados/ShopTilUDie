import accordionData from './FrequentlyAccordion.json' with { type: "json" };

// Populate FAQ accordion, similar to hero section
// Dynamically creates accordion items based on each entry in faq.json
export function populateFAQAccordion() {
    
    const container = document.getElementById("faqAccordion");
    if (!container) return;

    // We assume accordionData is an array of objects with id, question, and answer properties
    // then we set up the accordion items using idx as indicator for what to expand
    accordionData.forEach((FAQ_query, idx) => {
        const accordion_item = document.createElement("div");
        accordion_item.className = "accordion-item";
        accordion_item.innerHTML = `
            <h2 class="accordion-header" id="heading${FAQ_query.id}">
                <button class="accordion-button${idx !== 0 ? ' collapsed' : ''}"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse${FAQ_query.id}"
                        aria-expanded="${idx === 0 ? 'true' : 'false'}"
                        aria-controls="collapse${FAQ_query.id}">

                        ${FAQ_query.question}

                </button>
            </h2>
            <div id="collapse${FAQ_query.id}"
                    class="accordion-collapse collapse ${idx === 0 ? ' show' : ''}"
                    aria-labelledby="heading${FAQ_query.id}"
                    data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        ${FAQ_query.answer}
                    </p>
                </div>
            </div>
        `;
        container.appendChild(accordion_item);
  });
}