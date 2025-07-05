// Authentication and navigation management
(function() {
  'use strict';

  // Check if user is logged in
  function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Redirect to login if not authenticated
  function requireAuth() {
    if (!isUserLoggedIn()) {
      window.location.href = 'login.html';
    }
  }

  // Update navigation based on login status
  function updateNavigation() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;

    const blogLink = nav.querySelector('a[href="blog.html"]');
    const scheduleLink = nav.querySelector('a[href="schedule.html"]');
    const loginLink = nav.querySelector('a[href="login.html"]');

    if (isUserLoggedIn()) {
      // Show protected links, hide login link
      if (blogLink) blogLink.parentElement.style.display = 'inline';
      if (scheduleLink) scheduleLink.parentElement.style.display = 'inline';
      if (loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.onclick = logout;
      }
    } else {
      // Hide protected links, show login link
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
  function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'homepage.html';
  }

  // Initialize auth system
  function initAuth() {
    updateNavigation();
    
    // Check if current page requires auth
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['blog.html', 'schedule.html'];
    
    if (protectedPages.includes(currentPage)) {
      requireAuth();
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }

  // Expose logout function globally
  window.logout = logout;
})(); 
