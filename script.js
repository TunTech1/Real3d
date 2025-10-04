// Login page interactions

const form = document.getElementById('login-form');
const emailOrPhone = document.getElementById('emailOrPhone');
const password = document.getElementById('password');
const rememberMe = document.getElementById('rememberMe');
const togglePasswordBtn = document.querySelector('.toggle-password');
const backBtn = document.querySelector('.back-btn');

function showError(inputEl, message) {
  const control = inputEl.closest('.form-control');
  const errorEl = control.querySelector('.error');
  control.classList.add('invalid');
  errorEl.textContent = message || '';
}

function clearError(inputEl) {
  const control = inputEl.closest('.form-control');
  const errorEl = control.querySelector('.error');
  control.classList.remove('invalid');
  errorEl.textContent = '';
}

function isEmail(value) {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
}

function isPhone(value) {
  return /^[+]?\d[\d\s-]{8,}$/.test(value);
}

function isEmailOrPhone(value) {
  return isEmail(value) || isPhone(value);
}

// Load remembered credential
(function hydrateRemembered() {
  try {
    const saved = localStorage.getItem('login.remembered');
    if (saved) {
      const data = JSON.parse(saved);
      if (data && data.username) {
        emailOrPhone.value = data.username;
        rememberMe.checked = true;
      }
    }
  } catch (_) {}
})();

// Toggle password visibility
if (togglePasswordBtn && password) {
  togglePasswordBtn.addEventListener('click', () => {
    const showing = password.type === 'text';
    password.type = showing ? 'password' : 'text';
    togglePasswordBtn.textContent = showing ? 'Show' : 'Hide';
    togglePasswordBtn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  });
}

// Back button
backBtn?.addEventListener('click', () => {
  if (history.length > 1) history.back();
});

// Inline validation
emailOrPhone?.addEventListener('input', () => {
  if (emailOrPhone.value.trim() && !isEmailOrPhone(emailOrPhone.value.trim())) {
    showError(emailOrPhone, 'Enter a valid email or phone number');
  } else {
    clearError(emailOrPhone);
  }
});

password?.addEventListener('input', () => {
  if (password.value.length < 6) {
    showError(password, 'Password must be at least 6 characters');
  } else {
    clearError(password);
  }
});

// Submit handler
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = emailOrPhone.value.trim();
  const pwd = password.value;

  let valid = true;
  if (!isEmailOrPhone(username)) {
    showError(emailOrPhone, 'Enter a valid email or phone number');
    valid = false;
  }
  if (pwd.length < 6) {
    showError(password, 'Password must be at least 6 characters');
    valid = false;
  }
  if (!valid) return;

  // Remember me persistence
  try {
    if (rememberMe.checked) {
      localStorage.setItem('login.remembered', JSON.stringify({ username }));
    } else {
      localStorage.removeItem('login.remembered');
    }
  } catch (_) {}

  const submitBtn = form.querySelector('.btn.primary');
  const original = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Logging in…';
  
  // Simulate async login
  await new Promise(r => setTimeout(r, 900));

  submitBtn.disabled = false;
  submitBtn.textContent = original;
  alert('Login submitted (demo)');
});

// Google button demo
document.getElementById('googleLogin')?.addEventListener('click', () => {
  alert('Google login clicked (demo)');
});
