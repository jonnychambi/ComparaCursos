const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { execFile } = require('child_process');

const PORT = Number(process.env.PORT || 3000);
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = String(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'comparacursos';

const PUBLIC_DIR = path.join(__dirname, 'public');

function getContentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function runMysqlQuery(sql) {
  return new Promise((resolve, reject) => {
    const args = [
      `-h${DB_HOST}`,
      `-P${DB_PORT}`,
      `-u${DB_USER}`,
      `-D${DB_NAME}`,
      '--batch',
      '--raw',
      '--skip-column-names',
      '-e',
      sql
    ];

    const env = { ...process.env, MYSQL_PWD: DB_PASSWORD };

    execFile('mysql', args, { env, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }
      resolve(stdout);
    });
  });
}

function parseCourses(output) {
  if (!output.trim()) return [];
  return output
    .trim()
    .split('\n')
    .map((line) => {
      const [id, nombre, contenido, docente, horas, modalidad, institucion, precio, descripcion] = line.split('\t');
      return {
        id,
        nombre,
        contenido,
        docente,
        horas: Number(horas),
        modalidad,
        institucion,
        precio: Number(precio),
        descripcion
      };
    });
}

async function handleApi(req, res, pathname) {
  if (pathname === '/api/health') {
    try {
      await runMysqlQuery('SELECT 1;');
      sendJson(res, 200, { ok: true, db: 'connected' });
    } catch (error) {
      sendJson(res, 500, { ok: false, db: 'disconnected', error: error.message });
    }
    return true;
  }

  if (pathname === '/api/courses') {
    try {
      const sql = `SELECT id, nombre, contenido, docente, horas, modalidad, institucion, precio, descripcion FROM cursos ORDER BY nombre ASC;`;
      const output = await runMysqlQuery(sql);
      sendJson(res, 200, parseCourses(output));
    } catch (error) {
      sendJson(res, 500, { message: 'Error consultando cursos', error: error.message });
    }
    return true;
  }

  if (pathname.startsWith('/api/courses/')) {
    const id = decodeURIComponent(pathname.replace('/api/courses/', ''));
    if (!id) {
      sendJson(res, 400, { message: 'ID inválido' });
      return true;
    }

    try {
      const safeId = id.replace(/'/g, "''");
      const sql = `SELECT id, nombre, contenido, docente, horas, modalidad, institucion, precio, descripcion FROM cursos WHERE id='${safeId}' LIMIT 1;`;
      const output = await runMysqlQuery(sql);
      const courses = parseCourses(output);
      if (!courses.length) {
        sendJson(res, 404, { message: 'Curso no encontrado' });
        return true;
      }
      sendJson(res, 200, courses[0]);
    } catch (error) {
      sendJson(res, 500, { message: 'Error consultando curso', error: error.message });
    }
    return true;
  }

  return false;
}

function serveStatic(res, pathname) {
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error interno');
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;

  if (req.method === 'GET' && pathname.startsWith('/api/')) {
    const handled = await handleApi(req, res, pathname);
    if (handled) return;
  }

  if (req.method === 'GET') {
    serveStatic(res, pathname);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ message: 'Método no permitido' }));
});

server.listen(PORT, () => {
  console.log(`ComparaCursos ejecutándose en http://localhost:${PORT}`);
});
