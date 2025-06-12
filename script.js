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
const navOverlay = document.querySelector('.nav-overlay');

// Hamburger menü tıklama olayı
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        toggleMenu();
    });
}

// Overlay tıklama olayı
if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        toggleMenu(false);
    });
}

// Menüyü aç/kapat
function toggleMenu(show = null) {
    const isActive = show !== null ? show : !hamburgerMenu.classList.contains('active');
    
    hamburgerMenu.classList.toggle('active', isActive);
    navLinks.classList.toggle('active', isActive);
    navOverlay.classList.toggle('active', isActive);
    
    // Body scroll lock
    document.body.style.overflow = isActive ? 'hidden' : '';
}

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
if (navLinks) {
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
            toggleMenu(false);
        }
    });
}

// Sayfa yüklendiğinde ve yeniden boyutlandırıldığında dropdown menüleri sıfırla
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        toggleMenu(false);
    }
});

// Lightbox Functionality for Gallery Images
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;
    
    // Update total count
    lightboxTotal.textContent = galleryItems.length;
    
    // Add click event to each gallery image
    galleryItems.forEach((img, index) => {
        img.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = galleryItems[index].src;
        lightboxImg.alt = galleryItems[index].alt;
        lightboxCurrent.textContent = index + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryItems.length - 1;
        openLightbox(currentImageIndex);
    }
    
    function showNextImage() {
        currentImageIndex = currentImageIndex < galleryItems.length - 1 ? currentImageIndex + 1 : 0;
        openLightbox(currentImageIndex);
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
});

console.log("Web sitesi hazır!");
