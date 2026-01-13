function initCourses() {
  const container = document.getElementById("courses-container");
  if (!container) return;

  fetch("courses.json")
    .then(res => res.json())
    .then(data => pintarCursos(data))
    .catch(err => console.error("Error cargando cursos:", err));
}
function pintarCursos(courses) {
  const container = document.getElementById("courses-container");
  container.innerHTML = "";

  courses.forEach(course => {
    const div = document.createElement("div");
    div.className = "course-item";

div.innerHTML = `
  <img class="course-image" src="${course.image}" alt="${course.title}" loading="lazy">
  <div>
    <h3 class="course-title">${course.title}</h3>
    <p class="course-description">${course.description}</p>
    <p class="course-hours">${course.hours}</p>
    <a href="/courses/${course.id}" class="course-button">Más información</a>
  </div>
`;

    container.appendChild(div);
  });
}
