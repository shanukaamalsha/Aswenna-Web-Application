
import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-OtUg6_wCOCrmU9dwLCRNHq2CFIuw7-E",
  authDomain: "aswenna-8ed3e.firebaseapp.com",
  databaseURL: "https://aswenna-8ed3e-default-rtdb.firebaseio.com",
  projectId: "aswenna-8ed3e",
  storageBucket: "aswenna-8ed3e.firebasestorage.app",
  messagingSenderId: "686567450327",
  appId: "1:686567450327:web:5ab3eed23cd410c16ef292",
  measurementId: "G-BMM9EH874B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function clearAdvisors() {
    console.log("⚠️ Attempting to clear all advisors from the database...");
    const advisorsRef = ref(database, 'advisors');
    
    try {
        await remove(advisorsRef);
        console.log("✅ All advisors have been successfully removed from the 'advisors' node.");
    } catch (error) {
        console.error("❌ Error removing advisors:", error);
    }
    process.exit(0);
}

clearAdvisors();
