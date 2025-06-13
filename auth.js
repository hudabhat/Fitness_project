// SIGNUP
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  if (localStorage.getItem(username)) {
    alert("User already exists!");
  } else {
    localStorage.setItem(username, JSON.stringify({ password }));
    alert("Signup successful! You can now log in.");
    document.getElementById("signupForm").reset();
  }
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem(username));

  if (!storedUser) {
    alert("User not found. Please sign up first.");
  } else if (storedUser.password !== password) {
    alert("Incorrect password.");
  } else {
    alert(`Welcome, ${username}! Login successful.`);
    // Redirect or unlock features
  }

  document.getElementById("loginForm").reset();
});
