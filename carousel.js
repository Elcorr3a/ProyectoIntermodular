document.addEventListener('DOMContentLoaded', async () => {
  const wrapper = document.getElementById('carousel-wrapper');

  try {
    const response = await fetch('clientes.json');
    if (!response.ok) throw new Error('No se pudo cargar clientes.json');

    const clientes = await response.json();

    // Crear slides dinámicamente
    clientes.forEach(cliente => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = `"${cliente.mensaje}" – ${cliente.nombre}`;

      slide.appendChild(card);
      wrapper.appendChild(slide);
    });

    // Inicializar Swiper después de crear los slides
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 60,
      loop: true,
      centeredSlides: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: { 900: { slidesPerView: 3 }, 600: { slidesPerView: 2 }, 0: { slidesPerView: 1 } },
    });

  } catch (err) {
    console.error('Error cargando clientes:', err);
    wrapper.innerHTML = '<p style="color:red;">No se pudieron cargar los clientes.</p>';
  }
});
