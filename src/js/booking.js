// ===== Room Prices =====
const roomPrices = {
  garden: { name: "Garden Room", price: 6000 },
  twin: { name: "Twin Room", price: 7500 },
  deluxe: { name: "Canopy Deluxe Room", price: 9500 },
  cabana: { name: "Treehouse Cabana", price: 12000 },
  "cabana-single": { name: "Single Cabana", price: 13500 },
  suite: { name: "Forest View Suite", price: 14000 }
};

// ===== Elements =====
const roomSelect = document.getElementById('room-type');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const guestMinus = document.getElementById('guest-minus');
const guestPlus = document.getElementById('guest-plus');
const guestCount = document.getElementById('guest-count');
const bookingForm = document.getElementById('booking-form');
const bookingModal = document.getElementById('booking-modal');
const modalClose = document.getElementById('modal-close');
const modalMessage = document.getElementById('modal-message');

// Summary elements
const summaryRoom = document.getElementById('summary-room');
const summaryPrice = document.getElementById('summary-price');
const summaryNights = document.getElementById('summary-nights');
const summaryGuests = document.getElementById('summary-guests');
const summaryTotal = document.getElementById('summary-total');

let guests = 2;

// ===== Set min date to today =====
const today = new Date().toISOString().split('T')[0];
if (checkinInput) checkinInput.min = today;
if (checkoutInput) checkoutInput.min = today;

// ===== Pre-select room from URL query param =====
const params = new URLSearchParams(window.location.search);
const preselectedRoom = params.get('room');
if (preselectedRoom && roomSelect) {
  const option = roomSelect.querySelector(`option[value="${preselectedRoom}"]`);
  if (option) option.selected = true;
}

// ===== Calculate Nights =====
function getNights() {
  if (!checkinInput.value || !checkoutInput.value) return 0;
  const checkin = new Date(checkinInput.value);
  const checkout = new Date(checkoutInput.value);
  const diff = (checkout - checkin) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff : 0;
}

// ===== Update Summary =====
function updateSummary() {
  const selectedRoom = roomSelect ? roomSelect.value : 'garden';
  const room = roomPrices[selectedRoom];
  const nights = getNights();
  const total = room.price * nights;

  if (summaryRoom) summaryRoom.textContent = room.name;
  if (summaryPrice) summaryPrice.textContent = `₹${room.price.toLocaleString('en-IN')}`;
  if (summaryNights) summaryNights.textContent = nights;
  if (summaryGuests) summaryGuests.textContent = guests;
  if (summaryTotal) summaryTotal.textContent = nights > 0 ? `₹${total.toLocaleString('en-IN')}` : '₹0';
}

// ===== Guest Counter =====
if (guestMinus) {
  guestMinus.addEventListener('click', () => {
    if (guests > 1) {
      guests--;
      guestCount.textContent = guests;
      updateSummary();
    }
  });
}

if (guestPlus) {
  guestPlus.addEventListener('click', () => {
    if (guests < 6) {
      guests++;
      guestCount.textContent = guests;
      updateSummary();
    }
  });
}

// ===== Listen for changes =====
roomSelect?.addEventListener('change', updateSummary);
checkinInput?.addEventListener('change', () => {
  // Ensure checkout is after checkin
  if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
    checkoutInput.value = '';
    if (summaryNights) summaryNights.textContent = 0;
    if (summaryTotal) summaryTotal.textContent = '₹0';
  }
  checkoutInput.min = checkinInput.value;
  updateSummary();
});
checkoutInput?.addEventListener('change', updateSummary);

// ===== Form Submit =====
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('b-name').value.trim();
    const email = document.getElementById('b-email').value.trim();
    const phone = document.getElementById('b-phone').value.trim();
    const nights = getNights();

    // Validation
    if (!name || !email || !phone) {
      alert('Please fill in all required fields.');
      return;
    }
    if (nights === 0) {
      alert('Please select valid check-in and check-out dates.');
      return;
    }

    const selectedRoom = roomSelect.value;
    const room = roomPrices[selectedRoom];
    const total = room.price * nights;

    // Show confirmation modal
    modalMessage.textContent = `Thank you, ${name}! Your ${room.name} is reserved for ${nights} night(s). Estimated total: ₹${total.toLocaleString('en-IN')}. We'll contact you at ${email} to confirm.`;
    bookingModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    bookingForm.reset();
    guests = 2;
    guestCount.textContent = guests;
    updateSummary();
  });
}

// ===== Close Modal =====
modalClose?.addEventListener('click', () => {
  bookingModal.classList.add('hidden');
  document.body.style.overflow = '';
});

// Close on background click
bookingModal?.addEventListener('click', (e) => {
  if (e.target === bookingModal) {
    bookingModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// ===== Init =====
updateSummary();