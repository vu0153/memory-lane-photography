const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Your enquiry has been received. Database connection will be added later.");
  });
}

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".slider-dot");
const previousButton = document.querySelector(".slider-arrow-left");
const nextButton = document.querySelector(".slider-arrow-right");

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  if (slides.length === 0) {
    return;
  }

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach(function (slide, slideIndex) {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  dots.forEach(function (dot, dotIndex) {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

function startSlideTimer() {
  slideTimer = setInterval(nextSlide, 5000);
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  startSlideTimer();
}

if (slides.length > 0 && previousButton && nextButton) {
  startSlideTimer();

  nextButton.addEventListener("click", function () {
    nextSlide();
    resetSlideTimer();
  });

  previousButton.addEventListener("click", function () {
    previousSlide();
    resetSlideTimer();
  });

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showSlide(index);
      resetSlideTimer();
    });
  });
}

const galleryGrid = document.querySelector("#galleryGrid");

function getActiveGalleryCategories() {
  if (typeof galleryConfig === "undefined") {
    return [];
  }

  return galleryConfig.filter(function (group) {
    return group.count > 0;
  });
}

function buildCategoryImages(group) {
  return Array.from({ length: group.count }, function (_, index) {
    const imageNumber = index + 1;

    return {
      category: group.category,
      src: `${group.folder}/${group.prefix}-${imageNumber}.jpg`,
      alt: `${group.category} photography ${imageNumber}`
    };
  });
}

function renderGalleryPreview() {
  if (!galleryGrid) {
    return;
  }

  const categories = getActiveGalleryCategories();

  galleryGrid.innerHTML = categories.map(function (group, index) {
    const coverNumber = group.cover || 1;
    const largeClass = index === 0 ? "large" : "";

    return `
      <article class="gallery-card ${largeClass}" data-category="${group.category}">
        <img src="${group.folder}/${group.prefix}-${coverNumber}.jpg" alt="${group.category} photography preview">
        <div class="gallery-card-content">
          <span>${group.category}</span>
          <small>${group.count} photos</small>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".gallery-card").forEach(function (card) {
    card.addEventListener("click", function () {
      const category = card.dataset.category;
      openGalleryModal(category);
    });
  });
}

function createGalleryModal() {
  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.innerHTML = `
    <div class="gallery-modal-backdrop"></div>

    <div class="gallery-modal-panel">
      <div class="gallery-modal-header">
        <div>
          <p class="eyebrow">Gallery</p>
          <h2 id="galleryModalTitle">Gallery</h2>
        </div>

        <button class="gallery-modal-close" type="button" aria-label="Close gallery">
          ×
        </button>
      </div>

      <div id="galleryModalGrid" class="gallery-modal-grid"></div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".gallery-modal-backdrop").addEventListener("click", closeGalleryModal);
  modal.querySelector(".gallery-modal-close").addEventListener("click", closeGalleryModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeGalleryModal();
    }
  });
}

function openGalleryModal(category) {
  const modal = document.querySelector(".gallery-modal");
  const title = document.querySelector("#galleryModalTitle");
  const grid = document.querySelector("#galleryModalGrid");

  const group = getActiveGalleryCategories().find(function (item) {
    return item.category === category;
  });

  if (!modal || !title || !grid || !group) {
    return;
  }

  const images = buildCategoryImages(group);

  title.textContent = `${group.category} Photography`;

  grid.innerHTML = images.map(function (image) {
    return `
      <article class="gallery-modal-item">
        <img src="${image.src}" alt="${image.alt}">
      </article>
    `;
  }).join("");

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeGalleryModal() {
  const modal = document.querySelector(".gallery-modal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

renderGalleryPreview();
createGalleryModal();