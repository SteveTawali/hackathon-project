let moodChart = null;

async function loadDashboard() {
    await loadMoodChart();
    await loadAffirmation();
    await loadHabitsProgress();
    await loadRecentJournals();
}

async function loadMoodChart() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/mood/history?days=7`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const moodData = await response.json();
            renderMoodChart(moodData);
        }
    } catch (error) {
        console.error('Error loading mood data:', error);
    }
}

function renderMoodChart(moodData) {
    const ctx = document.getElementById('mood-chart').getContext('2d');
    
    // Process data for chart
    const dates = moodData.map(entry => new Date(entry.created_at).toLocaleDateString());
    const moods = moodData.map(entry => entry.mood);
    
    if (moodChart) {
        moodChart.destroy();
    }
    
    moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: 'Mood Level',
                data: moods.reverse(),
                borderColor: '#4a89dc',
                backgroundColor: 'rgba(74, 137, 220, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    min: 1,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

async function loadAffirmation() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/ai/affirmation`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('affirmation-text').textContent = `"${data.affirmation}"`;
        }
    } catch (error) {
        console.error('Error loading affirmation:', error);
    }
}

document.getElementById('new-affirmation').addEventListener('click', loadAffirmation);

async function loadHabitsProgress() {
    // This would fetch and display habit progress
    const habitsProgress = document.getElementById('habits-progress');
    habitsProgress.innerHTML = `
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <span>Water Intake</span>
                <span>5/8 glasses</span>
            </div>
            <div class="progress habit-progress">
                <div class="progress-bar" role="progressbar" style="width: 62.5%"></div>
            </div>
        </div>
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <span>Meditation</span>
                <span>10/15 minutes</span>
            </div>
            <div class="progress habit-progress">
                <div class="progress-bar" role="progressbar" style="width: 66.7%"></div>
            </div>
        </div>
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <span>Exercise</span>
                <span>Completed</span>
            </div>
            <div class="progress habit-progress">
                <div class="progress-bar" role="progressbar" style="width: 100%"></div>
            </div>
        </div>
    `;
}

async function loadRecentJournals() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/journal/entries?per_page=3`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const journalsContainer = document.getElementById('recent-journals');
            
            if (data.entries.length === 0) {
                journalsContainer.innerHTML = '<p class="text-muted">No journal entries yet.</p>';
                return;
            }
            
            journalsContainer.innerHTML = data.entries.map(entry => `
                <div class="journal-entry">
                    <h6>${entry.title || 'Untitled'}</h6>
                    <p class="text-truncate">${entry.content}</p>
                    <small class="text-muted">${new Date(entry.created_at).toLocaleDateString()}</small>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading journals:', error);
    }
}