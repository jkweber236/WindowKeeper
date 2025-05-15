chrome.tabs.query({ currentWindow: true }, function(tabs) {
   console.log(tabs)
});

let saveForm = document.querySelector('#save-workspace-form')
let saveButton = document.querySelector('.save-workspace-button')

saveForm.addEventListener("submit", function(event) {
   event.preventDefault()

   saveWorkspace()
})

function saveWorkspace() {
   var workspaceName = document.getElementById("name-input").value;

   chrome.tabs.query({ currentWindow: true }, function(tabs) {
      let currentWindowUrls = tabs.map(tab => tab.url);
      chrome.storage.local.set({ [workspaceName]: currentWindowUrls }, function() {
            chrome.storage.local.get(null, function(result) {
               console.log(result);
            });
      })
   });
}

