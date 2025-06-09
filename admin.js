import { auth, db, storage } from "./firebase-config.js";

// DOM Elements
const loginSection = document.getElementById("login-section");
const adminSection = document.getElementById("admin-section");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("upload-btn");
const galleryDiv = document.getElementById("gallery");

// Monitor auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    loginSection.style.display = "none";
    adminSection.style.display = "block";
    loadGallery();
  } else {
    loginSection.style.display = "block";
    adminSection.style.display = "none";
  }
});

// Login
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }
  auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert("Login failed: " + error.message));
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// Upload image
uploadBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Select a file first.");
    return;
  }

  const fileRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
  uploadBytes(fileRef, file).then((snapshot) => {
    return getDownloadURL(fileRef);
  }).then((url) => {
    return addDoc(collection(db, "gallery"), { url });
  }).then(() => {
    alert("Upload successful");
    fileInput.value = "";
    loadGallery();
  }).catch((error) => alert("Upload failed: " + error.message));
});

// Load gallery
function loadGallery() {
  galleryDiv.innerHTML = "Loading...";
  getDocs(collection(db, "gallery")).then((snapshot) => {
    galleryDiv.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement("div");
      card.classList.add("gallery-card");

      const img = document.createElement("img");
      img.src = data.url;
      img.alt = "Image";

      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.className = "button red";
      btn.onclick = () => {
        if (confirm("Are you sure?")) {
          deleteDoc(doc(db, "gallery", docSnap.id)).then(() => {
            loadGallery();
          });
        }
      };

      card.appendChild(img);
      card.appendChild(btn);
      galleryDiv.appendChild(card);
    });
  });
}
