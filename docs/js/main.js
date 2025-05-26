// Página Home - mostrar usuario y propiedades
document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('logout-btn');
  const navLinks = document.getElementById('nav-links');
  const propertiesList = document.getElementById('properties-list');

  // Mostrar usuario logueado y botones de navbar
  const user = supabase.auth.getUser();
  const session = await supabase.auth.getSession();

  if(session.data.session) {
    logoutBtn.classList.remove('hidden');
    navLinks.innerHTML = '';
  } else {
    logoutBtn.classList.add('hidden');
    navLinks.innerHTML = `
      <a href="login.html">Iniciar sesión</a>
      <a href="register.html">Crear cuenta</a>
    `;
  }

  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
  });

  // Cargar propiedades
  async function loadProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'disponible');

    if(error) {
      propertiesList.innerHTML = '<p>Error al cargar propiedades.</p>';
      return;
    }

    if(!data || data.length === 0) {
      propertiesList.innerHTML = '<p>No hay propiedades disponibles.</p>';
      return;
    }

    propertiesList.innerHTML = '';
    data.forEach(prop => {
      const card = document.createElement('div');
      card.className = 'property-card';
      card.innerHTML = `
        <img src="${prop.image_url || 'https://via.placeholder.com/300x160?text=Sin+Imagen'}" alt="${prop.title}" />
        <div class="details">
          <h3>${prop.title}</h3>
          <p>${prop.description || ''}</p>
          <p class="price">$${prop.price.toLocaleString()}</p>
          <button ${prop.stock === 0 ? 'disabled' : ''} data-id="${prop.id}">
            ${prop.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
          </button>
        </div>
      `;
      propertiesList.appendChild(card);
    });

    // Eventos para botones agregar al carrito
    propertiesList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        // TODO: agregar propiedad al carrito en la base de datos
        alert('Funcionalidad carrito no implementada aún para propiedad ID: ' + id);
      });
    });
  }

  loadProperties();
});