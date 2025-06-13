// pricing.js
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.select-plan');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedPlan = button.getAttribute('data-plan');
      alert(`You selected the ${selectedPlan}`);
      
      // Optionally save it to localStorage for later use
      localStorage.setItem('selectedPlan', selectedPlan);
    });
  });
});
