 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import { getDatabase, ref, remove, push, get, update, onValue, child, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged,sendPasswordResetEmail,sendEmailVerification ,createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
 const firebaseConfig = {
    apiKey: "AIzaSyD0iYIJxlamljCScCdXfZqIKybV99y7LZE",
    authDomain: "seetatv-7c704.firebaseapp.com",
    databaseURL: "https://seetatv-7c704-default-rtdb.firebaseio.com",
    projectId: "seetatv-7c704",
    storageBucket: "seetatv-7c704.appspot.com",
    messagingSenderId: "47823808148",
    appId: "1:47823808148:web:73c9bc93ee2be6324fb681"
  };

  const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Assuming you have stored the user details in localStorage after signing in
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

// Update the content in the plan details section
const selectedPlanElement = document.getElementById('selectedPlan');
const planDetailsElement = document.getElementById('planDetails');
const spinner = document.querySelector('.spinner');
const paymentOptions = document.getElementById('cards')
if (userDetails) {
    // Assuming you have access to Firebase's Realtime Database
    const userRef = ref(database, `users/${userDetails.uid}`);
    
    // Show spinner while retrieving data
    spinner.style.display = 'block';
paymentOptions.style.display = 'none'
    // Listen for changes to the user's data
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();

        // Hide spinner after data is retrieved
        spinner.style.display = 'none';
        paymentOptions.style.display = 'block'

        if (userData && userData.selectedPlan) {
            // Display plan details in separate HTML elements
            const selectedPlanDetails = userData.selectedPlan;
            selectedPlanElement.textContent = `${selectedPlanDetails.name}`;
            planDetailsElement.innerHTML = `
                <p> <i class="fas fa-check text-check"></i> Price: UGX ${selectedPlanDetails.price}</p>
                <p> <i class="fas fa-check text-check"></i> Quality: ${selectedPlanDetails.quality}</p>
                <p> <i class="fas fa-check text-check"></i> Resolution: ${selectedPlanDetails.resolution}</p>
                <p> <i class="fas fa-check text-check"></i> Devices: ${selectedPlanDetails.devices.join(', ')}</p>
            `;
        } else {
            // Handle the case when no plan is selected
            selectedPlanElement.textContent = 'No plan selected';
            planDetailsElement.textContent = '';
        }
    });
} else {
    // Handle the case when user details are not available
    selectedPlanElement.textContent = 'User details not available';
    planDetailsElement.textContent = '';
}



// Event listener for the "Sign Out" link
document.querySelector('.btn-logout').addEventListener('click', function () {
    // Sign out the user
    signOut(auth)
        .then(() => {
            // Replace the current page in the history with the login page
            window.location.replace('login.html'); // Replace 'login.html' with your actual login page URL
        })
        .catch((error) => {
            console.error('Error signing out:', error.message);
        });
});