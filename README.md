# LinkShorty: Acortador de Enlaces con React y ASP.NET Core

![Banner](https://i.imgur.com/your-banner-image.png) <!-- Reemplaza con una imagen tuya -->

**LinkShorty** es una aplicación web moderna y completa para acortar enlaces, construida con React en el frontend y una potente API de ASP.NET Core en el backend. Permite a los usuarios gestionar sus enlaces de forma anónima o a través de una cuenta personal, ofreciendo una experiencia de usuario fluida y segura.

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Custom-orange?logo=css3)](https://www.w3.org/Style/CSS/Overview.en.html)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-8.x-blueviolet?logo=dotnet)](https://dotnet.microsoft.com/apps/aspnet)

---

## 🚀 Características Principales

- **Acortamiento Anónimo:** Crea enlaces cortos rápidamente sin necesidad de una cuenta.
- **Registro y Autenticación:** Sistema de registro e inicio de sesión para gestionar enlaces de forma personalizada.
- **Dashboard de Usuario:**
  - **Listado de Enlaces:** Visualiza todos los enlaces que has creado.
  - **Estadísticas Detalladas:** Accede a información como el número de clics, fecha de creación y último acceso.
  - **Gestión de Enlaces:** Edita la URL original, el título del enlace, y actívalo o desactívalo según tus necesidades.
  - **Eliminación Segura:** Borra los enlaces que ya no necesites.
- **Perfil de Usuario:** Visualiza y actualiza tu información de perfil.
- **Interfaz Intuitiva:** Diseño limpio, moderno y totalmente responsivo, enfocado en la experiencia de usuario.
- **Notificaciones y Alertas:** Feedback claro para el usuario al crear, modificar o eliminar enlaces.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React:** Librería principal para la construcción de la interfaz.
- **Vite:** Herramienta de desarrollo y empaquetado de alta velocidad.
- **React Router:** Para la gestión de rutas en la aplicación.
- **React Context API:** Para el manejo del estado global (sesión, enlaces, etc.).
- **CSS Moderno:** Estilos personalizados con variables, gradientes y diseño responsivo.

### Backend
- **ASP.NET Core Web API:** API RESTful para la lógica de negocio y la gestión de datos.
- **Entity Framework Core:** ORM para la interacción con la base de datos.
- **JWT (JSON Web Tokens):** Para la autenticación y autorización segura.

---

## ⚙️ Instalación y Puesta en Marcha

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

### Prerrequisitos
- **Node.js:** v18.x o superior.
- **npm** o **yarn**.
- **.NET 8 SDK:** Para ejecutar el proyecto de backend.

### Pasos

1. **Clona el repositorio del Frontend:**
   ```bash
   git clone https://github.com/tu-usuario/LinkShortyWebFront.git
   ```

2. **Navega al directorio del proyecto:**
   ```bash
   cd LinkShortyWebFront/shortylink
   ```

3. **Instala las dependencias:**
   ```bash
   npm install
   ```

4. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto (`shortylink`) y añade la URL de tu API de backend.
   ```env
   VITE_API_URL=https://localhost:7180/api
   ```

5. **Clona y ejecuta el proyecto de Backend:**
   Asegúrate de tener el [repositorio del backend](https://github.com/tu-usuario/linkshorty-backend) clonado y ejecutándose.

6. **Inicia el servidor de desarrollo del Frontend:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

---

## 📂 Estructura del Proyecto

El proyecto está organizado siguiendo una arquitectura modular y escalable:

```
src/
├── assets/         # Imágenes y otros recursos estáticos
├── component/      # Componentes reutilizables (Nav, Footer, Alertas)
├── context/        # Lógica de estado global con Context API
├── DTO/            # Data Transfer Objects para la API
├── hooks/          # Hooks personalizados para la lógica de negocio
├── layout/         # Estructuras de página (Dashboard, Layout principal)
├── pages/          # Vistas principales de la aplicación
├── service/        # Lógica para las llamadas a la API
├── styles/         # Archivos CSS globales y por componente
└── util/           # Funciones de utilidad (manejo de errores, tokens)
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor sigue estos pasos:
1. Haz un Fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añade nueva funcionalidad'`).
4. Sube tus cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 📌 Disclarimer
El README fue creado por un modelo de lenguaje AI y puede contener errores o inexactitudes. Por favor, revisa y ajusta según sea necesario.