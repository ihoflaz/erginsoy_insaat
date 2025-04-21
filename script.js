// Sayfa yüklendiğinde anasayfa linkini aktif yap
document.addEventListener('DOMContentLoaded', () => {
    // Anasayfa linkini bul
    const homeLink = document.querySelector('a[href="#anasayfa"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// Mevcut scroll olayı dinleyicisi
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        contactForm.reset();
    });
}

// Animation on scroll for statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        let current = 0;
        const increment = value / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                clearInterval(timer);
                stat.textContent = value + '+';
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Trigger animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Video slider functionality
function initVideoSlider() {
    const videos = document.querySelectorAll('.video-background');
    let currentVideo = 0;
    
    function showNextVideo() {
        // Remove active class from current video
        videos[currentVideo].classList.remove('active');
        
        // Move to next video or back to first
        currentVideo = (currentVideo + 1) % videos.length;
        
        // Add active class to new current video
        videos[currentVideo].classList.add('active');
    }
    
    // Change video every 5 seconds
    setInterval(showNextVideo, 5000);
}

// Initialize video slider when page loads
document.addEventListener('DOMContentLoaded', initVideoSlider);

// Mobil menü için gerekli değişkenler
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Hamburger menü tıklama olayı
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Mobil menüde dropdown menüleri için
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        }
    });
});

// Mobil menüde link tıklamalarını yönet
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Sayfa yüklendiğinde ve yeniden boyutlandırıldığında dropdown menüleri sıfırla
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

console.log("Web sitesi hazır!");
