//
//  script.js
//  erginsoy_insaat
//
//  Created by Ahsen on 30.12.2024.
//

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

console.log("Web sitesi hazır!");
