// Rustam Mamedov
// ParkChamp Assessment Submission

// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiq1BTliZW6g0cIJu6r7_qzXMn5VFXGHg",
    authDomain: "anagrams-ae230.firebaseapp.com",
    databaseURL: "https://anagrams-ae230-default-rtdb.firebaseio.com",
    projectId: "anagrams-ae230",
    storageBucket: "anagrams-ae230.firebasestorage.app",
    messagingSenderId: "872816882119",
    appId: "1:872816882119:web:488a580a759208ef02e9e2",
    measurementId: "G-PN0QGM8P9G"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Check if two words are anagrams
const areAnagrams = (word1, word2) => {
    const normalize = str => str.toLowerCase().split("").sort().join("");
    return normalize(word1) === normalize(word2);
};

// Get all anagrams from realtime DB
const findAnagrams = async (inputWord) => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'words'));
        if (snapshot.exists()) {
            const words = Object.values(snapshot.val());
            const matches = words.filter(word => areAnagrams(inputWord, word));
            return matches.length;
        } else {
            console.error("No data found in DB");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching words:", error);
        return 0;
    }
};

// Attach event listener to input field
document.getElementById("wordInput").addEventListener("input", async (event) => {
    const inputWord = event.target.value.trim();
    if (inputWord.length === 0) {
        document.getElementById("result").textContent = "0 anagrams found";
        return;
    }

    const matchCount = await findAnagrams(inputWord);
    document.getElementById("result").textContent = `${matchCount} anagrams found`;
});
