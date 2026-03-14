
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