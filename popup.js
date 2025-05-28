let saveForm = document.querySelector('#save-window-form');
let saveButton = document.querySelector('.save-window-button');
displayWindows();

saveForm.addEventListener("submit", function(event) {
   event.preventDefault();
   const windowName = document.getElementById("name-input").value;

   if (!windowName) {
      alert("Please enter a name for your window.");
      return
   }

   saveWindow(windowName);
})

function saveWindow(windowName) {
   chrome.tabs.query({ currentWindow: true }, function(tabs) {
      let currentWindowUrls = tabs.map(tab => tab.url);
      chrome.storage.local.set({ [windowName]: currentWindowUrls }, function() {
         displayWindows();
      });
   });
}

function displayWindows() {
   const windowsList = document.querySelector('.saved-windows');
   windowsList.innerHTML = "";
   chrome.storage.local.get(null, function(result) {
      for (let windowName in result) {
         const card = document.createElement("div");
         card.classList.add("window-card");
         
         const name = document.createElement("h3");
         name.textContent = windowName;

         const urlsList = document.createElement("div")
         const dropdownButton = createDropdownButton();

         dropdownButton.addEventListener("click", function(event) {
            if (urlsList.classList.contains("hidden")) {
               urlsList.classList.remove("hidden");
            } else {
               urlsList.classList.add("hidden");
            }
         })

         const deleteButton = createDeleteButton();

         deleteButton.addEventListener("click", function(event) {
            chrome.storage.local.remove(windowName, function() {
               displayWindows();
            });
         });

         for (let url of result[windowName]) {
            const listItem = document.createElement("a");
            listItem.textContent = url;
            listItem.href = url; 
            listItem.target = "_blank";
            urlsList.appendChild(listItem);
         }

         urlsList.classList.add('hidden');
      
         card.appendChild(name);
         card.appendChild(dropdownButton);
         card.appendChild(deleteButton);
         card.appendChild(urlsList);

         windowsList.appendChild(card);
      }
   })
}

function createDropdownButton() {
   const dropdownButton = document.createElement("button");
   dropdownButton.classList.add("dropdown-button");

   const dropdownImg = document.createElement("img");
   dropdownImg.src = "down-arrow.png";
   dropdownImg.alt = "Dropdown icon";
   dropdownImg.classList.add('icon');

   dropdownButton.appendChild(dropdownImg);
   return dropdownButton;
}

function createDeleteButton() {
   const deleteButton = document.createElement("button");
   deleteButton.classList.add("delete-button");

   const deleteImg = document.createElement("img");
   deleteImg.src = "bin.png"
   deleteImg.alt = "Delete icon";
   deleteImg.classList.add('icon');

   deleteButton.appendChild(deleteImg);
   return deleteButton;
}