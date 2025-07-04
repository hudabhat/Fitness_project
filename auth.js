// signup logic
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("signupUsername")?.value || document.getElementById("signupEmail")?.value;
  const password = document.getElementById("signupPassword").value;
  if (localStorage.getItem(username)) {
    alert("User already exists!");
  } else {
    localStorage.setItem(username, JSON.stringify({ password }));
    alert("Signup successful! You can now log in.");
    document.getElementById("signupForm").reset();
  }
});

// login logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername")?.value || document.getElementById("loginEmail")?.value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem(username));
  if (!storedUser) {
    alert("User not found. Please sign up first.");
  } else if (storedUser.password !== password) {
    alert("Wrong password!");
  } else {
    window.location.href = "about.html";
  }
  document.getElementById("loginForm").reset();
});

// redirect or unlock

