// js/carousel.js
export function initCarousel() {
  const wrapper = document.getElementById("carousel-wrapper");
  if (!wrapper) return; // Evita errores si el HTML aún no está

  // Ejemplo de clientes (puedes cargar desde JSON si quieres)
  const clientes = [
    { name: "Cliente 1", text: "Opinión del cliente 1" },
    { name: "Cliente 2", text: "Opinión del cliente 2" },
    { name: "Cliente 3", text: "Opinión del cliente 3" }
  ];

  wrapper.innerHTML = "";

  clientes.forEach(cliente => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="card">
        <h4>${cliente.name}</h4>
        <p>${cliente.text}</p>
      </div>
    `;
    wrapper.appendChild(slide);
  });

  // Inicializar Swiper
  new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    loop: true
  });
}
