/**
 * PortfolioPro Custom Scripts
 */

// 1. Dark Mode Management
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('mobile-theme-icon');

function updateIcons(isDark) {
    const sunClass = 'fas fa-sun text-yellow-400';
    const moonClass = 'fas fa-moon text-primary';
    
    if(themeIcon) themeIcon.className = isDark ? sunClass : moonClass;
    if(themeIconMobile) themeIconMobile.className = isDark ? sunClass : moonClass;
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons(isDark);
}

// Event Listeners for Theme
if(themeToggle) themeToggle.addEventListener('click', toggleTheme);
if(mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

// Initialize Theme on Load
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateIcons(false);
    }
})();

// 2. Mobile Menu Management
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if(menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('span');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const originalText = btnText.innerText;
        btnText.innerText = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                
                btnText.innerText = 'Message Sent Successfully! ✓';
                submitBtn.classList.remove('bg-primary');
                submitBtn.classList.add('bg-green-500');
                contactForm.reset(); 
            } else {
                throw new Error();
            }
        } catch (error) {
            
            btnText.innerText = 'Oops! Something went wrong';
            submitBtn.classList.add('bg-red-500');
        } finally {
            setTimeout(() => {
                btnText.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.classList.remove('bg-green-500', 'bg-red-500');
                submitBtn.classList.add('bg-primary');
            }, 4000);
        }
    });
}

// Modal Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto'; 
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('backdrop-blur-sm')) {
        event.target.classList.add('hidden');
        event.target.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

