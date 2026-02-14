CREATE DATABASE IF NOT EXISTS comparacursos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE comparacursos;

CREATE TABLE IF NOT EXISTS cursos (
  id VARCHAR(80) PRIMARY KEY,
  nombre VARCHAR(180) NOT NULL,
  contenido TEXT NOT NULL,
  docente VARCHAR(120) NOT NULL,
  horas INT NOT NULL,
  modalidad ENUM('Sincrono', 'Asincrono', 'Hibrido') NOT NULL,
  institucion VARCHAR(140) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO cursos (id, nombre, contenido, docente, horas, modalidad, institucion, precio, descripcion) VALUES
('ds-bootcamp-latam', 'Data Science Bootcamp LATAM', 'Python, estadística aplicada, machine learning, visualización y proyecto final con datos regionales.', 'Dra. Camila Rojas', 120, 'Hibrido', 'Academia Andina Tech', 620, 'Programa intensivo para perfiles junior e intermedios, orientado a resolver casos de negocio de banca, retail y logística en Latinoamérica.'),
('frontend-react-practico', 'Frontend React Práctico', 'HTML/CSS moderno, JavaScript, React, testing frontend y despliegue en la nube.', 'Ing. Valentina Pérez', 80, 'Asincrono', 'CódigoAbierto School', 290, 'Curso orientado a empleabilidad para crear aplicaciones web modernas con buenas prácticas y portafolio profesional.'),
('ciberseguridad-empresas', 'Ciberseguridad para Empresas', 'Fundamentos de seguridad, hardening, gestión de incidentes, normativas y laboratorios prácticos.', 'MSc. Fernando López', 64, 'Sincrono', 'Instituto TecnoSur', 540, 'Capacitación enfocada en equipos de TI que requieren proteger infraestructuras y datos en empresas de la región.'),
('ia-generativa-producto', 'IA Generativa para Producto Digital', 'Prompt engineering, APIs de IA, automatización de flujos y diseño de funcionalidades con IA.', 'Lic. Andrea Méndez', 48, 'Hibrido', 'Digital Makers LATAM', 450, 'Curso para profesionales de producto y desarrollo que buscan implementar IA generativa en soluciones reales.'),
('backend-node-scalable', 'Backend Escalable con Node.js', 'Arquitectura backend, APIs REST, bases de datos SQL/NoSQL, autenticación y observabilidad.', 'Ing. José Martínez', 96, 'Sincrono', 'Campus Dev Pro', 510, 'Formación técnica orientada a construir servicios robustos con enfoque en escalabilidad y buenas prácticas.')
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  contenido = VALUES(contenido),
  docente = VALUES(docente),
  horas = VALUES(horas),
  modalidad = VALUES(modalidad),
  institucion = VALUES(institucion),
  precio = VALUES(precio),
  descripcion = VALUES(descripcion);
