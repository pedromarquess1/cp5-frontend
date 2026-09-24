const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

const applyTheme = (isDark) => {
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

if (toggle) {
    toggle.addEventListener('click', () => {
        applyTheme(!root.classList.contains('dark'));
    });
}