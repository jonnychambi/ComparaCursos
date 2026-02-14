# ComparaCursos

Web para comparar cursos de tecnología enfocados en el mercado latinoamericano, ahora integrada con MySQL.

## Requisitos

- Node.js 18+
- MySQL 8+
- Cliente `mysql` disponible en terminal

## Configuración

1. Exporta variables de entorno (ejemplo):

```bash
export PORT=3000
export DB_HOST=127.0.0.1
export DB_PORT=3306
export DB_USER=root
export DB_PASSWORD=tu_password
export DB_NAME=comparacursos
```

2. Crea base y datos de ejemplo:

```bash
mysql -u root -p < db/schema.sql
```

3. Ejecuta la app:

```bash
npm start
```

Abre: `http://localhost:3000`

## Endpoints API

- `GET /api/health` estado app + db
- `GET /api/courses` lista cursos
- `GET /api/courses/:id` detalle de un curso
