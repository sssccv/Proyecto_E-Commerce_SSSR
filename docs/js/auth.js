// Registro y Login
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  if(registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = registerForm.name.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;

      if(!name || !email || !password) {
        alert('Completa todos los campos');
        return;
      }

      const { data, error } = await supabase.auth.signUp({ email, password });

      if(error) {
        alert('Error en registro: ' + error.message);
        return;
      }
      if(!data.user) {
        alert('No se pudo crear el usuario.');
        return;
      }

      const userId = data.user.id;

      // Crear registro en tabla users
      const { error: errorUser } = await supabase
        .from('users')
        .insert([{ id: userId, name }]);

      if(errorUser) {
        alert('Error al guardar usuario: ' + errorUser.message);
        return;
      }

      // Crear carrito para el usuario
      const { error: errorCart } = await supabase
        .from('carts')
        .insert([{ user_id: userId }]);

      if(errorCart) {
        alert('Error al crear carrito: ' + errorCart.message);
        return;
      }

      alert('Usuario creado. Verifica tu correo para activar tu cuenta.');
      window.location.href = 'login.html';
    });
  }

  if(loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      if(!email || !password) {
        alert('Completa todos los campos');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if(error) {
        alert('Error al iniciar sesión: ' + error.message);
        return;
      }

      alert('Sesión iniciada correctamente');
      window.location.href = 'index.html';
    });
  }
});