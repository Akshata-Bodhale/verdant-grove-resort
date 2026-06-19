// ===== Contact Form Handling (client-side only, no backend) =====
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all required fields.';
      formMsg.classList.remove('text-forest-500');
      formMsg.classList.add('text-red-500');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.classList.remove('text-forest-500');
      formMsg.classList.add('text-red-500');
      return;
    }

    // Success
    formMsg.textContent = `Thank you, ${name}! Your message has been received. We'll get back to you soon.`;
    formMsg.classList.remove('text-red-500');
    formMsg.classList.add('text-forest-500');

    contactForm.reset();

    setTimeout(() => { formMsg.textContent = ''; }, 5000);
  });
}