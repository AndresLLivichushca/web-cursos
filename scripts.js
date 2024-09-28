$(document).ready(function() {
    $('.slider').slick({
        dots: true, // Muestra puntos de navegación
        infinite: true, // Habilita el ciclo infinito
        speed: 500, // Velocidad de transición
        fade: true, // Efecto de desvanecimiento
        cssEase: 'linear' // Tipo de animación
    });
});

// Mostrar la sección de inicio por defecto al cargar la página
window.onload = () => {
    mostrarSeccion('inicio');
};

// Añadir eventos a los enlaces de navegación
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace
        const seccionId = this.getAttribute('href').substring(1); // Obtener el ID de la sección
        mostrarSeccion(seccionId); // Mostrar la sección correspondiente
    });
});

// Función para mostrar solo la sección correspondiente
function mostrarSeccion(seccionId) {
    // Obtener todas las secciones
    const secciones = document.querySelectorAll('main > section');
    
    // Ocultar todas las secciones
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    document.getElementById(seccionId).style.display = 'block';
}

// Función para mostrar detalles del curso
function mostrarDetalles(index) {
    const detalles = document.querySelectorAll('.course-details');
    detalles[index].style.display = detalles[index].style.display === 'none' ? 'block' : 'none';
}

// Función para agregar un nuevo curso
function agregarCurso(event) {
    event.preventDefault();

    // Validar los campos de nombre para que no acepten números
    const nombreCurso = document.getElementById('course-name').value;
    const nombreInstructor = document.getElementById('instructor-name').value;

    if (/\d/.test(nombreCurso) || /\d/.test(nombreInstructor)) {
        alert('El nombre del curso y el nombre del instructor no pueden contener números.');
        return;
    }

    // Capturar los demás valores del formulario
    const fechaInicio = document.getElementById('start-date').value;
    const duracion = document.getElementById('duration').value;
    const descripcion = document.getElementById('description').value;

    // Crear un nuevo objeto curso
    const nuevoCurso = {
        nombreCurso,
        nombreInstructor,
        fechaInicio,
        duracion,
        descripcion
    };

    // Almacenar el nuevo curso en localStorage
    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos.push(nuevoCurso);
    localStorage.setItem('cursos', JSON.stringify(cursos));

    // Actualizar la lista de cursos
    mostrarListaCursos();

    // Limpiar el formulario
    document.getElementById('course-form').reset();
}

// Función para mostrar la lista de cursos
function mostrarListaCursos() {
    const cursosSection = document.getElementById('lista-cursos');
    cursosSection.innerHTML = ''; // Limpiar la lista existente
    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    cursos.forEach((curso, index) => {
        const nuevoElemento = document.createElement('li');
        nuevoElemento.innerHTML = `
            <h3>Nombre del curso: ${curso.nombreCurso}</h3>
            <p>Profesor: ${curso.nombreInstructor}</p>
            <p>Fecha de inicio: ${curso.fechaInicio}</p>
            <p>Duración: ${curso.duracion} meses</p>
            <button onclick="mostrarDetalles(${index})">Ver más detalles</button>
            <button onclick="eliminarCurso(${index})">Eliminar curso</button>
            <div class="course-details" style="display:none;">
                <p>Descripción: ${curso.descripcion}</p>
            </div>
        `;
        cursosSection.appendChild(nuevoElemento);
    });
}

// Función para eliminar un curso individualmente
function eliminarCurso(index) {
    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos.splice(index, 1); // Elimina el curso en la posición dada
    localStorage.setItem('cursos', JSON.stringify(cursos)); // Actualiza localStorage
    mostrarListaCursos(); // Actualiza la lista de cursos
}

// Inicializar la lista de cursos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarListaCursos);
document.getElementById('course-form').addEventListener('submit', agregarCurso);
