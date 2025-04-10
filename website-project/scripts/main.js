import { loadJSON } from './utils.mjs';
const url = "data/testimonials.json"

// Update last date
document.addEventListener("DOMContentLoaded", function () {
    const lastModified = new Date(document.lastModified);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDiff = currentDate - lastModified;


    // Convert milliseconds into days, months, and years
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let timeAgoText;

    if (years > 0) {
        timeAgoText = years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
        timeAgoText = months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
        timeAgoText = days === 1 ? "1 day ago" : `${days} days ago`;
    }

    // Update the span inside #last-updated
    const lastUpdatedSpan = document.querySelector("#last-updated span")

    if (lastUpdatedSpan) {
        lastUpdatedSpan.textContent = timeAgoText;
    } else {
        console.error("Could not find the span inside #last-updated.");
    }
});

// Testimonials
async function loadTestimonials() {
    try {
        const data = await loadJSON(url);
        displayTestimonials(data);
    } catch (error) {
        console.error("Error loading testimonials:", error);
    }
}

function displayTestimonials(data) {
    const container = document.querySelector('.testimonials-container');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    let autoSlide;

    function updateTestimonials() {
        const screenWidth = window.innerWidth;
        let cardsPerView = 1;

        if (screenWidth >= 1024) {
            cardsPerView = 3;
        } else if (screenWidth >= 768) {
            cardsPerView = 2;
        }

        const visibleTestimonials = [];

        for (let i = 0; i < cardsPerView; i++) {
            const index = (currentIndex + i) % data.length;
            const testimonial = data[index];
            visibleTestimonials.push(`
                <div class="testimonial-card">
                    <img src="${testimonial.img}" alt="${testimonial.name}">
                    <h3>${testimonial.name}</h3>
                    <p class="stars">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</p>
                    <p class="comment">"${testimonial.comment}"</p>
                </div>
            `);
        }

        container.innerHTML = visibleTestimonials.join('');
    }

    function next() {
        currentIndex = (currentIndex + 1) % data.length;
        updateTestimonials();
    }


    function prev() {
        currentIndex = (currentIndex - 1 + data.length) % data.length;
        updateTestimonials();
    }

    function startAutoSlide() {
        autoSlide = setInterval(next, 4000);
    }

    prevBtn.addEventListener("click", () => {
        prev();
        clearInterval(autoSlide);
        startAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
        next();
        clearInterval(autoSlide);
        startAutoSlide();
    });

    window.addEventListener('resize', updateTestimonials);

    updateTestimonials();
    startAutoSlide();
}

loadTestimonials();

// Form
const form = document.getElementById('contact-form');
const message = document.getElementById('form-message');

form.addEventListener('submit', async function(e) {
  e.preventDefault(); // Evita recargar o redireccionar

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      message.style.display = 'block';
      message.style.color = 'green';
      message.textContent = '¡Tu mensaje ha sido enviado correctamente!';
      form.reset(); // Limpia el formulario
    } else {
      message.style.display = 'block';
      message.style.color = 'red';
      message.textContent = 'Hubo un error, intenta nuevamente.';
    }
  } catch (error) {
    message.style.display = 'block';
    message.style.color = 'red';
    message.textContent = 'Error al enviar el mensaje.';
  }
});