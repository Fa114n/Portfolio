
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});



const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.padding = '0.5rem 4rem';
    navbar.style.borderBottomColor = 'rgba(0, 245, 255, 0.4)';
  } else {
    navbar.style.padding = '1rem 4rem';
    navbar.style.borderBottomColor = 'rgba(0, 245, 255, 0.2)';
  }
});



const typingText = document.querySelector('.hero-title');
const words = [
  'Cybersecurity Student',
  'Network Enthusiast',
  'Python Developer',
  'Ethical Hacking Learner'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

 
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1500); 
    return;
  }


  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 50 : 80;
  setTimeout(type, speed);
}


setTimeout(type, 1000);



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });


document.querySelectorAll(
  '.skill-category, .project-card, .cert-card, .about-content, .contact-item'
).forEach(el => observer.observe(el));


const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});



const heroName = document.querySelector('.hero-name');

heroName.addEventListener('mouseenter', () => {
  heroName.classList.add('glitching');
  setTimeout(() => heroName.classList.remove('glitching'), 600);
});

// --- 7. EMAILJS CONTACT FORM ---
emailjs.init('5y-te1EMcoy9PuOjv');

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  emailjs.sendForm('service_lclkvsf', 'template_ekfbta8', this)
    .then(() => {
      formStatus.textContent = '✅ Message sent successfully!';
      formStatus.className = 'success';
      contactForm.reset();
      submitBtn.textContent = 'Send Message ›';
      submitBtn.disabled = false;
    })
    .catch((error) => {
      formStatus.textContent = '❌ Failed to send. Please try again.';
      formStatus.className = 'error';
      submitBtn.textContent = 'Send Message ›';
      submitBtn.disabled = false;
      console.error('EmailJS error:', error);
    });
});

// --- 8. PARTICLES BACKGROUND ---
const canvas = document.createElement('canvas');
canvas.id = 'particles';
canvas.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
`;
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create particles
for (let i = 0; i < 80; i++) {
  particles.push({
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    r:    Math.random() * 1.5 + 0.5,
    dx:   (Math.random() - 0.5) * 0.4,
    dy:   (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.2
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // Move
    p.x += p.dx;
    p.y += p.dy;

    // Wrap around edges
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 255, ${p.alpha})`;
    ctx.fill();
  });

  // Draw connecting lines between close particles
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();