// Navigation mobile toggle
const navToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('nav ul');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Animated counters (on home page)
function animateCounter(id, target, duration = 2000) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const increment = target / (duration / 30);
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(counter);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 30);
}

document.addEventListener('DOMContentLoaded', () => {
  // Home page counters
  if (document.getElementById('counter-food')) {
    animateCounter('counter-food', 12500);
    animateCounter('counter-people', 3200);
    animateCounter('counter-co2', 4800);
  }

  // Swiper testimonials
  if (document.querySelector('.swiper')) {
    new Swiper('.swiper', {
      loop: true,
      autoplay: { delay: 4000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
  }

  // Role-based login toggle
  const roleTabs = document.querySelectorAll('.role-tab');
  const roleForms = document.querySelectorAll('.role-form');
  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const role = tab.dataset.role;
      roleForms.forEach(f => {
        f.style.display = f.dataset.role === role ? 'block' : 'none';
      });
    });
  });

  // Login logic
  const credentials = {
    donor: { email: 'donor@foodai.com', password: 'donor123' },
    ngo: { email: 'ngo@foodai.com', password: 'ngo123' },
    admin: { email: 'admin@foodai.com', password: 'admin123' }
  };

  document.querySelectorAll('.role-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const role = form.dataset.role;
      const email = form.querySelector('input[type="email"]').value.trim();
      const password = form.querySelector('input[type="password"]').value.trim();
      const errorMsg = form.querySelector('.login-error') || document.createElement('div');
      errorMsg.className = 'login-error';
      errorMsg.style.color = '#e53935';
      errorMsg.style.marginTop = '0.5em';
      if (email === credentials[role].email && password === credentials[role].password) {
        // Store login state
        localStorage.setItem('fwai_logged_in', 'true');
        localStorage.setItem('fwai_role', role);
        // Redirect
        if (role === 'donor') window.location.href = 'dashboard-donor.html';
        if (role === 'ngo') window.location.href = 'dashboard-ngo.html';
        if (role === 'admin') window.location.href = 'dashboard-admin.html';
      } else {
        errorMsg.textContent = 'Invalid email or password.';
        if (!form.querySelector('.login-error')) form.appendChild(errorMsg);
      }
    });
  });

  // FAQ expand/collapse
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      q.classList.toggle('open');
      const answer = q.nextElementSibling;
      if (answer) answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Dashboard tab switching (if any)
  document.querySelectorAll('.dashboard-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dashboard-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      document.querySelectorAll('.dashboard-section').forEach(s => {
        s.style.display = s.id === target ? 'block' : 'none';
      });
    });
  });

  // Dashboard access control (mock)
  const dashboardPages = {
    'dashboard-donor.html': 'donor',
    'dashboard-ngo.html': 'ngo',
    'dashboard-admin.html': 'admin'
  };
  const path = window.location.pathname.split('/').pop();
  if (dashboardPages[path]) {
    const loggedIn = localStorage.getItem('fwai_logged_in') === 'true';
    const role = localStorage.getItem('fwai_role');
    if (!loggedIn || role !== dashboardPages[path]) {
      window.location.href = 'login.html';
    }
  }
});

// Simple form validation (example)
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('input[required], textarea[required]').forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('input-error');
      valid = false;
    } else {
      input.classList.remove('input-error');
    }
  });
  return valid;
} 