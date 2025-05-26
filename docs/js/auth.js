// Registro
async function signUp(email, password, name) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);

  await supabase.from('users').insert([{ id: user.id, email, name }]);
  await supabase.from('carts').insert([{ user_id: user.id }]);
  window.location.href = 'index.html';
}

// Login
async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return alert(error.message);
  window.location.href = 'index.html';
}

// Logout
async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}
