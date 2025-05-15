chrome.tabs.query({ currentWindow: true }, function(tabs) {
   console.log(tabs)
});

let saveForm = document.querySelector('#save-window-form')
let saveButton = document.querySelector('.save-window-button')

saveForm.addEventListener("submit", function(event) {
   event.preventDefault()

   saveWindow()
})

function saveWindow() {
   var windowName = document.getElementById("name-input").value;

   chrome.tabs.query({ currentWindow: true }, function(tabs) {
      let currentWindowUrls = tabs.map(tab => tab.url);
      chrome.storage.local.set({ [windowName]: currentWindowUrls }, function() {
            chrome.storage.local.get(null, function(result) {
               console.log(result);
            });
      })
   });
}

