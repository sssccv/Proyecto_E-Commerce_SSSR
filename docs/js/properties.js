async function loadProperties() {
  const { data, error } = await supabase.from('properties').select('*').eq('status', 'disponible');
  const container = document.getElementById('properties-container');

  if (error) return alert('Error cargando propiedades');

  container.innerHTML = data.map(prop => `
    <div class="property-card">
      <h3>${prop.title}</h3>
      <p>${prop.description}</p>
      <p><strong>$${prop.price}</strong></p>
      <p>Stock: ${prop.stock}</p>
      <button onclick="agregarAlCarrito('${prop.id}')"
        ${prop.stock < 1 ? 'disabled' : ''}>
        Agregar al carrito
      </button>
    </div>
  `).join('');
}

loadProperties();

async function agregarAlCarrito(propertyId) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data: carts } = await supabase.from('carts').select('id').eq('user_id', user.id).single();
  await supabase.from('cart_items').insert([{ cart_id: carts.id, property_id: propertyId, quantity: 1 }]);
  alert('Agregado al carrito');
}
