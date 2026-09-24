const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const header = document.getElementById('site-header');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

const applyTheme = (isDark) => {
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (toggle) {
        const isDarkMode = root.classList.contains('dark');
        toggle.setAttribute('aria-label', isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro');
    }
};

const updateHeaderState = () => {
    if (!header) return;

    const scrolled = window.scrollY > 24;
    header.classList.toggle('bg-white/70', scrolled);
    header.classList.toggle('backdrop-blur-md', scrolled);
    header.classList.toggle('shadow-sm', scrolled);
    header.classList.toggle('dark:bg-[#0F1A13]/80', scrolled);
    header.classList.toggle('border-b', scrolled);
    header.classList.toggle('border-[#E5EAE3]', scrolled);
    header.classList.toggle('dark:border-[#1D2F27]', scrolled);
};

const formatMessage = (element, state, text) => {
    if (!element) return;
    element.textContent = text;
    element.classList.remove('text-[#2F7E58]', 'text-[#b91c1c]', 'text-[#495D52]');
    element.classList.add(state === 'success' ? 'text-[#2F7E58]' : state === 'error' ? 'text-[#b91c1c]' : 'text-[#495D52]');
    element.setAttribute('data-state', state);
};

const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.querySelector('input[type="email"]');
    const message = document.getElementById('newsletter-message');

    if (!emailInput || !emailInput.value.trim()) {
        formatMessage(message, 'error', 'Informe um endereço de e-mail válido para receber novidades.');
        emailInput?.focus();
        return;
    }

    if (!emailInput.checkValidity()) {
        formatMessage(message, 'error', 'O e-mail informado parece inválido. Verifique o endereço e tente novamente.');
        emailInput.focus();
        return;
    }

    formatMessage(message, 'success', 'Inscrição de demonstração registrada com sucesso. Este projeto acadêmico não envia dados para um backend real.');
    form.reset();
};

const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');
    const status = document.getElementById('contact-message-status');

    const fields = [name, email, message];
    const hasEmpty = fields.some((field) => !field.value.trim());

    if (hasEmpty) {
        formatMessage(status, 'error', 'Preencha todos os campos antes de enviar sua mensagem.');
        const firstEmpty = fields.find((field) => !field.value.trim());
        firstEmpty?.focus();
        return;
    }

    if (email && !email.checkValidity()) {
        formatMessage(status, 'error', 'O e-mail informado não é válido. Verifique o endereço e tente novamente.');
        email.focus();
        return;
    }

    formatMessage(status, 'success', 'Mensagem enviada com sucesso. Esta é uma demonstração acadêmica e não utiliza um servidor real.');
    form.reset();
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

if (toggle) {
    toggle.addEventListener('click', () => {
        applyTheme(!root.classList.contains('dark'));
    });
}

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', isOpen);
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', isOpen);
            icon.classList.toggle('fa-xmark', !isOpen);
        }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            navToggle.setAttribute('aria-expanded', 'false');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

window.addEventListener('scroll', updateHeaderState);
window.addEventListener('load', updateHeaderState);

const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}
