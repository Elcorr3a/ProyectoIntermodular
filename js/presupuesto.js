// js/presupuesto.js

export function initPresupuestoModal() {
  const btn = document.querySelector(".cta-button"); // Botón Home
  const modal = document.getElementById("modal-presupuesto");
  const close = document.getElementById("modal-close");
  const form = document.getElementById("form-presupuesto-modal");

  if (!btn || !modal || !form || !close) return;

  // Abrir modal al hacer clic
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el hash cambie
    modal.style.display = "flex";
  });

  // Cerrar modal
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar modal al clicar fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Enviar formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      mensaje: form.mensaje.value
    };

    try {
      const res = await fetch("http://localhost:3000/presupuestos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {
        alert("Presupuesto enviado correctamente");
        form.reset();
        modal.style.display = "none"; // Solo cerrar el modal
        window.location.hash = "#/";   // Volver al Home
      } else {
        alert("Error al enviar presupuesto");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  });
}
