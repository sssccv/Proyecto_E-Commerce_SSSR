# Inmobiliaria con Supabase
Necesito crear una aplicación web con HTML, CSS y JavaScript Vanilla, sin frameworks, ni librerías, ni dependencias npm y como backend use Supabase.

La aplicación debe permitir al usuario crear una cuenta o iniciar sesión si es que ya tiene cuenta, una vez logueado el usuario podra navegar por la página y agregar residencias a su carrito (si es que hay disponibles en el stock)

### Reglas de Negocio
- Proponme un modelo relacional de la base de datos y el código SQL para crear la base de datos de la aplicación en el editor SQL de Supabase.
- Registro e inicio de sesión para los siguientes métodos de autenticación de Supabase: Correo y contraseña.
-Al momento de crear un usuario en el servicio de autenticación de Supabase, debe crearse un registro en la tabla de usuarios de la base de datos y su respectivo carrito de compra.
- CRUD Ver todas las propiedades disponibles, Buscar y filtrar por criterios como precio, tipo , estado (disponible, reservada, vendida) y stock.
- La interfaz visual deberá permitir al usuario logueado agregar propiedades a su carrito solo si hay en stock (en el carrito se podrá finalizar la simulación de compra).
- La navbar deberá tener un botón para cerrar seción
- la ui debe de ser minimalista pero elegante
- Proporcioname las reglas de seguridad para ejecutar la aplicación en producción.
- La aplicación debe ser multipage, es decir en diferentes archivos HTML dependiendo de las funcionalidades, por ejemplo home, iniciar sesión, registro, etc.
- El código JS y CSS debe estar modularizado.

A parte de proporcionarme el código necesario para construir la aplicación, proporcioname todas las instrucciones necesarias y los pasos a seguir para ir ejecutando el código y dar de alta los servicios en Supabase, también ten en mente que los archivos estarán adentro de una carpeta llamada "docs" para que la página arranque desde github
a continuación te dejo una foto de como me gustaría que se viera la página ya funcionando



docs/
├── login.html
├── register.html
├── carrito.html
├── js/
│   ├── carrito.js
│   └── utils.js
└── assets/
    └── logo.png (o imágenes si usas alguna)