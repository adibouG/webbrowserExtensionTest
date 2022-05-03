
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
            id:"EnzoReservation",
            title: "get Reservation %s information",
            contexts: [ "selection"],
            onclick: handleContextClick
    });

    new Notification('Web Extension added successfully', {
        icon: 'logos/logo_enzosystems.png',
        body: "Background script Notification : EnzoSystems Kiosks & Cloud Extension installed ",
    });

});

chrome.storage.sync.set({'value': 12}, function() {
   chrome.storage.sync.get("value", function(data) {
      console.log("data", data);
    });
  });
    
    chrome.storage.sync.set({ 'user' : "testUser Name" } , function() {
        chrome.storage.sync.get("user", function(data) { 
            console.log( "user" , data  );
        });
    });

   chrome.storage.sync.set({  "reservation" : {} } ,  function() {
        chrome.storage.sync.get("reservation", function(data) { 
            console.log( "reservation" , data);
       });
    });
   chrome.storage.sync.set({ "hist" : []} ,  function() {
        chrome.storage.sync.get("hist", function(data) { 
            console.log( "hist", data );
       });
    });

    window.selectedData = "";

    
function handleContextClick(info){
    const selected = info.selectionText;
    const url = `https://translate.google.com/#view=home&op=translate&sl=nl&tl=en&text=${selected}` ;
    chrome.windows.create({ 
        url,
        type: 'popup',
        height: 500,
        width: 800,
    });
    
    chrome.storage.sync.get("hist"  , function(data) { 
        console.log( "hist", data );
        data.push(selected);
        console.log( "hist", data );
        chrome.storage.sync.set({  "reservation" : selected });
        chrome.storage.sync.set({ "hist" : data });
    });
    
    let msg = { text : selected };
    console.log("sending message from context menu (e.g. workaround from content mouseup event + message) to popup for display " , msg );
    
    chrome.runtime.sendMessage(msg);
}

// when a message is received set it as window global var to use it in the popup 
chrome.runtime.onMessage.addListener(receiver);

function receiver(req, sender, res) {
    console.log(req);
    window.selectedData = req.text;
    
}
