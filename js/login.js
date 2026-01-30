const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    message.style.color = "red";
    message.textContent = "User not found.";
    return;
  }

  localStorage.setItem("currentUser", username);
  window.location.href = "diary.html";
});
