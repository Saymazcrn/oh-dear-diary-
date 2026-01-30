const currentUsername = localStorage.getItem("currentUser");
if (!currentUsername) {
  window.location.href = "login.html";
}

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find(u => u.username === currentUsername);

const today = new Date().toLocaleDateString("en-US");
document.getElementById("date").textContent = today;

let currentPageIndex = 0;
const listEl = document.getElementById("diaryList");

// ---- helpers ----
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---- load today ----
function loadToday() {
  let todayDiary = currentUser.diaries.find(d => d.date === today);

  if (!todayDiary) {
    todayDiary = { date: today, pages: [""] };
    currentUser.diaries.push(todayDiary);
    saveUsers();
  }

  currentPageIndex = 0;
  document.getElementById("entry").value = todayDiary.pages[0];
  renderList();
}

// ---- save ----
function saveDiary() {
  let todayDiary = currentUser.diaries.find(d => d.date === today);
  todayDiary.pages[currentPageIndex] =
    document.getElementById("entry").value;

  saveUsers();
  renderList();
  alert("Saved ✨");   // DOĞRU YERİ BURASI
}

// ---- new page ----
function newPage() {
  let todayDiary = currentUser.diaries.find(d => d.date === today);
  todayDiary.pages.push("");
  currentPageIndex = todayDiary.pages.length - 1;
  document.getElementById("entry").value = "";
  saveUsers();
  renderList();
}

// ---- list ----
function renderList() {
  listEl.innerHTML = "";
  currentUser.diaries.forEach(d => {
    d.pages.forEach((p, i) => {
      const li = document.createElement("li");
      li.textContent = d.date + " - Page " + (i + 1);
      li.onclick = () => {
        currentPageIndex = i;
        document.getElementById("entry").value = p;
      };
      listEl.appendChild(li);
    });
  });
}

// ---- logout ----
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ---- delete account ----
function deleteAccount() {
  const ok = confirm("Your account and all journal entries will be permanently deleted. Are you sure?");
  if (!ok) return;

  users = users.filter(u => u.username !== currentUsername);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// INIT
loadToday();
// Auto refresh when day changes (optional pro feature)
setInterval(() => {
  const newToday = new Date().toLocaleDateString("en-US");
  if (newToday !== today) {
    location.reload();
  }
}, 60000); // checks every 1 minute

