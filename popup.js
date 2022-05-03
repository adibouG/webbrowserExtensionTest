function openLink(e){
    let url = e.target.href;
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    console.log(url);
    if (url) {
        chrome.tabs.create({ url: url});
    }
}


document.addEventListener('DOMContentLoaded' , function() {
    //make the link to work
    let l = document.querySelectorAll('.link_list');
    for (let v of l) {
        v.addEventListener('click' ,  openLink);
    }
    //make the get button work
    
    let p = document.querySelector('#getMewsData');
    p.addEventListener('click' ,  getData);

     //make the close button work
    
     let c = document.querySelector('#close');
     c.addEventListener('click' ,  () => window.close());
  

    let e = document.querySelector('#enzoform');

    e.addEventListener('submit' ,  getEnzoData);
    console.log(e);
    //check if any values already selected/available to display

    if (!window.text) {
        window.text = "" ;
    } else {
        let t = document.querySelector('#data_view1');
        t.textContent = window.text;
    }

    if (!window.enzoData) {
        window.enzoData = "" ;
    } else {
        let q = document.querySelector('#data_view2');
        q.textContent = window.enzoData;
    }

});

function getCardsText() {
    var divs; 
    var tx; 
    if (divs === undefined || divs.length === 0 ) { divs = document.getElementsByClassName('card'); }
    if (tx === undefined || tx.length === 0 ) { tx = ''; } 
    for (let i = 0 ; i < divs.length ; ++i ) { 
        tx = tx + divs[i].textContent + '<br>'; 
        divs[i].style.color = 'blue' ;
    }
    
    return tx;
}
function getData(e){
    chrome.tabs.executeScript(null, { code : "(" + getCardsText.toString() + ")()" } , function(data){
      
         console.log(data);
         console.log(window.text);
         console.log(data[0]);
         let s = document.getElementById('data_view1');
        console.log(s);
        if (data[0].length > 0) {   
            s.textContent = data[0];
        }
        // window.close();
    });
}

window.enzoData = "" ;
function getEnzoData(e){
    e.preventDefault();
    let s = document.querySelector('#input1').value;
    let b = document.querySelector('#enzoserver').value;
    let api =  "" + b + "/testGet/" + s ;
    console.log(api);
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.onload = function(e) {
        console.log(e);
        console.log("onload url : " + api);
      //var arraybuffer = req.response; // not responseText
      console.log(req.response);
      if (req.response) {
        window.enzoData = req.response.data;
        let s = document.getElementById('data_view2');
        console.log(s);
        if (window.enzoData.length > 0) {   
            s.textContent = window.enzoData;
        }
    } else {
        console.log("onload Null ");
    }
     
    };
    req.onerror = function(e) {
        console.log(e);
        console.log("onerror url : " + req.statusText);
      //var arraybuffer = req.response; // not responseText
      console.log(req.response);
     
     
    };
    req.open("GET",api);
    req.send();
}

