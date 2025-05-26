async function loadCart() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Obtener carrito del usuario
  const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user.id).single();

  if (!cart) {
    document.getElementById('cart-items-container').innerText = 'No tienes un carrito activo.';
    return;
  }

  // Obtener items del carrito con info de propiedades
  const { data: items, error } = await supabase.from('cart_items')
    .select(`id, quantity, property_id, properties(title, price, stock)`)
    .eq('cart_id', cart.id);

  if (error) return alert('Error cargando el carrito');

  const container = document.getElementById('cart-items-container');

  if (items.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    document.getElementById('finalizar-compra').disabled = true;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="property-card">
      <h3>${item.properties.title}</h3>
      <p>Precio: $${item.properties.price}</p>
      <p>Cantidad: ${item.quantity}</p>
    </div>
  `).join('');

  document.getElementById('finalizar-compra').disabled = false;
}

// Simula finalizar compra (solo muestra alerta y limpia carrito)
document.getElementById('finalizar-compra').addEventListener('click', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user.id).single();

  // Eliminar items del carrito
  const { error } = await supabase.from('cart_items').delete().eq('cart_id', cart.id);

  if (error) return alert('Error al finalizar la compra');

  alert('Simulación de compra finalizada. ¡Gracias!');
  loadCart();
});

// Al cargar la página
loadCart();
