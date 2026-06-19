// ===== Room Filter & Price Slider Logic =====

const filterBtns = document.querySelectorAll('.filter-btn');
const roomCards = document.querySelectorAll('.room-card');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const noResults = document.getElementById('no-results');

let activeFilter = 'all';
let maxPrice = priceRange ? parseInt(priceRange.value) : 15000;

function applyFilters() {
  let visibleCount = 0;

  roomCards.forEach(card => {
    const category = card.dataset.category;
    const price = parseInt(card.dataset.price);

    const categoryMatch = activeFilter === 'all' || category === activeFilter;
    const priceMatch = price <= maxPrice;

    if (categoryMatch && priceMatch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  if (noResults) {
    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }
}

// Filter button clicks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset all buttons
    filterBtns.forEach(b => {
      b.classList.remove('active', 'bg-forest-500', 'text-white');
      b.classList.add('hover:bg-forest-500', 'hover:text-white');
    });

    // Activate clicked button
    btn.classList.add('active', 'bg-forest-500', 'text-white');

    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

// Price range slider
if (priceRange) {
  priceRange.addEventListener('input', () => {
    maxPrice = parseInt(priceRange.value);
    priceValue.textContent = maxPrice.toLocaleString('en-IN');
    applyFilters();
  });
}

// Initial run
applyFilters();