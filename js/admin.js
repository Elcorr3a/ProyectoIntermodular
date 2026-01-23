// js/admin.js
export function initAdminPanel() {
  const btnLogin = document.getElementById("admin-login");
  const passwordInput = document.getElementById("admin-password");
  const panel = document.getElementById("admin-panel");
  const tbody = document.getElementById("mensajes-body");

  btnLogin.addEventListener("click", async () => {
    const password = passwordInput.value.trim();
    if (!password) return alert("Introduce la contraseña");

    try {
      const res = await fetch(`http://localhost:3000/admin/mensajes?password=${password}`);
      const data = await res.json();

      if (!data.success) {
        alert("Contraseña incorrecta o error");
        return;
      }

      // Mostrar panel
      panel.style.display = "block";

      // Limpiar tabla
      tbody.innerHTML = "";

      // Llenar tabla
      data.mensajes.forEach(msg => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${msg.nombre}</td>
          <td>${msg.email}</td>
          <td>${msg.mensaje}</td>
          <td>${new Date(msg.fecha).toLocaleString()}</td>
          <td>${msg.estado}</td>
        `;
        tbody.appendChild(tr);
      });

    } catch (error) {
      console.error(error);
      alert("Error conectando con el servidor");
    }
  });
}

// Si quieres que se ejecute automáticamente cuando cargue admin.html
window.addEventListener("load", () => import('../js/admin.js').then(module => module.initAdminPanel()));
