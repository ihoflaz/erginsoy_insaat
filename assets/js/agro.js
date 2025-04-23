// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll için tüm iç linkleri seç
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Her link için smooth scroll event listener ekle
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animasyonları için Intersection Observer
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Animate edilecek elementleri seç ve observer'a ekle
    document.querySelectorAll('.feature-item, .production-card, .quality-content, .contact-form-container').forEach((element) => {
        animateOnScroll.observe(element);
    });

    // İletişim formu gönderimi
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Form doğrulama
            if (validateForm(formObject)) {
                // Başarılı mesajı göster
                showNotification('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.', 'success');
                this.reset();
            }
        });
    }
});

// Form doğrulama fonksiyonu
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s\-\+]{10,}$/;
    
    if (!data.name || data.name.length < 2) {
        showNotification('Lütfen geçerli bir isim giriniz.', 'error');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showNotification('Lütfen geçerli bir e-posta adresi giriniz.', 'error');
        return false;
    }
    
    if (!phoneRegex.test(data.phone)) {
        showNotification('Lütfen geçerli bir telefon numarası giriniz.', 'error');
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showNotification('Lütfen en az 10 karakterlik bir mesaj giriniz.', 'error');
        return false;
    }
    
    return true;
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3 saniye sonra bildirimi kaldır
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobil menü toggle fonksiyonu
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    if (nav && burger) {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    }
}

// Sayfa scroll pozisyonuna göre navbar'ı güncelle
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Lazy loading için IntersectionObserver
const lazyLoadImages = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

// Lazy load için resimleri seç ve observer'a ekle
document.querySelectorAll('img.lazy').forEach(img => {
    lazyLoadImages.observe(img);
}); 