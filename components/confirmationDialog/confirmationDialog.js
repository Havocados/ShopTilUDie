import { cart } from "../ShoppingCartTemp/ShoppingCartTemp.js";

export function showConfirmationDialog(title, message) {
  const confirmationModal = document.getElementById("modal-content");
  // -------------------------- OUTPUT HTML FOR CONFIRMATION MODAL -----------------------
  confirmationModal.innerHTML = /* html */ `
        <div class="modal-header">
            <h5 class="modal-title" id="alertModalLabel">${title}</h5>
            <button type="btn btn-secondary"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close">
            </button>
        </div>
        <div class="modal-body">
            <p>${message}</p>
        </div>
        <div class="modal-footer">
            <button type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#alertModal">
                Avbryt (stäng rutan)
            </button>
            <button class="btn btn-secondary flex-fill"
                    id="btn-clear-confirm"
                    data-bs-toggle="modal"
                    data-bs-target="#alertModal">
                Rensa Kundvagn
            </button>
        </div>
    `;
  // -------------------------- END OUTPUT HTML FOR CONFIRMATION MODAL -------------------
  const modalBody = confirmationModal.querySelector(".modal-body");
  modalBody.textContent = message;

  const confirmButton = confirmationModal.querySelector("#btn-clear-confirm");
  // Add event listener for confirm action
  // clears cart and closes modal
  confirmButton.addEventListener("click", () => {
    cart.clearCart();
    confirmationModal.innerHTML = "";
  });
}
