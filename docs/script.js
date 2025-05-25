document.addEventListener('DOMContentLoaded', function() {
  /* ====== Variables ====== */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const closeBtn = document.getElementById('closeBtn');
  const loginModal = document.getElementById('loginModal');
  const loginForm = document.getElementById('loginForm');
  const carouselInner = document.querySelector('.carousel-inner');
  const propertyCards = document.querySelectorAll('.property-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const testimonials = document.querySelectorAll('.testimonial');
  const cartIcon = document.getElementById('cartIcon');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartModal = document.getElementById('cartModal');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartCount = document.querySelector('.cart-count');
  
  let currentSlide = 0;
  let testimonialIndex = 0;
  let carouselInterval;
  let cart = [];
  let isLoggedIn = false;
  let propertiesStock = {};

  /* ====== Inicializar stock ====== */
  function initializeStock() {
    document.querySelectorAll('.property-card').forEach(card => {
      const title = card.querySelector('h3').textContent;
      const stock = parseInt(card.getAttribute('data-stock'));
      propertiesStock[title] = stock;
      updateStockDisplay(title);
    });
  }

  /* ====== Actualizar visualización del stock ====== */
  function updateStockDisplay(title) {
    document.querySelectorAll('.property-card').forEach(card => {
      if (card.querySelector('h3').textContent === title) {
        const stockCount = card.querySelector('.stock-count');
        if (stockCount) {
          stockCount.textContent = propertiesStock[title];
        }
        
        if (propertiesStock[title] <= 0) {
          card.classList.add('out-of-stock');
        } else {
          card.classList.remove('out-of-stock');
        }
      }
    });
  }

  /* ====== Mostrar popup de login al cargar ====== */
  setTimeout(() => {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }, 1000);

  /* ====== Navbar Toggle ====== */
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
  
  /* ====== Smooth Scrolling ====== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
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
    
    if (!email.includes('@') || !email.includes('.')) {
      alert('Por favor ingrese un email válido');
      return;
    }
    
    // Simular inicio de sesión exitoso
    isLoggedIn = true;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    cartIcon.style.display = 'flex';
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginForm.reset();
  });

  /* ====== Logout Function ====== */
  logoutBtn.addEventListener('click', function() {
    isLoggedIn = false;
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    cartIcon.style.display = 'none';
    
    // Vaciar carrito al cerrar sesión
    cart.forEach(item => {
      const title = item.title;
      propertiesStock[title] += item.quantity;
      updateStockDisplay(title);
    });
    cart = [];
    updateCartDisplay();
    
    alert('Has cerrado sesión correctamente');
  });

  /* ====== Carrito de compras ====== */
  cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    updateCartDisplay();
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeCartBtn.addEventListener('click', function() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', function(e) {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  propertyCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('carousel-btn')) return;

      if (!isLoggedIn) {
        alert('Por favor inicie sesión para agregar propiedades al carrito');
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return;
      }

      const title = card.querySelector('h3').textContent;
      
      if (propertiesStock[title] <= 0) {
        alert('Lo sentimos, esta propiedad ya no está disponible');
        return;
      }

      const priceText = card.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      const image = card.querySelector('img').src;

      const existingItem = cart.find(item => item.title === title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          title,
          price,
          image,
          quantity: 1
        });
      }

      propertiesStock[title] -= 1;
      updateStockDisplay(title);
      updateCartDisplay();
      alert(`${title} ha sido agregado al carrito. Quedan ${propertiesStock[title]} disponibles.`);
    });
  });

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">No hay propiedades en tu carrito</p>';
    } else {
      cartItems.innerHTML = '';
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-details">
            <h4>${item.title}</h4>
            <p>${item.quantity} x $${item.price.toLocaleString()}</p>
          </div>
          <button class="remove-item" data-title="${item.title}">&times;</button>
        `;
        cartItems.appendChild(cartItem);
      });
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toLocaleString()}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const itemIndex = cart.findIndex(item => item.title === title);
        
        if (itemIndex !== -1) {
          propertiesStock[title] += cart[itemIndex].quantity;
          updateStockDisplay(title);
          
          cart.splice(itemIndex, 1);
          updateCartDisplay();
        }
      });
    });
  }

  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    alert('Compra realizada con éxito! Gracias por tu compra.');
    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  /* ====== Property Carousel ====== */
  function updateCarousel() {
    const cardWidth = propertyCards[0].offsetWidth + 30;
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
  
  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 5000);
  }
  
  carouselInner.addEventListener('mouseenter', function() {
    clearInterval(carouselInterval);
  });
  
  carouselInner.addEventListener('mouseleave', startCarousel);
  
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
  
  /* ====== Scroll Effect ====== */
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
    } else {
      navbar.style.padding = '15px 0';
    }
  });
  
  /* ====== Initialize ====== */
  // Ocultar elementos inicialmente
  logoutBtn.style.display = 'none';
  cartIcon.style.display = 'none';
  
  initializeStock();
  showTestimonial(0);
  startCarousel();
  
  window.addEventListener('load', updateCarousel);
  window.addEventListener('resize', updateCarousel);
});