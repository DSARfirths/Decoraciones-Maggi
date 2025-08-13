document.addEventListener("DOMContentLoaded", function () {
  // --- 1. CARGADOR DE COMPONENTES ---
  const loadComponent = (url, elementId) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar: ${url}`);
        }
        return response.text();
      })
      .then((data) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = data;
        }
      })
      .catch((error) => console.error(error));
  };

  // --- 2. INICIALIZACIÓN DE FUNCIONALIDADES ---
  const initializeMobileMenu = () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mainMenu = document.getElementById("main-menu");
    if (menuToggle && mainMenu) {
      menuToggle.addEventListener("click", () => {
        mainMenu.classList.toggle("is-active");
        menuToggle.classList.toggle("is-active");
      });
      const dropdownToggle = document.querySelector(".dropdown-toggle");
      if (dropdownToggle) {
        dropdownToggle.addEventListener("click", (event) => {
          if (window.innerWidth <= 992) {
            event.preventDefault();
            dropdownToggle.parentElement.classList.toggle("is-open");
          }
        });
      }
    }
  };

  const updateCopyrightYear = () => {
    const yearSpan = document.getElementById("copyright-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  };

  // --- NUEVA FUNCIÓN PARA EL LIGHTBOX ---
  const initializeLightbox = () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeButton = document.querySelector(".lightbox-close");
    const viewButtons = document.querySelectorAll(".view-image-button");

    if (!lightbox || !lightboxImg || !closeButton) return;

    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const galleryItem = button.closest(".gallery-item");
        const imageSrc = galleryItem.querySelector("img").src;
        lightboxImg.src = imageSrc;
        lightbox.classList.add("is-visible");
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("is-visible");
    };

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      // Cierra solo si se hace clic en el fondo, no en la imagen
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  };

  // --- 3. EJECUCIÓN ---
  loadComponent("header.html", "main-header-placeholder").then(() => {
    initializeMobileMenu();
  });

  loadComponent("footer.html", "main-footer-placeholder").then(() => {
    updateCopyrightYear();
  });

  // Se inicializa el lightbox después de que todo el DOM esté listo
  initializeLightbox();
});
