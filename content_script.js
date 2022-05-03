
  

document.addEventListener('DOMContentLoaded' , getReservationData);
function getReservationData(){
    
    let d = document.getElementsByClassName("card");
    console.log(d);
    
    if (d.length > 0) {
        var c = d.childNodes;
        var txt = "";
        for (let v of c) {
            if (v.innerHTML === undefined) return;
            txt = txt + v.innerHTML + "<br>";
            console.log(txt);

        }
        if (txt.length > 0) {
            
            let msg = {
                text : txt 
            };
                chrome.runtime.sendMessage(msg);
            }
        }
    }


      

 
