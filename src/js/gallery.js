// ===== Gallery Filter =====
const gfilterBtns = document.querySelectorAll('.gfilter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

gfilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    gfilterBtns.forEach(b => {
      b.classList.remove('active', 'bg-forest-500', 'text-white');
      b.classList.add('hover:bg-forest-500', 'hover:text-white');
    });
    btn.classList.add('active', 'bg-forest-500', 'text-white');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentIndex = 0;
let visibleImages = [];

function refreshVisibleImages() {
  visibleImages = Array.from(galleryItems)
    .filter(item => !item.classList.contains('hidden'))
    .map(item => item.querySelector('img').src);
}

function openLightbox(index) {
  refreshVisibleImages();
  currentIndex = index;
  lightboxImg.src = visibleImages[currentIndex];
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

function showImage(direction) {
  refreshVisibleImages();
  currentIndex = (currentIndex + direction + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex];
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    refreshVisibleImages();
    const visibleIndex = visibleImages.indexOf(item.querySelector('img').src);
    openLightbox(visibleIndex);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => showImage(-1));
lightboxNext?.addEventListener('click', () => showImage(1));

// Close on background click
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(-1);
    if (e.key === 'ArrowRight') showImage(1);
  }
});