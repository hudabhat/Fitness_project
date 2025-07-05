// Authentication and navigation management
(function () {
  'use strict';

  // Check with server if user is logged in
  async function isUserLoggedIn() {
    try {
      const response = await fetch('/auth-status', { credentials: 'include' });
      const data = await response.json();
      return data.loggedIn === true;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  }

  // Redirect to login if not authenticated
  async function requireAuth() {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) {
      window.location.href = 'login.html';
    }
  }

  // Update navigation based on login status
  async function updateNavigation() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;

    const blogLink = nav.querySelector('a[href="blog.html"]');
    const scheduleLink = nav.querySelector('a[href="schedule.html"]');
    const loginLink = nav.querySelector('a[href="login.html"]');

    const loggedIn = await isUserLoggedIn();

    if (loggedIn) {
      if (blogLink) blogLink.parentElement.style.display = 'inline';
      if (scheduleLink) scheduleLink.parentElement.style.display = 'inline';
      if (loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.onclick = logout;
      }
    } else {
      if (blogLink) blogLink.parentElement.style.display = 'none';
      if (scheduleLink) scheduleLink.parentElement.style.display = 'none';
      if (loginLink) {
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';
        loginLink.onclick = null;
      }
    }
  }

  // Logout function
  async function logout() {
    try {
      await fetch('/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    window.location.href = 'homepage.html';
  }

  // Initialize auth system
  async function initAuth() {
    await updateNavigation();

    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['blog.html', 'schedule.html'];

    if (protectedPages.includes(currentPage)) {
      await requireAuth();
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }

  window.logout = logout;
})();

