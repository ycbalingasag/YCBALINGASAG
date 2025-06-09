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

  const storageRef = storage.ref(`gallery/${Date.now()}_${file.name}`);
  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      db.collection("gallery").add({ url }).then(() => {
        alert("Upload successful");
        fileInput.value = "";
        loadGallery();
      });
    });
  }).catch((error) => alert("Upload failed: " + error.message));
});

// Load gallery for admin (with delete)
function loadGallery() {
  galleryDiv.innerHTML = "Loading...";
  db.collection("gallery").get().then((snapshot) => {
    galleryDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.classList.add("gallery-card");
      card.style.position = "relative";

      const img = document.createElement("img");
      img.src = data.url;
      img.alt = "Gallery Image";

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "button red";
      delBtn.style.position = "absolute";
      delBtn.style.bottom = "8px";
      delBtn.style.left = "8px";
      delBtn.style.fontSize = "0.8rem";
      delBtn.style.padding = "0.3rem 0.6rem";

      delBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this image?")) {
          db.collection("gallery").doc(doc.id).delete().then(() => {
            // Also delete from storage
            const fileRef = storage.refFromURL(data.url);
            fileRef.delete();
            loadGallery();
          }).catch((error) => alert("Delete failed: " + error.message));
        }
      };

      card.appendChild(img);
      card.appendChild(delBtn);
      galleryDiv.appendChild(card);
    });
  });
}
