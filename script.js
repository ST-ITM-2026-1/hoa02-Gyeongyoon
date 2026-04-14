// ===== Theme Switcher =====
function toggleTheme() {
    const body = document.body;
    const label = document.getElementById('theme-label');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        label.textContent = '🌙 Dark';
        localStorage.setItem('theme', 'dark');
    } else {
        label.textContent = '☀️ Light';
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    const label = document.getElementById('theme-label');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        label.textContent = '🌙 Dark';
    }
    

    // ===== Project Filtering =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    const categories = card.dataset.category;
                    if (filter === 'All' || categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});



// ===== GitHub Profile & Repos =====
const GITHUB_USERNAME = 'Gyeongyoon';

async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();

        const profileSection = document.getElementById('github-profile');
        if (!profileSection) return;

        profileSection.innerHTML = `
            <div class="github-profile-card">
                <img src="${data.avatar_url}" alt="${data.name}" class="github-avatar">
                <div class="github-profile-info">
                    <h2>${data.name}</h2>
                    <p class="github-bio">${data.bio || ''}</p>
                    <div class="github-stats">
                        <div class="stat">
                            <span class="stat-number">${data.public_repos}</span>
                            <span class="stat-label">Repos</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${data.followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${data.following}</span>
                            <span class="stat-label">Following</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById('github-profile').innerHTML = 
            `<p class="error">Failed to load profile. Please try again later.</p>`;
    }
}

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);
        if (!response.ok) throw new Error('Failed to fetch repos');
        const repos = await response.json();

        const reposGrid = document.getElementById('repos-grid');
        if (!reposGrid) return;

        reposGrid.innerHTML = repos.map(repo => `
            <div class="repo-card">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p class="repo-description">${repo.description || 'No description'}</p>
                <div class="repo-info">
                    <span class="repo-language">${repo.language || 'N/A'}</span>
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        document.getElementById('repos-grid').innerHTML = 
            `<p class="error">Failed to load repositories. Please try again later.</p>`;
    }
}

// github.html에서만 실행
if (document.getElementById('github-profile')) {
    fetchGitHubProfile();
    fetchGitHubRepos();
}