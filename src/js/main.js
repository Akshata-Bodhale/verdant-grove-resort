// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}



// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const iconLight = document.getElementById('theme-icon-light');
const iconDark = document.getElementById('theme-icon-dark');
const htmlEl = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    htmlEl.classList.add('dark');
    iconLight?.classList.remove('hidden');
    iconDark?.classList.add('hidden');
  } else {
    htmlEl.classList.remove('dark');
    iconLight?.classList.add('hidden');
    iconDark?.classList.remove('hidden');
  }
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

function toggleTheme() {
  const isDark = htmlEl.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
}

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);

// ===== Active Nav Link (auto-detect current page) =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('text-forest-500', 'font-semibold');
  }
});

// ===== AOS Scroll Animation =====
const animatedEls = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// ===== Testimonials Carousel =====
const testimonials = [
  { text: "Waking up to birdsong and morning mist over the canopy was magical. Best eco-getaway we've had.", author: "Ananya R." },
  { text: "The treehouse cabana exceeded every expectation. Peaceful, sustainable, and beautifully designed.", author: "Rohan & Meera" },
  { text: "Farm-to-table dining here is unreal. Every meal felt like a gift from the forest.", author: "Priya S." },
  { text: "Perfect digital detox spot. The nature trails and yoga sessions reset my whole mindset.", author: "Vikram T." }
];

let testimonialIndex = 0;
const testimonialText = document.getElementById('testimonial-text');
const testimonialAuthor = document.getElementById('testimonial-author');
const testimonialBox = document.getElementById('testimonial-box');

if (testimonialBox) {
  setInterval(() => {
    testimonialBox.style.opacity = '0';
    setTimeout(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      testimonialText.textContent = `"${testimonials[testimonialIndex].text}"`;
      testimonialAuthor.textContent = `— ${testimonials[testimonialIndex].author}`;
      testimonialBox.style.opacity = '1';
    }, 500);
  }, 5000);
}

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMsg = document.getElementById('newsletter-msg');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (email) {
      newsletterMsg.textContent = `Thank you! ${email} has been subscribed.`;
      newsletterMsg.classList.add('text-forest-100');
      newsletterForm.reset();
      setTimeout(() => { newsletterMsg.textContent = ''; }, 4000);
    }
  });
}

// ===== Preloader =====
const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloader-bar');

if (preloader) {
  if (preloaderBar) {
    setTimeout(() => { preloaderBar.style.width = '100%'; }, 100);
  }
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 800);
  });
}

// ===== Back to Top =====
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.remove('hidden');
    } else {
      backToTop.classList.add('hidden');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Cookie Consent =====
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');

if (cookieBanner) {
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => cookieBanner.classList.remove('hidden'), 1500);
  }
  cookieAccept?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.classList.add('hidden');
  });
  cookieDecline?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.classList.add('hidden');
  });
}

// ===== Announcement Bar =====
const announcementBar = document.getElementById('announcement-bar');
const closeAnnouncement = document.getElementById('close-announcement');

if (announcementBar) {
  if (!sessionStorage.getItem('announcementClosed')) {
    announcementBar.classList.remove('hidden');
  }
  closeAnnouncement?.addEventListener('click', () => {
    announcementBar.classList.add('hidden');
    sessionStorage.setItem('announcementClosed', 'true');
  });
}

// ===== Smooth Page Transition =====
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 400);
    });
  }
});

// ===== FAQ Accordion =====
const faqBtns = document.querySelectorAll('.faq-btn');

faqBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = !answer.classList.contains('hidden');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

    // Open clicked if it was closed
    if (!isOpen) {
      answer.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
    }
  });
});

// ===== Breadcrumb Room Name (room-detail page) =====
const breadcrumbRoom = document.getElementById('breadcrumb-room');
if (breadcrumbRoom) {
  const params = new URLSearchParams(window.location.search);
  const roomNames = {
    cabana: 'Treehouse Cabana',
    deluxe: 'Canopy Deluxe Room',
    garden: 'Garden Room',
    suite: 'Forest View Suite',
    twin: 'Twin Room',
    'cabana-single': 'Single Cabana'
  };
  const roomKey = params.get('room') || 'cabana';
  breadcrumbRoom.textContent = roomNames[roomKey] || 'Room Detail';
}