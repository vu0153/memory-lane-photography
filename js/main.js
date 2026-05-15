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

let activeModalImages = [];
let activeImageIndex = 0;

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
      alt: `${group.category} photography ${imageNumber}`,
      imageNumber: imageNumber
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
}

function createImageViewer() {
  const viewer = document.createElement("div");
  viewer.className = "image-viewer";
  viewer.innerHTML = `
    <div class="image-viewer-backdrop"></div>

    <div class="image-viewer-panel">
      <button class="image-viewer-close" type="button" aria-label="Close image">
        ×
      </button>

      <button class="image-viewer-arrow image-viewer-arrow-left" type="button" aria-label="Previous image">
        ‹
      </button>

      <img id="imageViewerImage" src="" alt="">

      <button class="image-viewer-arrow image-viewer-arrow-right" type="button" aria-label="Next image">
        ›
      </button>

      <div class="image-viewer-counter" id="imageViewerCounter"></div>
    </div>
  `;

  document.body.appendChild(viewer);

  viewer.querySelector(".image-viewer-backdrop").addEventListener("click", closeImageViewer);
  viewer.querySelector(".image-viewer-close").addEventListener("click", closeImageViewer);

  viewer.querySelector(".image-viewer-arrow-left").addEventListener("click", function () {
    showLargeImage(activeImageIndex - 1);
  });

  viewer.querySelector(".image-viewer-arrow-right").addEventListener("click", function () {
    showLargeImage(activeImageIndex + 1);
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
  const columnCount = Math.min(images.length, 4);

  activeModalImages = images;

  title.textContent = `${group.category} Photography`;
  grid.style.setProperty("--modal-columns", columnCount);

  grid.innerHTML = images.map(function (image, index) {
    return `
      <article class="gallery-modal-item" data-index="${index}">
        <img src="${image.src}" alt="${image.alt}">
      </article>
    `;
  }).join("");

  document.querySelectorAll(".gallery-modal-item").forEach(function (item) {
    item.addEventListener("click", function () {
      const index = Number(item.dataset.index);
      openImageViewer(index);
    });
  });

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeGalleryModal() {
  const modal = document.querySelector(".gallery-modal");

  if (!modal) {
    return;
  }

  closeImageViewer();

  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

function openImageViewer(index) {
  const viewer = document.querySelector(".image-viewer");

  if (!viewer || activeModalImages.length === 0) {
    return;
  }

  viewer.classList.add("open");
  showLargeImage(index);
}

function showLargeImage(index) {
  const image = document.querySelector("#imageViewerImage");
  const counter = document.querySelector("#imageViewerCounter");

  if (!image || !counter || activeModalImages.length === 0) {
    return;
  }

  activeImageIndex = (index + activeModalImages.length) % activeModalImages.length;

  const activeImage = activeModalImages[activeImageIndex];

  image.src = activeImage.src;
  image.alt = activeImage.alt;
  counter.textContent = `${activeImageIndex + 1} / ${activeModalImages.length}`;
}

function closeImageViewer() {
  const viewer = document.querySelector(".image-viewer");

  if (!viewer) {
    return;
  }

  viewer.classList.remove("open");
}

document.addEventListener("keydown", function (event) {
  const imageViewer = document.querySelector(".image-viewer");
  const galleryModal = document.querySelector(".gallery-modal");

  if (event.key === "Escape") {
    if (imageViewer && imageViewer.classList.contains("open")) {
      closeImageViewer();
      return;
    }

    if (galleryModal && galleryModal.classList.contains("open")) {
      closeGalleryModal();
    }
  }

  if (imageViewer && imageViewer.classList.contains("open")) {
    if (event.key === "ArrowLeft") {
      showLargeImage(activeImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showLargeImage(activeImageIndex + 1);
    }
  }
});

renderGalleryPreview();
createGalleryModal();
createImageViewer();