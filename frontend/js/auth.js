const API_BASE_URL = 'http://localhost:5000/api';

let currentUser = null;
let token = localStorage.getItem('mindwell_token');

// DOM Elements
const authSection = document.getElementById('auth-section');
const appContent = document.getElementById('app-content');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const usernameSpan = document.getElementById('username');
const navLogout = document.getElementById('nav-logout');

// Event Listeners
loginTab.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
});

registerTab.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
});

loginBtn.addEventListener('click', handleLogin);
registerBtn.addEventListener('click', handleRegister);
navLogout.addEventListener('click', handleLogout);

// Check if user is already logged in
if (token) {
    verifyToken();
}

async function verifyToken() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            currentUser = userData;
            showAppContent();
        } else {
            localStorage.removeItem('mindwell_token');
            token = null;
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('mindwell_token');
        token = null;
    }
}

async function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            token = data.access_token;
            localStorage.setItem('mindwell_token', token);
            currentUser = { id: data.user_id, username: data.username };
            showAppContent();
        } else {
            const error = await response.json();
            alert(error.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

async function handleRegister() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        if (response.ok) {
            alert('Registration successful. Please login.');
            loginTab.click();
            // Clear form
            document.getElementById('register-username').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-confirm-password').value = '';
        } else {
            const error = await response.json();
            alert(error.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
}

function handleLogout(e) {
    e.preventDefault();
    token = null;
    currentUser = null;
    localStorage.removeItem('mindwell_token');
    showAuthContent();
}

function showAppContent() {
    authSection.style.display = 'none';
    appContent.style.display = 'block';
    usernameSpan.textContent = currentUser.username;
    // Load dashboard data
    loadDashboard();
}

function showAuthContent() {
    authSection.style.display = 'block';
    appContent.style.display = 'none';
    usernameSpan.textContent = 'Guest';
}

// Make token available to other modules
function getAuthToken() {
    return token;
}

function getCurrentUser() {
    return currentUser;
}