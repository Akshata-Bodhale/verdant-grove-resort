// ===== Image Imports (Vite needs these to track & hash correctly) =====
import imgCabana from '/assets/images/rooms/treehouse-cabana.jpg'
import imgDeluxe from '/assets/images/rooms/canopy-deluxe.jpg'
import imgGarden from '/assets/images/rooms/garden-room.jpg'
import imgSuite from '/assets/images/rooms/forest-suite.jpg'
import imgTwin from '/assets/images/rooms/twin-room.jpg'
import imgSingle from '/assets/images/rooms/single-cabana.jpg'

// ===== Room Detail Data =====
const roomData = {
  cabana: {
    name: "Treehouse Cabana",
    price: 12000,
    image: imgCabana,          // ✅ use imported variable
    guests: 2,
    size: "450 sq.ft",
    description: "Perched among the treetops, our Treehouse Cabanas offer an immersive forest experience with floor-to-ceiling windows, a private wooden deck, and the soothing sounds of the canopy. Wake up to birdsong and sleep under the stars.",
    amenities: ["Free Wi-Fi", "Private Deck", "Forest View", "Rainfall Shower", "Organic Toiletries", "Mini Fridge", "Ceiling Fan", "Reading Nook"]
  },
  deluxe: {
    name: "Canopy Deluxe Room",
    price: 9500,
    image: imgDeluxe,          // ✅
    guests: 3,
    size: "400 sq.ft",
    description: "Spacious and bright, the Canopy Deluxe Room features floor-to-ceiling forest-facing windows, a comfortable seating area, and premium furnishings — ideal for travelers seeking comfort with a view.",
    amenities: ["Free Wi-Fi", "Mini Bar", "Forest View", "Work Desk", "Air Conditioning", "Premium Bedding", "Tea/Coffee Maker", "Safe Locker"]
  },
  garden: {
    name: "Garden Room",
    price: 6000,
    image: imgGarden,          // ✅
    guests: 2,
    size: "320 sq.ft",
    description: "Cozy and welcoming, our Garden Rooms open directly onto lush landscaped gardens. Perfect for guests who enjoy easy outdoor access and a peaceful ground-level stay.",
    amenities: ["Free Wi-Fi", "Garden Access", "Ceiling Fan", "Organic Toiletries", "Tea/Coffee Maker", "Outdoor Seating"]
  },
  suite: {
    name: "Forest View Suite",
    price: 14000,
    image: imgSuite,           // ✅
    guests: 4,
    size: "650 sq.ft",
    description: "Our most premium offering — a spacious suite with a private balcony overlooking the forest valley, separate living area, in-room jacuzzi, and dedicated butler service for a truly indulgent stay.",
    amenities: ["Free Wi-Fi", "Private Balcony", "Jacuzzi", "Butler Service", "Living Area", "Premium Bedding", "Mini Bar", "Air Conditioning"]
  },
  twin: {
    name: "Twin Room",
    price: 7500,
    image: imgTwin,            // ✅
    guests: 2,
    size: "350 sq.ft",
    description: "A comfortable twin-bed setup ideal for friends, families, or colleagues traveling together, with all essential amenities and a calming forest-adjacent ambiance.",
    amenities: ["Free Wi-Fi", "Twin Beds", "Ceiling Fan", "Organic Toiletries", "Tea/Coffee Maker", "Work Desk"]
  },
  "cabana-single": {
    name: "Single Cabana",
    price: 13500,
    image: imgSingle,          // ✅
    guests: 1,
    size: "380 sq.ft",
    description: "A secluded retreat for solo travelers — this private cabana offers complete solitude amidst nature, with a personal deck overlooking the forest canopy.",
    amenities: ["Free Wi-Fi", "Private Deck", "Forest View", "Rainfall Shower", "Organic Toiletries", "Reading Nook"]
  }
};

// ===== rest of your existing code stays exactly the same =====

// ===== Get room from URL query param =====
const params = new URLSearchParams(window.location.search);
const roomKey = params.get('room') || 'cabana';
const room = roomData[roomKey] || roomData['cabana'];

// ===== Build share URLs as variables first (fixes Vite parser issue) =====
const currentURL = window.location.href;
const waText = 'Check out this amazing ' + room.name + ' at Verdant Grove Resort! ' + currentURL;
const waURL = 'https://wa.me/?text=' + encodeURIComponent(waText);
const fbURL = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentURL);

// ===== Build amenities HTML =====
const amenitiesHTML = room.amenities
  .map(a => '<div class="flex items-center gap-2"><span class="text-forest-500">✔</span> ' + a + '</div>')
  .join('');

// ===== Render Room Details =====
const container = document.getElementById('room-detail-content');

if (container && room) {
  container.innerHTML =
    '<a href="rooms.html" class="inline-flex items-center gap-2 text-forest-500 font-semibold mb-6 hover:underline">' +
    '&larr; Back to All Rooms</a>' +

    '<div class="grid md:grid-cols-2 gap-10 items-start">' +
      '<img src="' + room.image + '" alt="' + room.name + '" class="rounded-2xl shadow-lg w-full h-96 object-cover" loading="lazy">' +

      '<div>' +
        '<h1 class="font-heading text-3xl md:text-4xl font-bold mb-2">' + room.name + '</h1>' +
        '<p class="text-2xl font-semibold text-forest-500 mb-4">₹' + room.price.toLocaleString('en-IN') + ' <span class="text-base font-normal">/ night</span></p>' +

        '<div class="flex gap-4 mb-6 text-sm">' +
          '<span class="bg-forest-100 dark:bg-forest-700/40 px-3 py-2 rounded-lg">👥 ' + room.guests + ' Guests</span>' +
          '<span class="bg-forest-100 dark:bg-forest-700/40 px-3 py-2 rounded-lg">📐 ' + room.size + '</span>' +
        '</div>' +

        '<p class="mb-6">' + room.description + '</p>' +

        '<h2 class="font-heading text-xl font-bold mb-3">Amenities</h2>' +
        '<div class="grid grid-cols-2 gap-2 mb-8 text-sm">' + amenitiesHTML + '</div>' +

        '<a href="booking.html?room=' + roomKey + '" class="inline-block bg-forest-500 hover:bg-forest-700 text-white px-8 py-3 rounded-full font-semibold transition">Book This Room</a>' +

        '<div class="mt-6">' +
          '<p class="font-semibold mb-3">Share this room:</p>' +
          '<div class="flex gap-3 flex-wrap">' +
            '<a href="' + waURL + '" target="_blank" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition">WhatsApp</a>' +
            '<a href="' + fbURL + '" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">Facebook</a>' +
            '<button id="copy-link-btn" class="bg-forest-100 dark:bg-forest-700 hover:bg-forest-200 text-forest-700 dark:text-cream px-4 py-2 rounded-full text-sm font-semibold transition">Copy Link</button>' +
          '</div>' +
        '</div>' +

      '</div>' +
    '</div>';

  document.title = room.name + ' | Verdant Grove Resort';

  // Copy link button (added after innerHTML so element exists)
  document.getElementById('copy-link-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(currentURL).then(() => alert('Link copied!'));
  });
}

// ===== Update breadcrumb =====
const breadcrumbRoom = document.getElementById('breadcrumb-room');
if (breadcrumbRoom) {
  breadcrumbRoom.textContent = room.name;
}