import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// 

const firebaseConfig = {
   
   
   
   
   
   
   
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 const auth = getAuth(app)
const emailEl = document.getElementById("email-el")
const passwordEl = document.getElementById("password-el")
 const SignBtn = document.getElementById('sign-in-btn')
const createUserAccount =  document.getElementById("new-user")
// const provider = new GoogleAuthProvider();
// const providerBtn = document.getElementById("provider")
 console.log(auth)

console.log(analytics)


createUserAccount.addEventListener('click', async function(event) {
    event.preventDefault();
    console.log('Create account button clicked');
    await createNewUser();  
});
SignBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    console.log("User Sign Up:")
    await signInExistingUser()
    
})

// providerBtn.addEventListener('click', async function(event){
    // event.preventDefault()
    // console.log("User Sign ")
    // await SignInUserWithGoogle()
// })
// Function to create a new user
async function createNewUser() {
   
    const email = emailEl.value;
    const password = passwordEl.value;

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created:", userCredential.user);

       
        await new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(); 
                }
            });
        });

       
        await getUserInfo();

     
        window.location.href = './ground.html';
    } catch (error) {
        console.error("Error creating user:", error.message);
        alert("Error: " + error.message);
    } finally {
      
        emailEl.value = '';
        passwordEl.value = '';
    }
}


// Function to Sign In an existing User
async function signInExistingUser() {
    const email = emailEl.value
    const password = passwordEl.value

    try {
        const userCredential =  await signInWithEmailAndPassword(auth, email, password)
        console.log("User SignIn:", userCredential.user)
        window.location.href = './ground.html'

       
    } catch (error) {
        console.error("Error SignIn user:", error.message)
        alert("Error: " + error.message)
    } finally {
        emailEl.value = '';
        passwordEl.value = ''
    }
}
// function to get user info
async function getUserInfo() {
    const user = auth.currentUser;

    if (user !== null) {
  
        await Promise.all(user.providerData.map(async (profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        }));
    } else {
        console.log("No user is signed in.");
    }
}














// Function to sign In with Google Account

// async function SignInUserWithGoogle() {
    // try {
        // const result = await signInWithPopup(auth, provider)
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
// 
        // const user = result.user;
        // window.location.href = './ground.html'
    // } catch (error) {
        // console.error(error.message)
        // const email = error.customData.email;
        // alert(email)
    // }
// }
// 















