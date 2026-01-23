export function initCarousel() {
  const wrapper = document.getElementById("carousel-wrapper");
  if (!wrapper) {
    console.error("No existe carousel-wrapper");
    return;
  }

  fetch("http://localhost:3000/api/clientes")
    .then(res => res.json())
    .then(clientes => {
      wrapper.innerHTML = "";

      clientes.forEach(c => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <div class="card">
            <p class="client-message">"${c.mensaje}"</p>
            <p class="client-name">— ${c.nombre}</p>
          </div>
        `;
        wrapper.appendChild(slide);
      });

      new Swiper(".mySwiper", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    })
    .catch(err => console.error("Error cargando clientes:", err));

    // 👇 ENVÍO DEL FORMULARIO
  document.getElementById("send-comment").addEventListener("click", () => {
    const nombre = document.getElementById("client-name").value.trim();
    const mensaje = document.getElementById("client-message").value.trim();

    if (!nombre || !mensaje) {
      alert("Rellena todos los campos");
      return;
    }

    fetch("http://localhost:3000/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, mensaje })
    })
      .then(res => res.json())
      .then(() => {
        document.getElementById("client-name").value = "";
        document.getElementById("client-message").value = "";
        initCarousel(); // recargar carrusel
      });
  });
}
