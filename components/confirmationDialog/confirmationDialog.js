import { cart } from "../shoppingCart/shoppingCart.js";

export function showConfirmationDialog(title, message) {
  const confirmationModal = document.getElementById("modal-content");
  confirmationModal.innerHTML = /* html */ `
        <div class="modal-header">
            <h5 class="modal-title" id="alertModalLabel">${title}</h5>
            <button type="btn btn-secondary" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>${message}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Avbryt (stäng rutan)</button>
            <button class="btn btn-secondary flex-fill"
                id="btn-clear-confirm"
                data-bs-toggle="modal"
                data-bs-target="#alertModal">
                Rensa Kundvagn
            </button>
        </div>
    `;
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
