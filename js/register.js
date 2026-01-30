const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (password !== password2) {
    message.style.color = "red";
    message.textContent = "Passwords do not match 😔";
    return;
  }

  if (password.length < 6) {
    message.style.color = "red";
    message.textContent = "Password must be at least 6 characters long.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username)) {
    message.style.color = "red";
    message.textContent = "This username is already taken.";
    return;
  }

  users.push({
    username,
    password,
    diaries: []
  });

  localStorage.setItem("users", JSON.stringify(users));

  message.style.color = "green";
  message.textContent = "Registration successful ✨";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 800);
});
