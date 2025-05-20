document.addEventListener('DOMContentLoaded', function() {
  /* ====== Variables ====== */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const loginBtn = document.getElementById('loginBtn');
  const closeBtn = document.getElementById('closeBtn');
  const loginModal = document.getElementById('loginModal');
  const loginForm = document.getElementById('loginForm');
  const carouselInner = document.querySelector('.carousel-inner');
  const propertyCards = document.querySelectorAll('.property-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const testimonials = document.querySelectorAll('.testimonial');
  let currentSlide = 0;
  let testimonialIndex = 0;
  let carouselInterval;
  
  /* ====== Navbar Toggle ====== */
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
  
  /* ====== Smooth Scrolling ====== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Cerrar el menú móvil si está abierto
      navLinks.classList.remove('active');
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  /* ====== Login Modal ====== */
  loginBtn.addEventListener('click', function() {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
  
  closeBtn.addEventListener('click', function() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
      loginModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  /* ====== Login Form Validation ====== */
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    // Validación básica de email
    if (!email.includes('@') || !email.includes('.')) {
      alert('Por favor ingrese un email válido');
      return;
    }
    
    // Simular inicio de sesión exitoso
    alert('Inicio de sesión exitoso!');
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginForm.reset();
  });
  
  /* ====== Property Carousel ====== */
  function updateCarousel() {
    const cardWidth = propertyCards[0].offsetWidth + 30; // Incluye el margen
    carouselInner.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  }
  
  function nextSlide() {
    if (currentSlide >= propertyCards.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateCarousel();
  }
  
  function prevSlide() {
    if (currentSlide <= 0) {
      currentSlide = propertyCards.length - 1;
    } else {
      currentSlide--;
    }
    updateCarousel();
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Iniciar carrusel automático
  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 5000);
  }
  
  // Pausar carrusel cuando el mouse está sobre él
  carouselInner.addEventListener('mouseenter', function() {
    clearInterval(carouselInterval);
  });
  
  carouselInner.addEventListener('mouseleave', startCarousel);
  
  startCarousel();
  
  /* ====== Testimonials Carousel ====== */
  function showTestimonial(index) {
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
  }
  
  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }
  
  // Cambiar testimonio cada 7 segundos
  setInterval(nextTestimonial, 7000);
  
  /* ====== Scroll Effect ====== */
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
    } else {
      navbar.style.padding = '15px 0';
    }
  });
  
  /* ====== Initialize ====== */
  // Mostrar el primer testimonio
  showTestimonial(0);
  
  // Ajustar el carrusel al cargar la página
  window.addEventListener('load', updateCarousel);
  window.addEventListener('resize', updateCarousel);
  
  // Abrir detalles de propiedad al hacer clic (simulado)
  propertyCards.forEach(card => {
    card.addEventListener('click', function() {
      alert('Esta funcionalidad abriría los detalles de la propiedad en una implementación completa.');
    });
  });
});