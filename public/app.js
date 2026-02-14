const state = {
  courses: [],
  loaded: false
};

async function fetchCourses() {
  const response = await fetch('/api/courses');
  if (!response.ok) {
    throw new Error('No se pudieron cargar los cursos');
  }
  return response.json();
}

async function fetchCourseById(id) {
  const response = await fetch(`/api/courses/${encodeURIComponent(id)}`);
  if (!response.ok) {
    throw new Error('Curso no encontrado');
  }
  return response.json();
}

function formatPrice(value) {
  return new Intl.NumberFormat('es-419', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number(value));
}

function buildCourseCard(course) {
  return `
    <article class="course-card">
      <h3>${course.nombre}</h3>
      <p>${course.descripcion}</p>
      <div class="tags">
        <span class="tag">${course.modalidad}</span>
        <span class="tag">${course.institucion}</span>
        <span class="tag">${course.horas} horas</span>
      </div>
      <div class="details-grid">
        <div class="detail-item"><small>Contenido</small><strong>${course.contenido}</strong></div>
        <div class="detail-item"><small>Docente</small><strong>${course.docente}</strong></div>
        <div class="detail-item"><small>Precio</small><strong class="price">${formatPrice(course.precio)}</strong></div>
      </div>
      <div class="course-actions">
        <a href="course.html?id=${course.id}">Ver detalle del curso</a>
      </div>
    </article>
  `;
}

function renderCourses(items) {
  const list = document.getElementById('course-list');
  const count = document.getElementById('result-count');
  if (!list || !count) return;

  if (!items.length) {
    list.innerHTML = '<p>No encontramos cursos con esos criterios. Prueba otro filtro.</p>';
    count.textContent = '0 resultados';
    return;
  }

  list.innerHTML = items.map(buildCourseCard).join('');
  count.textContent = `${items.length} resultado${items.length === 1 ? '' : 's'}`;
}

function mountFilters() {
  const institucionFilter = document.getElementById('institucion-filter');
  if (!institucionFilter) return;

  const instituciones = [...new Set(state.courses.map((course) => course.institucion))];
  institucionFilter.innerHTML = '<option value="">Todas</option>';

  instituciones.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    institucionFilter.appendChild(option);
  });
}

function applyFilters() {
  const searchInput = document.getElementById('search-input');
  const modalidadFilter = document.getElementById('modalidad-filter');
  const institucionFilter = document.getElementById('institucion-filter');
  const precioFilter = document.getElementById('precio-filter');
  const ordenFilter = document.getElementById('orden-filter');

  const searchText = searchInput.value.trim().toLowerCase();
  const modalidad = modalidadFilter.value;
  const institucion = institucionFilter.value;
  const maxPrecio = Number(precioFilter.value);

  let filtered = [...state.courses].filter((course) => {
    const fullText = `${course.nombre} ${course.contenido} ${course.docente} ${course.institucion}`.toLowerCase();
    const matchesSearch = !searchText || fullText.includes(searchText);
    const matchesModalidad = !modalidad || course.modalidad === modalidad;
    const matchesInstitucion = !institucion || course.institucion === institucion;
    const matchesPrecio = !maxPrecio || Number(course.precio) <= maxPrecio;
    return matchesSearch && matchesModalidad && matchesInstitucion && matchesPrecio;
  });

  switch (ordenFilter.value) {
    case 'precio-asc':
      filtered.sort((a, b) => Number(a.precio) - Number(b.precio));
      break;
    case 'precio-desc':
      filtered.sort((a, b) => Number(b.precio) - Number(a.precio));
      break;
    case 'horas-desc':
      filtered.sort((a, b) => Number(b.horas) - Number(a.horas));
      break;
    default:
      break;
  }

  renderCourses(filtered);
}

function setLoading(message) {
  const list = document.getElementById('course-list');
  if (list) {
    list.innerHTML = `<p>${message}</p>`;
  }
}

async function initListingPage() {
  const form = document.getElementById('search-form');
  if (!form) return;

  setLoading('Cargando cursos desde MySQL...');

  try {
    state.courses = await fetchCourses();
    state.loaded = true;
    mountFilters();
    renderCourses(state.courses);
  } catch (error) {
    setLoading('No fue posible cargar los cursos. Revisa la conexión a base de datos.');
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters();
  });

  ['modalidad-filter', 'institucion-filter', 'precio-filter', 'orden-filter'].forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener('input', applyFilters);
    input.addEventListener('change', applyFilters);
  });
}

async function initDetailPage() {
  const detailTarget = document.getElementById('course-detail');
  if (!detailTarget) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    detailTarget.innerHTML = '<h1>Curso no encontrado</h1><p>Falta el parámetro de curso.</p>';
    return;
  }

  detailTarget.innerHTML = '<p>Cargando detalle del curso...</p>';

  try {
    const course = await fetchCourseById(id);
    detailTarget.innerHTML = `
      <h1>${course.nombre}</h1>
      <p>${course.descripcion}</p>
      <div class="details-grid">
        <div class="detail-item"><small>Contenido</small><strong>${course.contenido}</strong></div>
        <div class="detail-item"><small>Docente</small><strong>${course.docente}</strong></div>
        <div class="detail-item"><small>Horas del curso</small><strong>${course.horas} horas</strong></div>
        <div class="detail-item"><small>Modalidad</small><strong>${course.modalidad}</strong></div>
        <div class="detail-item"><small>Institución</small><strong>${course.institucion}</strong></div>
        <div class="detail-item"><small>Precio</small><strong class="price">${formatPrice(course.precio)}</strong></div>
      </div>
    `;
  } catch (error) {
    detailTarget.innerHTML = '<h1>Curso no encontrado</h1><p>Regresa al listado para seleccionar un curso válido.</p>';
  }
}

initListingPage();
initDetailPage();
