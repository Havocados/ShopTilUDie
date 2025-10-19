export function tjansterPageContent(
  target = document.getElementById("main-content")
) {
  target.innerHTML = /* html */ `
      <div class="section p-4 text-start bg-light">
        <div class="container">
          <div style="border-radius: 15px; border: 1px solid #e7e0e0; box-shadow: 10px 10px 10px #f0e5e7; margin: auto; display: block; width: 250px; height: 450px; overflow:hidden; padding: 20px; background-image: linear-gradient(to bottom, rgba(252, 249, 237, 0.8), rgba(218, 233, 241, 0.8) 50%, rgb(222, 214, 236) 90%); font-family: 'Montserrat', Proxima Nova, Helvetica, sans-serif; letter-spacing: 0.7px; color: #473245">
          <table style=" width: 100%; margin-bottom: 1rem; margin-top: -10px">
              <tr>
              <td><span style="float: left; vertical-align:baseline;font-size:30px; font-family: times new roman; font-weight: 900; margin-left: -6px; margin-top: 10px;">﹀</span></td>
              <td style="font-size: 11px; text-align: center;"><span style="text-transform: uppercase;">playing from album</span><br>
              <b>Fallin' Flower </b></td>
              <td>  <span style="float: right; vertical-align:middle;font-size:25px;">⋮</span></td>
          </tr>
          </table>
          
          <div style="font-weight: 900; font-size: 20px;">
            
          </div>
              <div style="padding-top: 5px; padding-bottom: 35px;"><img src="https://pbs.twimg.com/media/ET1dcvyU8AAR4hj?format=jpg&name=medium" width="180px"; height="180px"; style="object-fit: cover; border-radius: 5px; display:block; margin: auto; border: 1px solid #fff5f5; padding: 10px;" title="boo seungkwan from fallin flower mv;"></div>
          
          <table style="width: 100%; letter-spacing: 1px; margin-bottom: 10px;">
          <tr style="">
              <td style="float: left; font-family: ;">
                  <span style="text-transform: uppercase;  font-weight: bold;font-size: 1.2rem;">舞い落ちる花びら</span><br>
                  <span style="color: #302323; opacity: 40%;font-size:0.9rem">SEVENTEEN</span>
              </td>
              <td style="float: right; font-size: 30px;">⊖ ⊕</td>
          </tr>
          </table>
          
          <table style="table-layout: fixed; width:100%; margin-top: 30px; margin-bottom: 20px;">
              <tr><div style="width: 20%;float: left"><hr style="border-style: solid"></div>
                  <div style="width: 80%; float: right; opacity: 60%;"><hr style="border-style: solid; color: white"></div></tr>
                  <tr><div style="position:absolute;margin-top: 4.5px; margin-left: 50px; font-size: 10px;">●</div></tr>
          <tr style="height: 1rem"></tr>
          <tr style="font-weight: bold; font-size: 150%;">
              <td></td>
              <td style="float:right; margin-right: 15px">|⏴</td>
              <td><span style="background: transparent; padding-top: 12px; padding-bottom: 7px; padding-left: 7px; padding-right: 8px; border-radius: 25px; vertical-align: bottom; color: #473245; border: 2px solid">&nbsp▶</span></td>
              <td style="float:left; margin-left:14px; color:">⏵|</td>
              <td></td>
          </tr>
          
          </table>
          </div>
  
        </div>
      </div>
    `;
}
