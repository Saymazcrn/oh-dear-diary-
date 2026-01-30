const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
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

  // Temporary fake register
  const user = {
    email,
    password
  };

  console.log("Registered user:", user);

  message.style.color = "green";
  message.textContent = "Registration successful ✨";

  form.reset();
});
