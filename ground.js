import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

import { getAuth, signOut 

} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
   
    
    
    
    
    
    
}
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
   const auth = getAuth(app)
   console.log(auth)
   console.log(analytics)


const dateEl = document.getElementById("date-el")
const dataEl = document.getElementById("input-el")
const displayEl =document.getElementById("display-content-el")
const addBtn = document.getElementById("add-a-task-el")
const textArea = document.getElementById("textarea-el")
const signOutEl = document.getElementById('signout-el')

signOutEl.addEventListener('click', async function(event){
    event.preventDefault()
    await signOutUser()
})


addBtn.addEventListener('click', function(){
    
    displayUserInfo()
    dataEl.value = ''
    textArea.value = ''
})
function displayUserInfo() {
    displayEl.innerHTML += `
      <li class="list-item">
        <h1>${dataEl.value}</h1>
        <p>${textArea.value}</p>
      </li>
    `;
}

async function signOutUser() {
    try {
        // Sign out the user
        await signOut(auth);
        console.log("User signed out.");

        // Redirect to a different page (optional)
        window.location.href = './index.html';  // Example: redirect to login page after sign-out
    } catch (error) {
        console.error("Error signing out:", error.message);
    }
}