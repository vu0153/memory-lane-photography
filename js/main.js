const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {
  const submitButton = bookingForm.querySelector("button[type='submit']");

  const formMessage = document.createElement("p");
  formMessage.className = "form-message";
  bookingForm.insertBefore(formMessage, submitButton);

  bookingForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullNameInput = bookingForm.querySelector("input[type='text']");
    const phoneInput = bookingForm.querySelector("input[type='tel']");
    const emailInput = bookingForm.querySelector("input[type='email']");
    const serviceInput = bookingForm.querySelector("select");
    const dateInput = bookingForm.querySelector("input[type='date']");
    const messageInput = bookingForm.querySelector("textarea");

    const booking = {
      full_name: fullNameInput.value.trim(),
      phone: phoneInput.value.trim() || null,
      email: emailInput.value.trim() || null,
      service_type: serviceInput.value,
      preferred_date: dateInput.value || null,
      location: null,
      message: messageInput.value.trim() || null,
      status: "new"
    };

    formMessage.textContent = "";
    formMessage.classList.remove("success", "error");

    if (!booking.full_name) {
      formMessage.textContent = "Please enter your name.";
      formMessage.classList.add("error");
      return;
    }

    if (!booking.phone && !booking.email) {
      formMessage.textContent = "Please enter either your phone number or email address.";
      formMessage.classList.add("error");
      return;
    }

    if (!booking.service_type) {
      formMessage.textContent = "Please select a session type.";
      formMessage.classList.add("error");
      return;
    }

    if (typeof supabaseClient === "undefined") {
      formMessage.textContent = "Booking system is not connected yet. Please try again later.";
      formMessage.classList.add("error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const { error } = await supabaseClient
      .from("bookings")
      .insert([booking]);

    submitButton.disabled = false;
    submitButton.textContent = "Send Enquiry";

    if (error) {
      console.error(error);
      formMessage.textContent = "Sorry, something went wrong. Please try again.";
      formMessage.classList.add("error");
      return;
    }

    bookingForm.reset();
    formMessage.textContent = "Thank you. Your enquiry has been sent.";
    formMessage.classList.add("success");
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

const tipsGrid = document.querySelector("#tipsGrid");

const fallbackAdvicePosts = [
  {
    title: "How to look natural in family photos",
    slug: "how-to-look-natural-in-family-photos",
    excerpt: "Simple ways to avoid stiff poses and create photos that feel warm and real.",
    content: "Family photos do not need to feel stiff or overly posed. The best images often come from small movements, natural interaction and simple prompts.",
    thumbnail_url: null
  },
  {
    title: "What to wear for a couple session",
    slug: "what-to-wear-for-a-couple-session",
    excerpt: "Easy outfit tips so you look coordinated without feeling overly dressed.",
    content: "For couple sessions, the best outfits usually feel simple, comfortable and true to your style.",
    thumbnail_url: null
  },
  {
    title: "Choosing the right Adelaide photo location",
    slug: "choosing-the-right-adelaide-photo-location",
    excerpt: "A short guide to choosing a beach, park, garden or city location that suits your story.",
    content: "The right location depends on the feeling you want from your photos.",
    thumbnail_url: null
  }
];

let activeAdvicePosts = [];

async function loadHelpfulAdvicePosts() {
  if (!tipsGrid) {
    return;
  }

  if (typeof supabaseClient === "undefined") {
    activeAdvicePosts = fallbackAdvicePosts;
    renderHelpfulAdvicePosts(activeAdvicePosts);
    return;
  }

  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("title, slug, excerpt, content, category, thumbnail_url, published_at, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error(error);
    activeAdvicePosts = fallbackAdvicePosts;
    renderHelpfulAdvicePosts(activeAdvicePosts);
    return;
  }

  activeAdvicePosts = data && data.length ? data : fallbackAdvicePosts;
  renderHelpfulAdvicePosts(activeAdvicePosts);
}

function renderHelpfulAdvicePosts(posts) {
  tipsGrid.innerHTML = posts.map(function (post, index) {
    const imageMarkup = buildTipImageMarkup(post, index);

    return `
      <article class="tip-card">
        ${imageMarkup}
        <div class="tip-content">
          <h3>${escapeHtml(post.title || "Photography advice")}</h3>
          <p>${escapeHtml(post.excerpt || "Helpful advice before your photography session.")}</p>
          <a href="#tips" class="read-post-link" data-slug="${escapeAttribute(post.slug || "")}">Read More</a>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".read-post-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const slug = link.dataset.slug;
      const post = activeAdvicePosts.find(function (item) {
        return item.slug === slug;
      });

      if (post) {
        openPostModal(post);
      }
    });
  });
}

function buildTipImageMarkup(post, index) {
  const fallbackClasses = ["posing", "prep", "event-tip"];
  const fallbackClass = fallbackClasses[index % fallbackClasses.length];

  if (post.thumbnail_url) {
    return `
      <div class="tip-image tip-image-thumbnail">
        <img src="${escapeAttribute(post.thumbnail_url)}" alt="${escapeAttribute(post.title || "Photography tip thumbnail")}">
      </div>
    `;
  }

  return `<div class="tip-image ${fallbackClass}"></div>`;
}

function createPostModal() {
  const modalStyle = document.createElement("style");

  modalStyle.textContent = `
    .post-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 22px;
      background: rgba(42, 31, 24, 0.66);
      backdrop-filter: blur(8px);
    }

    .post-modal.open {
      display: flex;
    }

    .post-modal-panel {
      width: min(780px, 100%);
      max-height: calc(100vh - 44px);
      overflow: auto;
      background: #fffaf5;
      border-radius: 24px;
      box-shadow: 0 26px 80px rgba(0, 0, 0, 0.34);
    }

    .post-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 18px;
      padding: 26px 28px 18px;
      border-bottom: 1px solid rgba(81, 65, 56, 0.12);
    }

    .post-modal-header h2 {
      margin: 0;
      color: #2d241f;
      font-size: 28px;
    }

    .post-modal-header p {
      margin: 7px 0 0;
      color: #77665b;
      line-height: 1.5;
    }

    .post-modal-close {
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 999px;
      background: rgba(93, 68, 54, 0.1);
      color: #5d4436;
      font-size: 28px;
      line-height: 1;
      cursor: pointer;
    }

    .post-modal-close:hover {
      background: rgba(93, 68, 54, 0.18);
    }

    .post-modal-body {
      padding: 24px 28px 30px;
      color: #2d241f;
      line-height: 1.75;
    }

    .post-modal-body p {
      margin: 0 0 16px;
    }
  `;

  const modal = document.createElement("div");

  modal.className = "post-modal";
  modal.innerHTML = `
    <div class="post-modal-panel" role="dialog" aria-modal="true" aria-labelledby="postModalTitle">
      <div class="post-modal-header">
        <div>
          <p class="eyebrow">Photography Tips</p>
          <h2 id="postModalTitle"></h2>
          <p id="postModalExcerpt"></p>
        </div>

        <button class="post-modal-close" type="button" aria-label="Close article">
          ×
        </button>
      </div>

      <div id="postModalBody" class="post-modal-body"></div>
    </div>
  `;

  document.head.appendChild(modalStyle);
  document.body.appendChild(modal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closePostModal();
    }
  });

  modal.querySelector(".post-modal-close").addEventListener("click", closePostModal);
}

function openPostModal(post) {
  const modal = document.querySelector(".post-modal");
  const title = document.querySelector("#postModalTitle");
  const excerpt = document.querySelector("#postModalExcerpt");
  const body = document.querySelector("#postModalBody");

  if (!modal || !title || !excerpt || !body) {
    return;
  }

  title.textContent = post.title || "Photography Tips";
  excerpt.textContent = post.excerpt || "";
  body.innerHTML = formatPostContent(post.content || post.excerpt || "");

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closePostModal() {
  const modal = document.querySelector(".post-modal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

function formatPostContent(content) {
  return String(content)
    .split(/\n{2,}/)
    .map(function (block) {
      return renderPostContentBlock(block);
    })
    .join("");
}

function renderPostContentBlock(block) {
  const trimmedBlock = block.trim();

  if (!trimmedBlock) {
    return "";
  }

  const headingMatch = trimmedBlock.match(/^##\s+(.+)$/);

  if (headingMatch) {
    return `<h3 class="post-content-heading">${escapeHtml(headingMatch[1])}</h3>`;
  }

  const imageMatch = trimmedBlock.match(/^\[image:(.+?)(?:\|(.+))?\]$/);

  if (imageMatch) {
    const imageUrl = imageMatch[1].trim();
    const caption = imageMatch[2] ? imageMatch[2].trim() : "";

    return `
      <figure class="post-content-image">
        <img src="${escapeAttribute(imageUrl)}" alt="${escapeAttribute(caption || "Photography article image")}">
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  return `<p>${escapeHtml(trimmedBlock).replaceAll("\n", "<br>")}</p>`;
}

document.addEventListener("keydown", function (event) {
  const imageViewer = document.querySelector(".image-viewer");
  const galleryModal = document.querySelector(".gallery-modal");
  const postModal = document.querySelector(".post-modal");

  if (event.key === "Escape") {
    if (postModal && postModal.classList.contains("open")) {
      closePostModal();
      return;
    }

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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

renderGalleryPreview();
createGalleryModal();
createImageViewer();
createPostModal();
loadHelpfulAdvicePosts();