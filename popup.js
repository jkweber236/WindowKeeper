let saveForm = document.querySelector('#save-window-form')
let saveButton = document.querySelector('.save-window-button')
displayWindows();

saveForm.addEventListener("submit", function(event) {
   event.preventDefault()
   saveWindow()
})

function saveWindow() {
   var windowName = document.getElementById("name-input").value;

   chrome.tabs.query({ currentWindow: true }, function(tabs) {
      let currentWindowUrls = tabs.map(tab => tab.url);
      chrome.storage.local.set({ [windowName]: currentWindowUrls }, function() {
         displayWindows();
      });
   });
}

function displayWindows() {
   windowsList = document.querySelector('.saved-windows')
   windowsList.innerHTML = "";
   chrome.storage.local.get(null, function(result) {
      for (let windowName in result) {
         const name = document.createElement("h3");
         name.textContent = windowName;
         const urlsList = document.createElement("ul")

         for (let url of result[windowName]) {
            const listItem = document.createElement("li");
            listItem.textContent = url;
            urlsList.appendChild(listItem);
         }
      
         windowsList.appendChild(name);
         windowsList.appendChild(urlsList);
      }
   })
}