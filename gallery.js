const galleryDiv = document.getElementById("gallery");

function loadPublicGallery() {
  galleryDiv.innerHTML = "Loading...";
  db.collection("gallery").get().then((snapshot) => {
    galleryDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const img = document.createElement("img");
      img.src = data.url;
      img.alt = "Gallery Image";
      galleryDiv.appendChild(img);
    });
  }).catch(() => {
    galleryDiv.innerHTML = "Failed to load gallery.";
  });
}

window.onload = () => {
  loadPublicGallery();
};
