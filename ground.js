import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, signOut 

} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    
    
    
    
    
    
    
}
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
   const auth = getAuth(app)
   const db = getFirestore(app);
   console.log(db)
   console.log(auth)
   console.log(analytics)


const dateEl = document.getElementById("date-el")
const dataEl = document.getElementById("input-el")
const displayEl =document.getElementById("display-content-el")
const addBtn = document.getElementById("add-a-task-el")
const textArea = document.getElementById("textarea-el")
const signOutEl = document.getElementById('signout-el')
const radios = document.querySelector('input[name="priorities"]:checked');

signOutEl.addEventListener('click', async function(event){
    event.preventDefault()
    await signOutUser()
})


addBtn.addEventListener('click', function(){
    
    displayUserInfo()
    
    
})
async function displayUserInfo() {
    const selectedPriority = radios ? radios.value : "Default"; 
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
          deadline: dateEl.value,
          data: dataEl.value,
          description: textArea.value,
          priorities: selectedPriority


        });
        dataEl.value = ''
        textArea.value = ''
        dataEl.value =  ''
      
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

}

async function signOutUser() {
    try {

        await signOut(auth);
        console.log("User signed out.");


        window.location.href = './index.html';  
    } catch (error) {
        console.error("Error signing out:", error.message);
    }
}

//display user tasks function 
document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
  });

  async function displayTasks() {
    try {
      const tasksContainer = document.getElementById("display-content-el");
      tasksContainer.innerHTML = ''; 
      onSnapshot(collection(db, 'tasks'), (snapshot) => {
        tasksContainer.innerHTML = ''; // Clear tasks before rendering new ones
    
        snapshot.forEach((doc) => {
          const task = doc.data();
    
          // Create task item
          const taskItem = document.createElement("div");
          taskItem.classList.add("list-item");
    
          taskItem.innerHTML = `
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <hr/>
          `;
    
          tasksContainer.appendChild(taskItem);
        });
      });

    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  