# IUPI Ahorro e Inversiones
![Logo](./client/public/Logo%20azul%20completo.png)


## Industria o Rubro
La industria fintech se enfoca en la innovación tecnológica aplicada a los servicios financieros. Este proyecto se enmarca en este sector, ofreciendo soluciones digitales que facilitan el ahorro y la inversión, mejorando la inclusión financiera y proporcionando herramientas avanzadas para la gestión del patrimonio personal.

## Breve Descripción del Proyecto
Incluir financieramente a la población argentina en un contexto económico complejo
y cambiante, brindando herramientas que faciliten el ahorro e inversión a personas
de diferentes edades y niveles de experiencia.
iUpi es una aplicación financiera diseñada para empoderar a los usuarios en la
gestión y crecimiento de su patrimonio. La plataforma permite definir objetivos
personales, como la planificación de unas vacaciones, la compra de bienes como un
automóvil o un departamento o la financiación de proyectos a largo plazo. Basándose
en estos objetivos, iUpi asigna un portafolio de inversiones personalizado, adaptado
al perfil del usuario y a las dinámicas del mercado. Además, la app aprende del
comportamiento de cada usuario y ofrece recomendaciones de inversión cada vez
más precisas y alineadas con sus metas.



## Colaboradores
| Foto | Nombre | Rol | LinkedIn | GitHub |
|------|--------|-----|----------|--------|
| ![Isaac Urdaneta](https://avatars.githubusercontent.com/IducDev?s=100) | Isaac Urdaneta | Frontend Developer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/isaac-urdaneta) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/IducDev) |
| ![Raydberg Gabriel](https://avatars.githubusercontent.com/Raydberg?s=100) | Raydberg Gabriel | Fullstack Developer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/raydbergchuquival/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/Raydberg) |
| ![Bárbara Espinola](https://avatars.githubusercontent.com/BaEsp1?s=100) | Bárbara Espinola | Fullstack Developer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/baesp/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/BaEsp1) |
| ![Matias Javier Paredes](https://avatars.githubusercontent.com/mjParedes?s=100) | Matias Javier Paredes | Fullstack Developer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matias-paredes-m8j5/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/mjParedes) |
| ![Jefferson Serrano](https://avatars.githubusercontent.com/jserranom27?s=100) | Jefferson Serrano | Data Science | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jefferson-serrano-mendez/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/jserranom27) |
| ![Walkiria Arteaga](https://avatars.githubusercontent.com/wlkrtg?s=100) | Walkiria Arteaga | UI/UX Designer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/walkiria-arteaga-10501925b/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/wlkrtg) |
| ![Anthony Parra](https://avatars.githubusercontent.com/An7h0ny1?s=100) | Anthony Parra | Backend Developer | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anthony-se/) | [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&logo=github&logoColor=white)](https://github.com/An7h0ny1) |

## Instrucciones para Instalar y Ejecutar el Proyecto Localmente

## Instrucciones para Instalar y Ejecutar el Proyecto Localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/No-Country-simulation/h4-04-fintech.git
   ```

2. **Instalar dependencias:**
   - **Backend:**
     ```bash
     cd server
     ./mvnw install
     ```
   - **Frontend:**
     ```bash
     cd client
     npm install
     ```
   - **Model AI:**
     ```bash
       cd model-ia
       pip install -r requirements.txt
      ```

3. **Configurar las variables de entorno:**
   - Crear un archivo `.env` en la carpeta `server` con las credenciales para la base de datos.
   - Crear un archivo `.env.local` en la carpeta `client` con las variables necesarias para el frontend.

4. **Ejecutar el proyecto:**
   - **Backend:**
     ```bash
     cd server
     ./mvnw spring-boot:run
     ```
   - **Frontend:**
     ```bash
     cd client
     npm run dev
     ```
   - **Model AI**
      ```bash
      cd model-ia
      python manage.py runserver
      ```

5. **Abrir el proyecto:**
   - Backend API estará disponible en `http://localhost:8080`.
   - Frontend estará disponible en `http://localhost:3000`.
   - Model AI estará disponible en `http://127.0.0.1:8000/api`.


## Tecnologías Utilizadas
### Backend
- ![Java](https://img.shields.io/badge/Java-%23ED8B00.svg?&logo=java&logoColor=white) **Java**
- ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?&logo=spring-boot&logoColor=white) **Spring Boot**
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23336791.svg?&logo=postgresql&logoColor=white) **PostgreSQL / MySQL**
- ![Hibernate](https://img.shields.io/badge/Hibernate-%23958B8B.svg?&logo=hibernate&logoColor=white) **Hibernate ORM**
- ![Maven](https://img.shields.io/badge/Maven-%23C71A36.svg?&logo=apache-maven&logoColor=white) **Maven**
- ![Lombok](https://img.shields.io/badge/Lombok-%230A0A0A.svg?&logo=lombok&logoColor=white) **Lombok**
- ![Swagger](https://img.shields.io/badge/Swagger-%2385EA2D.svg?&logo=swagger&logoColor=white) **Swagger**
- ![Spring Security](https://img.shields.io/badge/Spring%20Security-%236DB33F.svg?&logo=spring-security&logoColor=white) **Spring Security**
- ![JWT](https://img.shields.io/badge/JWT-%23000000.svg?&logo=JSON%20web%20tokens&logoColor=white) **JWT**
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-%23000000.svg?&logo=cloudinary&logoColor=white) **Cloudinary**
- ![OAuth2](https://img.shields.io/badge/OAuth2-%23000000.svg?&logo=oauth&logoColor=white) **OAuth2**

### Model AI
- ![Python](https://img.shields.io/badge/Python-%233776AB.svg?&logo=python&logoColor=white) **Python**
- ![Django](https://img.shields.io/badge/Django-%23092E20.svg?&logo=django&logoColor=white) **Django**
- ![Scikit-learn](https://img.shields.io/badge/Scikit%20Learn-%23F7931E.svg?&logo=scikit-learn&logoColor=white) **Scikit-learn**
- ![Pandas](https://img.shields.io/badge/Pandas-%23150458.svg?&logo=pandas&logoColor=white) **Pandas**
- ![Numpy](https://img.shields.io/badge/Numpy-%23013243.svg?&logo=numpy&logoColor=white) **Numpy**
- ![Jupyter](https://img.shields.io/badge/Jupyter-%23F37626.svg?&logo=jupyter&logoColor=white) **Jupyter**



### Frontend
- ![React](https://img.shields.io/badge/React-%2361DAFB.svg?&logo=react&logoColor=white) **React (Next.js)**
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?&logo=typescript&logoColor=white) **TypeScript**
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?&logo=tailwind-css&logoColor=white) **Tailwind CSS**
- ![Zustand](https://img.shields.io/badge/Zustand-%23000000.svg?&logo=zustand&logoColor=white) **Zustand**



## Enlaces Relevantes
- [![Documentación de calidad](https://img.shields.io/badge/📄-Documentación-blue)](enlace_documentacion)
- [![Figma](https://img.shields.io/badge/🎨-Figma-blue)](https://www.figma.com/design/bdX6kpCPnZu75wxSd9wzCZ/iUpi?t=4fG3uY20kdPZ87qr-0)
- [![Repositorio GitHub](https://img.shields.io/badge/💻-Repositorio_GitHub-black)](https://github.com/No-Country-simulation/h4-04-fintech)
- [![Deploy](https://img.shields.io/badge/🚀-Deploy-green)](enlace_deploy)
- [![Video](https://img.shields.io/badge/🎥-Video-tutorial-red)](https://iupi-six.vercel.app)
