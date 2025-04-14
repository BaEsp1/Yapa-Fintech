# Yapa - Inversiones
![Logo](./client/public/LogoLargo.png)


## Industria o Rubro
La industria fintech se enfoca en la innovación tecnológica aplicada a los servicios financieros. Este proyecto se enmarca en este sector, ofreciendo soluciones digitales que facilitan el ahorro y la inversión, mejorando la inclusión financiera y proporcionando herramientas avanzadas para la gestión del patrimonio personal.

---

## Breve Descripción del Proyecto
Incluir financieramente a la población argentina en un contexto económico complejo y cambiante, brindando herramientas que faciliten el ahorro e inversión a personas de diferentes edades y niveles de experiencia.
YAPA es una aplicación financiera diseñada para empoderar a los usuarios en la gestión y crecimiento de su patrimonio. La plataforma permite definir objetivos personales, como la planificación de unas vacaciones, la compra de bienes como un automóvil o un departamento o la financiación de proyectos a largo plazo. Basándose en estos objetivos, YAPA asigna un portafolio de inversiones personalizado, adaptado al perfil del usuario y a las dinámicas del mercado. Además, la app aprende del comportamiento de cada usuario y ofrece recomendaciones de inversión cada vez más precisas y alineadas con sus metas.

---

## Colaboradores
| Foto | Nombre | Rol | LinkedIn | GitHub |
|------|--------|-----|----------|--------|
| ![Bárbara Espinola](https://avatars.githubusercontent.com/BaEsp1?s=100) | Bárbara Espinola | Fullstack Developer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/baesp/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/BaEsp1) |
| ![Walkiria Arteaga](https://avatars.githubusercontent.com/wlkrtg?s=100) | Walkiria Arteaga | UI/UX Designer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/walkiria-arteaga-10501925b/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/wlkrtg) |


## Instrucciones para Instalar y Ejecutar el Proyecto Localmente


1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/BaEsp1/Yapa-Fintech.git
   ```

2. **Instalar dependencias:**
   - **Backend:**
     ```bash
     cd server
     npm install
     ```
   - **Frontend:**
     ```bash
     cd client
     npm install
     ```

3. **Configurar las variables de entorno:**
   - Crear un archivo `.env` en la carpeta `server` con las credenciales para la base de datos.

     ```bash
      DB_HOST=localhost
      DB_USER=usuario
      DB_PASSWORD=contraseña
      DB_NAME=yapa_db
     ```
   - Crear un archivo `.env.local` en la carpeta `client` con las variables necesarias para el frontend.

4. **Ejecutar el proyecto:**
   - **Backend:**
     ```bash
     cd server
     npm run dev
     ```
   - **Frontend:**
     ```bash
     cd client
     npm run dev
     ```

5. **Abrir el proyecto:**
   - Backend API estará disponible en `http://localhost:8080`.
   - Frontend estará disponible en `http://localhost:3000`.


## Tecnologías Utilizadas

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?&logo=node.js&logoColor=white) **Node.js**
- ![Express](https://img.shields.io/badge/Express-%23404d59.svg?&logo=express&logoColor=white) **Express**
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23336791.svg?&logo=postgresql&logoColor=white) **PostgreSQL**
- ![Sequelize](https://img.shields.io/badge/Sequelize-%23000000.svg?&logo=sequelize&logoColor=white) **Sequelize ORM**
- ![JWT](https://img.shields.io/badge/JWT-%23000000.svg?&logo=JSON%20web%20tokens&logoColor=white) **JWT**
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-%23000000.svg?&logo=bcrypt&logoColor=white) **Bcrypt.js**
- ![Dotenv](https://img.shields.io/badge/Dotenv-%23464F47.svg?&logo=dotenv&logoColor=white) **Dotenv**
- ![CORS](https://img.shields.io/badge/CORS-%2361DAFB.svg?&logo=cors&logoColor=white) **CORS**
- ![Morgan](https://img.shields.io/badge/Morgan-%23101010.svg?&logo=morgan&logoColor=white) **Morgan**
- ![Express Validator](https://img.shields.io/badge/Express%20Validator-%23000000.svg?&logo=express&logoColor=white) **Express Validator**
- ![Express Async Handler](https://img.shields.io/badge/Express%20Async%20Handler-%23000000.svg?&logo=express&logoColor=white) **Express Async Handler**
- ![Swagger](https://img.shields.io/badge/Swagger-%2385EA2D.svg?&logo=swagger&logoColor=white) **Swagger**

### Frontend
- ![React](https://img.shields.io/badge/React-%2361DAFB.svg?&logo=react&logoColor=white) **React (Next.js)**
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?&logo=typescript&logoColor=white) **TypeScript**
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?&logo=tailwind-css&logoColor=white) **Tailwind CSS**
- ![MUI](https://img.shields.io/badge/MUI-%23000000.svg?&logo=mui&logoColor=white) **Material UI (MUI)**
- ![Zustand](https://img.shields.io/badge/Zustand-%23000000.svg?&logo=zustand&logoColor=white) **Zustand**
- ![Formik](https://img.shields.io/badge/Formik-%23000000.svg?&logo=formik&logoColor=white) **Formik**
- ![Yup](https://img.shields.io/badge/Yup-%23000000.svg?&logo=yup&logoColor=white) **Yup**
- ![Axios](https://img.shields.io/badge/Axios-%23121013.svg?&logo=axios&logoColor=white) **Axios**
- ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-%23C45000.svg?&logo=sweetalert2&logoColor=white) **SweetAlert2**
- ![Swiper](https://img.shields.io/badge/Swiper-%234B9E62.svg?&logo=swiper&logoColor=white) **Swiper**
- ![Lottie](https://img.shields.io/badge/Lottie-%23000000.svg?&logo=lottie&logoColor=white) **Lottie**
- ![React Icons](https://img.shields.io/badge/React%20Icons-%23000000.svg?&logo=react&logoColor=white) **React Icons**
- ![React Phone Input 2](https://img.shields.io/badge/React%20Phone%20Input%202-%23000000.svg?&logo=react&logoColor=white) **React Phone Input 2**
- ![JS Cookie](https://img.shields.io/badge/JS%20Cookie-%23000000.svg?&logo=js-cookie&logoColor=white) **JS-Cookie**

## ⚠️ Aclaración sobre la autoría del proyecto
Este proyecto fue inicialmente desarrollado en equipo durante una colaboración académica/profesional. Por motivos legales y de derechos sobre la marca, este repositorio utiliza un nombre ficticio (Yapa) y no hace uso de branding, assets o nombres originales.

Esta versión ha sido modificada y adaptada de forma individual:

 -  El backend fue completamente reescrito en Node.js (el original estaba en Java).
 - El frontend fue ajustado para funcionar con esta nueva arquitectura, incluyendo cambios en estado global, componentes y estilos.
 -  Se agregaron funcionalidades nuevas y cambios estructurales según criterio personal.

Por lo tanto, este repositorio refleja mi trabajo individual y mi enfoque técnico sobre una solución previamente diseñada de manera grupal.



## Enlaces Relevantes

- [![Figma](https://img.shields.io/badge/🎨-Figma-blue)](https://www.figma.com/design/bdX6kpCPnZu75wxSd9wzCZ/iUpi?t=4fG3uY20kdPZ87qr-0)
- [![Documentacion Back-end](https://img.shields.io/badge/💻-Documentacion_Backend-black)](https://yapa-fintech-back.vercel.app/api/docs/)
- [![Deploy](https://img.shields.io/badge/🚀-Deploy-green)](enlace_deploy)
