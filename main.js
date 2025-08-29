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

  const initializeHeaderScrollEffect = () => {
    const header = document.querySelector(".main-header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // Umbral de píxeles para empezar a ocultar

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Aplica el efecto de vidrio cuando se ha hecho scroll
      if (currentScrollY > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }

      // Oculta al bajar, muestra al subir (solo después de pasar el umbral)
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        // Scroll hacia abajo
        header.classList.add("is-hidden");
      } else {
        // Scroll hacia arriba
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutar al cargar por si la página no está en el tope
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
  const initializeHeroCarousel = () => {
    if (document.querySelector('.hero-swiper') && typeof Swiper !== 'undefined') {
      new Swiper(".hero-swiper", {
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  };

  const initializeVideoCarousel = () => {
    const videoShowcase = document.querySelector('.video-showcase');
    if (!videoShowcase || typeof Swiper === 'undefined') return;

    const videoSwiper = new Swiper(".video-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    const videos = videoShowcase.querySelectorAll('.tiktok-video');

    const handlePlayback = (action) => {
      if (action === 'play') {
        const activeSlide = videoSwiper.slides[videoSwiper.activeIndex];
        const activeVideo = activeSlide.querySelector('.tiktok-video');
        if (activeVideo) {
          activeVideo.play().catch(() => {});
        }
      } else { // 'pause'
        videos.forEach(video => video.pause());
      }
    };

    videoSwiper.on('slideChange', () => {
      videos.forEach(video => {
        video.pause();
        if (!video.muted) {
          video.muted = true;
          const icon = video.closest('.video-card').querySelector('.unmute-button i');
          if (icon) {
            icon.classList.remove('fa-volume-high');
            icon.classList.add('fa-volume-xmark');
          }
        }
      });
      handlePlayback('play');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        handlePlayback(entry.isIntersecting ? 'play' : 'pause');
      });
    }, { threshold: 0.5 });

    observer.observe(videoShowcase);

    document.querySelectorAll('.unmute-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const video = button.closest('.video-card').querySelector('.tiktok-video');
        const icon = button.querySelector('i');
        if (!video || !icon) return;

        video.muted = !video.muted;

        if (video.muted) {
          icon.classList.remove('fa-volume-high');
          icon.classList.add('fa-volume-xmark');
        } else {
          icon.classList.remove('fa-volume-xmark');
          icon.classList.add('fa-volume-high');
          video.play().catch(() => {});
        }
      });
    });
  };

  // --- 3. EJECUCIÓN ---
  loadComponent("header.html", "main-header-placeholder").then(() => {
    initializeMobileMenu();
    initializeHeaderScrollEffect();
  });

  loadComponent("footer.html", "main-footer-placeholder").then(() => {
    updateCopyrightYear();
  });

  // Se inicializa el lightbox después de que todo el DOM esté listo
  initializeLightbox();
  initializeHeroCarousel();
  initializeVideoCarousel();
});
