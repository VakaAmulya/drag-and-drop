const form = document.getElementById("bookmarkForm");
const siteName = document.getElementById("siteName");
const siteURL = document.getElementById("siteURL");
const bookmarksList = document.getElementById("bookmarks");
const searchInput = document.getElementById("search");

// Load bookmarks on page load
document.addEventListener("DOMContentLoaded", fetchBookmarks);

// Fetch bookmarks from localStorage
function fetchBookmarks(){
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarksList.innerHTML = "";

  bookmarks.forEach(bookmark => {
    addBookmarkToDOM(bookmark);
  });
}

// Save bookmark
function saveBookmark(e){
  e.preventDefault();

  const bookmark = {
    id: Date.now(),
    name: siteName.value,
    url: siteURL.value
  };

  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  addBookmarkToDOM(bookmark);

  siteName.value = "";
  siteURL.value = "";
}

// Add bookmark to UI
function addBookmarkToDOM(bookmark){
  const li = document.createElement("li");

  li.innerHTML = `
    <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
    <button class="delete-btn" onclick="deleteBookmark(${bookmark.id})">Delete</button>
  `;

  bookmarksList.appendChild(li);
}

// Delete bookmark
function deleteBookmark(id){
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Search bookmarks
function searchBookmarks(){
  const searchValue = searchInput.value.toLowerCase();
  const bookmarks = document.querySelectorAll("#bookmarks li");

  bookmarks.forEach(bookmark => {
    const text = bookmark.innerText.toLowerCase();
    bookmark.style.display = text.includes(searchValue) ? "flex" : "none";
  });
}

// Events
form.addEventListener("submit", saveBookmark);
searchInput.addEventListener("keyup", searchBookmarks);
