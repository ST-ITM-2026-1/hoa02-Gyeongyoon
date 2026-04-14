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
});