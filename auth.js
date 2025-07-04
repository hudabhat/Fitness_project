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


// theme toggle
(function() {
  function setTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    var btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.textContent = theme === 'dark-theme' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
    localStorage.setItem('theme', theme);
  }
  function initThemeToggle() {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var isDark = document.body.classList.contains('dark-theme');
      setTheme(isDark ? 'light-theme' : 'dark-theme');
    });
    // set theme on load
    var theme = localStorage.getItem('theme') || 'light-theme';
    setTheme(theme);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();

// set theme on load

