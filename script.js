// ===== Theme Switcher =====
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-toggle');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        btn.textContent = 'Light';
        localStorage.setItem('theme', 'dark');
    } else {
        btn.textContent = 'Dark';
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    const btn = document.getElementById('theme-toggle');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        btn.textContent = 'Light';
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