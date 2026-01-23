export function initContactoForm() {
  const form = document.getElementById("form-presupuesto");
  if (!form) return; // Si el formulario no existe, no hacemos nada

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
      } else {
        alert("Error al enviar presupuesto");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  });
}
