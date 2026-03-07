# Studia — MVP comparador de programas tech en LATAM

Studia es una web estática construida con **React + Vite + TypeScript + TailwindCSS** para comparar programas de formación tecnológica (cursos, bootcamps, diplomados y maestrías) en LATAM.

## Funcionalidades MVP

- Búsqueda por programa, institución o tags/tecnología
- Filtros por tipo, modalidad, precio, horas y ordenamiento
- Página de detalle del programa
- Captura de leads en formulario con scoring
- Persistencia de leads en `localStorage`
- Exportación de leads a CSV (vista interna y consola)
- Páginas de "Nosotros" e "Instituciones aliadas"
- Rutas con `HashRouter` para compatibilidad con GitHub Pages

## Estructura

```txt
/src
  /components
  /pages
  /data
  /lib
  /types
  /styles
```

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Ejecutar en local

```bash
npm run dev
```

Abre `http://localhost:5173/#/`.

## Build de producción

```bash
npm run build
```

Salida: carpeta `dist/` lista para publicación estática.

## Deploy en GitHub Pages

1. En GitHub, habilita **Pages** usando la rama de publicación (ej. `gh-pages`).
2. Instala dependencias y ejecuta:

```bash
npm run deploy
```

> El proyecto usa `HashRouter`, por lo que no requiere configuración especial de rewrites.

## Gestión de leads

- Vista interna: `#/interno/leads`
- Exportar CSV desde UI: botón "Exportar CSV"
- Exportar CSV desde consola:

```js
window.studiaExportLeads()
```

## Datos mock

- Programas: `src/data/programs.json` (18 programas)
- Instituciones: `src/data/institutions.json` (7 instituciones)
