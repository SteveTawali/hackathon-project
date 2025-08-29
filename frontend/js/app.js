// Navigation
document.getElementById('nav-dashboard').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('dashboard-section');
});

document.getElementById('nav-mood').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('mood-section');
});

document.getElementById('nav-journal').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('journal-section');
});

document.getElementById('nav-habits').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('habits-section');
});

document.getElementById('nav-meditation').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('meditation-section');
});

document.getElementById('nav-sos').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('sos-section');
});

// Quick actions
document.getElementById('quick-mood').addEventListener('click', () => {
    showSection('mood-section');
});

document.getElementById('quick-journal').addEventListener('click', () => {
    showSection('journal-section');
});

document.getElementById('quick-breathing').addEventListener('click', () => {
    showSection('meditation-section');
    // Trigger breathing exercise
    startBreathingExercise();
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('#app-content > div').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the requested section
    document.getElementById(sectionId).style.display = 'block';
    
    // Load section-specific data if needed
    if (sectionId === 'dashboard-section') {
        loadDashboard();
    } else if (sectionId === 'mood-section') {
        loadMoodSection();
    } else if (sectionId === 'journal-section') {
        loadJournalSection();
    } else if (sectionId === 'habits-section') {
        loadHabitsSection();
    } else if (sectionId === 'meditation-section') {
        loadMeditationSection();
    } else if (sectionId === 'sos-section') {
        loadSOSSection();
    }
}

// Initialize the app to show dashboard by default
if (token && currentUser) {
    showSection('dashboard-section');
}