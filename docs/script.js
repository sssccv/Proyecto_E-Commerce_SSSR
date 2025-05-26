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
  const propertySearch = document.getElementById('propertySearch');
  const propertyModal = document.getElementById('propertyModal');
  const closePropertyBtn = document.getElementById('closePropertyBtn');
  const propertyDetailImage = document.getElementById('propertyDetailImage');
  const propertyDetailTitle = document.getElementById('propertyDetailTitle');
  const propertyDetailDescription = document.getElementById('propertyDetailDescription');
  const propertyDetailPrice = document.getElementById('propertyDetailPrice');
  const propertyDetailStock = document.getElementById('propertyDetailStock');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const searchContainer = document.querySelector('.search-container');
  
  let currentSlide = 0;
  let testimonialIndex = 0;
  let carouselInterval;
  let cart = [];
  let isLoggedIn = false;
  let propertiesStock = {};
  let selectedProperty = null;

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

  /* ====== Mostrar detalle de propiedad ====== */
  function showPropertyDetail(card) {
    const title = card.querySelector('h3').textContent;
    const currentStock = propertiesStock[title];
    
    // Verificar si hay stock disponible
    if (currentStock <= 0) {
      alert('Lo sentimos, esta propiedad ya no está disponible');
      return;
    }

    selectedProperty = {
      title: title,
      description: card.querySelector('p').textContent,
      price: card.querySelector('.price').textContent,
      image: card.querySelector('img').src,
      stock: currentStock
    };
    
    propertyDetailImage.src = selectedProperty.image;
    propertyDetailTitle.textContent = selectedProperty.title;
    propertyDetailDescription.textContent = selectedProperty.description;
    propertyDetailPrice.textContent = selectedProperty.price;
    propertyDetailStock.textContent = selectedProperty.stock;
    
    // Actualizar estado del botón según stock
    addToCartBtn.disabled = selectedProperty.stock <= 0;
    
    propertyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  /* ====== Agregar al carrito desde el modal ====== */
  addToCartBtn.addEventListener('click', function() {
    if (!isLoggedIn) {
      alert('Por favor inicie sesión para agregar propiedades al carrito');
      loginModal.style.display = 'flex';
      propertyModal.style.display = 'none';
      return;
    }
    
    if (selectedProperty.stock <= 0) {
      alert('Lo sentimos, esta propiedad ya no está disponible');
      return;
    }
    
    const price = parseFloat(selectedProperty.price.replace(/[^0-9.]/g, ''));
    const existingItem = cart.find(item => item.title === selectedProperty.title);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        title: selectedProperty.title,
        price: price,
        image: selectedProperty.image,
        quantity: 1
      });
    }
    
    // Actualizar stock
    propertiesStock[selectedProperty.title] -= 1;
    updateStockDisplay(selectedProperty.title);
    updateCartDisplay();
    
    // Actualizar stock en el modal
    propertyDetailStock.textContent = propertiesStock[selectedProperty.title];
    selectedProperty.stock = propertiesStock[selectedProperty.title];
    
    // Deshabilitar botón si no hay stock
    addToCartBtn.disabled = selectedProperty.stock <= 0;
    
    alert(`${selectedProperty.title} ha sido agregado al carrito. Quedan ${selectedProperty.stock} disponibles.`);
  });

  /* ====== Modificar el evento click de las propiedades ====== */
  propertyCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('carousel-btn')) return;
      
      const title = card.querySelector('h3').textContent;
      if (propertiesStock[title] <= 0) {
        alert('Lo sentimos, esta propiedad ya no está disponible');
        return;
      }
      
      showPropertyDetail(card);
    });
  });

  /* ====== Cerrar modal de propiedad ====== */
  closePropertyBtn.addEventListener('click', function() {
    propertyModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', function(e) {
    if (e.target === propertyModal) {
      propertyModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  /* ====== Buscador en navbar ====== */
  propertySearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    propertyCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
    updateCarousel();
  });

  /* ====== Mostrar/ocultar buscador en móvil ====== */
  hamburger.addEventListener('click', function() {
    searchContainer.classList.toggle('active');
  });

  /* ====== Carousel Functions ====== */
  function updateCarousel() {
    const visibleCards = Array.from(propertyCards).filter(card => 
      card.style.display !== 'none'
    );
    
    if (visibleCards.length > 0) {
      const cardWidth = visibleCards[0].offsetWidth + 30;
      carouselInner.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
  }
  
  function nextSlide() {
    const visibleCards = Array.from(propertyCards).filter(card => 
      card.style.display !== 'none'
    );
    
    if (visibleCards.length === 0) return;
    
    if (currentSlide >= visibleCards.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateCarousel();
  }
  
  function prevSlide() {
    const visibleCards = Array.from(propertyCards).filter(card => 
      card.style.display !== 'none'
    );
    
    if (visibleCards.length === 0) return;
    
    if (currentSlide <= 0) {
      currentSlide = visibleCards.length - 1;
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