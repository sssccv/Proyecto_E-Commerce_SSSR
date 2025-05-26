Aqui va toda la info del proyecto
- [Página](https://sssccv.github.io/Proyecto_E-Commerce_SSSR/)

## promp

Prompt: Inmobiliaria Mirez con Firebase
Descripción del Proyecto
Necesito crear una aplicación web para "Mirez Inmobiliaria" usando HTML, CSS y JavaScript Vanilla, sin frameworks ni librerías, ni dependencias npm, utilizando Firebase como backend.

La aplicación permitirá a usuarios registrados:

Ver propiedades disponibles

Agregar propiedades a un carrito de compras

Realizar el proceso de compra

Gestionar sus órdenes

Requisitos Técnicos
Base de Datos
Proponme un modelo documental para Firestore Database con el siguiente esquema:

Colección "usuarios": Almacenará información de clientes

Colección "propiedades": Contendrá todas las propiedades disponibles

Colección "carritos": Guardará los carritos de compra activos

Colección "ordenes": Registrará las transacciones completadas

Colección "pagos": Almacenará información de pagos

Incluye código JSON para inicializar datos de ejemplo.

Autenticación
Registro e inicio de sesión con:

Correo y contraseña

Cuenta de Google

Al crear un usuario, debe generarse automáticamente un documento en la colección "usuarios" de la base de datos

Funcionalidades Principales
Catálogo de Propiedades:

Vista de grid/tarjetas acomodadas en un carrusel con las 5 propiedades disponibles

Detalle de propiedad con una imagen, su número de habitaciones, baños, estacionamientos y metros cuadrados

Carrito de Compras:

Agregar/eliminar propiedades del carrito

Visualización del total acumulado

Validación de disponibilidad antes de agregar al carrito

Proceso de Compra:

Flujo de checkout

Confirmación de orden

Simulación de pago

Gestión de Órdenes:

Estado de cada orden (pendiente, completada, cancelada)

Detalle de órdenes anteriores

Interfaz de Usuario
Diseño minimalista, elegante y profesional acorde a una inmobiliaria

Navegación multipágina con:

Home (catálogo)

Página de login/registro

Detalle de propiedad

Carrito de compras

Checkout

CSS modularizado por componentes

JavaScript organizado por funcionalidad

Seguridad
Proporciona las reglas de seguridad de Firestore para:

Proteger datos sensibles

Validar integridad de la información

Restringir acceso según roles

Asegurar transacciones

Documentación Adicional
Incluye:

Instrucciones paso a paso para configurar Firebase

Estructura de archivos del proyecto

Flujo de trabajo recomendado

Ejemplos de datos de prueba

Consideraciones para despliegue en producción

Reglas de Negocio Específicas
Clientes
Nombre y email válidos requeridos

Email único en el sistema

Sólo pueden ver/modificar sus propios carritos y órdenes

Propiedades
Atributos requeridos:

Título, descripción, precio (>0)

Tipo (depto, estacionamiento , local.)

Metros cuadrados, habitaciones, baños

Estado (disponible, reservada, vendida)

Imágenes (1)

Sólo pueden ser modificadas por administradores

No se pueden eliminar si están en carritos u órdenes activas

Carritos de Compra
Asociados a un usuario

Total calculado automáticamente

No se puede confirmar si está vacío

Máximo 5 propiedades por carrito (por simplicidad)

Órdenes
Generadas desde carritos confirmados

Deben incluir:

Fecha de compra

Total

Estado (pendiente, completada, cancelada)

Detalle de propiedades

Cambios de estado:

Pendiente → Completada (con pago verificado)

Puede cancelarse si está pendiente

Pagos
Vinculados a una orden

Monto debe coincidir con total de la orden

Simulación de pasarela de pago (sandbox)

Transacciones
Al confirmar orden:

Estado de propiedad cambia a "reservada"

Stock se reduce (si aplica)

Al cancelar orden:

Estado de propiedad vuelve a "disponible"

Stock se incrementa (si aplica)

Proporcioname las reglas de seguridad de la base de datos para ejecutar la aplicación en producción.
La aplicación debe ser multipage, es decir en diferentes archivos HTML dependiendo de las funcionalidades, por ejemplo home, iniciar sesión, registro, etc.
El código JS y CSS debe estar modularizado.
A parte de proporcionarme el código necesario para construir la aplicación, proporcioname todas las instrucciones necesarias y los pasos a seguir para ir ejecutando el código y dar de alta los servicios en Firebase.

