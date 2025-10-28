export function kontaktPageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Kontakt - ShopTilUDie";

  // Swap out the inner HTML of the main content area
  target.innerHTML = /* html */ `
      <div class="section p-4 text-start bg-light">
        <div class="container">
          <div style="background-color: #edebeb; color: #0623c4; font-family: Microsoft Sans Serif, Helvetica, Arial, sans-serif; height: 200px; padding: 20px; margin: auto; position:relative;">
    <div style="float:left; width: 36%; overflow: hidden;">
        <div style="
            background-color: rgba(29, 39, 232, 0.677); opacity: 85%">
        <img src="https://live.staticflickr.com/65535/51274706071_b858cdd19a_h.jpg"
             height="200px"
             width="100%"
             style="object-fit:cover; transform: scale(1.5);  filter:grayscale(1); mix-blend-mode: screen;">
    </div></div>

    <div style="writing-mode:vertical-lr; transform: rotate(180deg); float: right; font-size: 12px;">
        <span style="margin-bottom: 67px;">ADMIT ONE</span>
        <span style="text-align: right;">13+3+1=17 </span>
    </div>
    <div style="float: right; width: 58%; height: 100%; ; letter-spacing: 1px; ">
        <div style="font-weight: bold; font-size: 25px;">General<br>Admission</div>
    <div style="font-size: 12px; position: absolute; bottom: 20px">
        THE DIAMOND LIFE<br>
        26 MAY 2017 - FOREVER<br>
        ADULT: 17 CARAT
    </div>
    </div>

    </div>
        </div>
      </div>
    `;
}
