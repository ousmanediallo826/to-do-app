const signIn = document.getElementById("sign-in-btn")
const dateEl = document.getElementById("date-el")
const dataEl = document.getElementById("input-el")
const displayEl =document.getElementById("display-content-el")
const addBtn = document.getElementById("add-a-task-el")
const textArea = document.getElementById("textarea-el")


addBtn.addEventListener('click', function(){
    
    displayUserInfo()
    dataEl.value = ''
})
function displayUserInfo() {
    displayEl.innerHTML += `
      <li class="list-item">
        <h1>${dataEl.value}</h1>
        <p>${textArea.value}</p>
      </li>
    `;
}