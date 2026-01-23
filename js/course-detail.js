export function initCourseDetail(courseId) {
  fetch("courses.json")
    .then(res => res.json())
    .then(courses => {
      // Buscamos por número
      const course = courses.find(c => c.id === Number(courseId));

      if (!course) {
        document.getElementById("app").innerHTML = "<p>Curso no encontrado</p>";
        return;
      }

      document.getElementById("course-title").textContent = course.title;
      document.getElementById("course-description").textContent = course.description;
      document.getElementById("course-hours").textContent = `Duración: ${course.hours} horas`;

      const img = document.getElementById("course-image");
      img.src = course.image;
      img.alt = course.title;
    })
    .catch(err => {
      console.error("Error cargando el curso:", err);
      document.getElementById("app").innerHTML = "<p>Error cargando el curso</p>";
    });
}
