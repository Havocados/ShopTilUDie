export function homePageContent(
  target = document.getElementById("main-content")
) {
  // Set the document title
  document.title = "Home - ShopTilUDie";
  
  // Swap out the inner HTML of the main content area
  target.innerHTML = /* html */ `
    <div id="home-section" class="section row justify-content-center p-4 text-start bg-light">

      <h1 class="display-2 mx-auto" id="home-title">Welcome Home</h1>
      <div class="container">
        <div class="inner">
          <div class="ball"></div>
          </div>
        </div>
      </div>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Aboreto&display=swap');

      #home-section * {
        box-sizing: border-box;
      }

      #home-section {
        min-height: 100dvh;
        padding: 24px;
        color: #222;
        background-color: #ececec;
        font-family: "Aboreto", system-ui;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      #home-section .container {
        #home-title {
          color: #aee7ff;
          text-shadow: 0 2px 8px #b1c4e7;
          font-family: 'Aboreto', system-ui;
          margin-bottom: 2rem;
      }
        width: 360px;
        aspect-ratio: 1 / 1;
        padding: 24px;
        border-radius: calc(24px + 24px);
        background-image: linear-gradient(45deg, #d3e9e8, #b1c4e7);
        box-shadow: 2px 2px 18px #0003;
      }

      #home-section .inner {
        width: 100%;
        height: 100%;
        padding: 8px;
        border: 1px dashed #fff;
        border-radius: 24px;
        background-color: #fff3;
        container-type: size;
      }

      #home-section .ball {
        width: 36px;
        aspect-ratio: 1 / 1;
        background-image: radial-gradient(circle at 75% 75%, #c1cae4, #0a2fd3);
        border-radius: 50%;
        animation: home-moving 3s linear infinite alternate;
      }

      @keyframes home-moving {
        25% { translate: calc(100cqi - 100%) calc(25cqb - 100%); }
        50% { translate: 0 calc(50cqb - 100%); }
        75% { translate: calc(100cqi - 100%) calc(75cqb - 100%); }
        100% { translate: 0 calc(100cqb - 100%); }
      }
    </style>
    `;
}
