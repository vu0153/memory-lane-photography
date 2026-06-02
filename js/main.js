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


const servicesHeroSlider = document.querySelector("#servicesHeroSlider");

const fallbackServicesHeroImages = [
  {
    image_url: "assets/images/hero-1.jpg",
    alt_text: "Family photography session in Adelaide",
    sort_order: 1
  },
  {
    image_url: "assets/images/hero-2.jpg",
    alt_text: "Couple photography session in Adelaide",
    sort_order: 2
  },
  {
    image_url: "assets/images/hero-3.jpg",
    alt_text: "Friends and memory photography session",
    sort_order: 3
  },
  {
    image_url: "assets/images/hero-4.jpg",
    alt_text: "Small event photography in Adelaide",
    sort_order: 4
  }
];

let servicesHeroSlides = [];
let servicesHeroDots = [];
let servicesHeroCurrentSlide = 0;
let servicesHeroTimer = null;

async function loadServicesHeroImages() {
  if (!servicesHeroSlider) {
    return;
  }

  if (typeof supabaseClient === "undefined") {
    renderServicesHeroSlider(fallbackServicesHeroImages);
    return;
  }

  const { data, error } = await supabaseClient
    .from("hero_images")
    .select("id, image_url, storage_path, alt_text, sort_order, is_active, created_at")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    renderServicesHeroSlider(fallbackServicesHeroImages);
    return;
  }

  const heroImages = data && data.length ? data : fallbackServicesHeroImages;

  renderServicesHeroSlider(heroImages);
}

function renderServicesHeroSlider(images) {
  if (!servicesHeroSlider || !images.length) {
    return;
  }

  clearInterval(servicesHeroTimer);
  servicesHeroTimer = null;
  servicesHeroCurrentSlide = 0;

  const slidesMarkup = images.map(function (image, index) {
    return `
      <div class="services-hero-slide ${index === 0 ? "active" : ""}">
        <img src="${escapeAttribute(image.image_url)}" alt="${escapeAttribute(image.alt_text || "Memory Lane photography feature image")}">
      </div>
    `;
  }).join("");

  const dotsMarkup = images.length > 1
    ? `
      <div class="services-slider-dots" aria-label="Featured image position">
        ${images.map(function (_, index) {
          return `
            <button class="services-slider-dot ${index === 0 ? "active" : ""}" type="button" aria-label="Go to featured image ${index + 1}"></button>
          `;
        }).join("")}
      </div>
    `
    : "";

  servicesHeroSlider.innerHTML = slidesMarkup + dotsMarkup;

  servicesHeroSlides = Array.from(servicesHeroSlider.querySelectorAll(".services-hero-slide"));
  servicesHeroDots = Array.from(servicesHeroSlider.querySelectorAll(".services-slider-dot"));

  servicesHeroDots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showServicesHeroSlide(index);
      resetServicesHeroTimer();
    });
  });

  startServicesHeroTimer();
}

function showServicesHeroSlide(index) {
  if (servicesHeroSlides.length === 0) {
    return;
  }

  servicesHeroCurrentSlide = (index + servicesHeroSlides.length) % servicesHeroSlides.length;

  servicesHeroSlides.forEach(function (slide, slideIndex) {
    slide.classList.toggle("active", slideIndex === servicesHeroCurrentSlide);
  });

  servicesHeroDots.forEach(function (dot, dotIndex) {
    dot.classList.toggle("active", dotIndex === servicesHeroCurrentSlide);
  });
}

function nextServicesHeroSlide() {
  showServicesHeroSlide(servicesHeroCurrentSlide + 1);
}

function startServicesHeroTimer() {
  clearInterval(servicesHeroTimer);

  if (servicesHeroSlides.length > 1) {
    servicesHeroTimer = setInterval(nextServicesHeroSlide, 5000);
  }
}

function resetServicesHeroTimer() {
  clearInterval(servicesHeroTimer);
  startServicesHeroTimer();
}

const galleryGrid = document.querySelector("#galleryGrid");

const galleryCategoryOrder = [
  "Family",
  "Couple",
  "Friends",
  "Portrait",
  "Event"
];

const fallbackGalleryImages = [
  {
    category: "Family",
    image_url: "assets/images/gallery/family/family-1.jpg",
    alt_text: "Family photography preview",
    caption: "Family",
    sort_order: 1,
    is_cover: true
  },
  {
    category: "Family",
    image_url: "assets/images/gallery/family/family-2.jpg",
    alt_text: "Family photography 2",
    caption: "Family",
    sort_order: 2,
    is_cover: false
  },
  {
    category: "Family",
    image_url: "assets/images/gallery/family/family-3.jpg",
    alt_text: "Family photography 3",
    caption: "Family",
    sort_order: 3,
    is_cover: false
  },
  {
    category: "Couple",
    image_url: "assets/images/gallery/couple/couple-1.jpg",
    alt_text: "Couple photography preview",
    caption: "Couple",
    sort_order: 1,
    is_cover: true
  },
  {
    category: "Couple",
    image_url: "assets/images/gallery/couple/couple-2.jpg",
    alt_text: "Couple photography 2",
    caption: "Couple",
    sort_order: 2,
    is_cover: false
  },
  {
    category: "Couple",
    image_url: "assets/images/gallery/couple/couple-3.jpg",
    alt_text: "Couple photography 3",
    caption: "Couple",
    sort_order: 3,
    is_cover: false
  },
  {
    category: "Friends",
    image_url: "assets/images/gallery/friends/friends-1.jpg",
    alt_text: "Friends photography preview",
    caption: "Friends",
    sort_order: 1,
    is_cover: true
  },
  {
    category: "Friends",
    image_url: "assets/images/gallery/friends/friends-2.jpg",
    alt_text: "Friends photography 2",
    caption: "Friends",
    sort_order: 2,
    is_cover: false
  },
  {
    category: "Friends",
    image_url: "assets/images/gallery/friends/friends-3.jpg",
    alt_text: "Friends photography 3",
    caption: "Friends",
    sort_order: 3,
    is_cover: false
  },
  {
    category: "Portrait",
    image_url: "assets/images/gallery/portrait/portrait-1.jpg",
    alt_text: "Portrait photography preview",
    caption: "Portrait",
    sort_order: 1,
    is_cover: true
  },
  {
    category: "Portrait",
    image_url: "assets/images/gallery/portrait/portrait-2.jpg",
    alt_text: "Portrait photography 2",
    caption: "Portrait",
    sort_order: 2,
    is_cover: false
  },
  {
    category: "Portrait",
    image_url: "assets/images/gallery/portrait/portrait-3.jpg",
    alt_text: "Portrait photography 3",
    caption: "Portrait",
    sort_order: 3,
    is_cover: false
  },
  {
    category: "Event",
    image_url: "assets/images/gallery/event/event-1.jpg",
    alt_text: "Event photography preview",
    caption: "Event",
    sort_order: 1,
    is_cover: true
  },
  {
    category: "Event",
    image_url: "assets/images/gallery/event/event-2.jpg",
    alt_text: "Event photography 2",
    caption: "Event",
    sort_order: 2,
    is_cover: false
  },
  {
    category: "Event",
    image_url: "assets/images/gallery/event/event-3.jpg",
    alt_text: "Event photography 3",
    caption: "Event",
    sort_order: 3,
    is_cover: false
  }
];

let activeGalleryGroups = [];
let activeModalImages = [];
let activeImageIndex = 0;

async function loadGalleryPreview() {
  if (!galleryGrid) {
    return;
  }

  if (typeof supabaseClient === "undefined") {
    activeGalleryGroups = buildGalleryGroups(fallbackGalleryImages);
    renderGalleryPreview(activeGalleryGroups);
    return;
  }

  const { data, error } = await supabaseClient
    .from("gallery_images")
    .select("id, category, image_url, caption, alt_text, sort_order, is_cover, is_visible, created_at")
    .eq("is_visible", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    activeGalleryGroups = buildGalleryGroups(fallbackGalleryImages);
    renderGalleryPreview(activeGalleryGroups);
    return;
  }

  const visibleImages = data || [];

  activeGalleryGroups = visibleImages.length
    ? buildGalleryGroups(visibleImages)
    : buildGalleryGroups(fallbackGalleryImages);

  renderGalleryPreview(activeGalleryGroups);
}

function buildGalleryGroups(images) {
  return galleryCategoryOrder
    .map(function (category) {
      const categoryImages = images
        .filter(function (image) {
          return image.category === category && image.image_url;
        })
        .sort(function (a, b) {
          const sortA = Number(a.sort_order || 0);
          const sortB = Number(b.sort_order || 0);

          if (sortA !== sortB) {
            return sortA - sortB;
          }

          return String(b.created_at || "").localeCompare(String(a.created_at || ""));
        })
        .map(function (image, index) {
          return {
            category: category,
            src: image.image_url,
            alt: image.alt_text || image.caption || `${category} photography ${index + 1}`,
            caption: image.caption || "",
            isCover: Boolean(image.is_cover),
            sortOrder: Number(image.sort_order || 0)
          };
        });

      if (!categoryImages.length) {
        return null;
      }

      const coverImage = categoryImages.find(function (image) {
        return image.isCover;
      }) || categoryImages[0];

      return {
        category: category,
        count: categoryImages.length,
        coverImage: coverImage,
        images: categoryImages
      };
    })
    .filter(Boolean);
}

function renderGalleryPreview(groups) {
  if (!galleryGrid) {
    return;
  }

  if (!groups.length) {
    galleryGrid.innerHTML = `
      <div class="empty-state">
        Gallery images will appear here soon.
      </div>
    `;
    return;
  }

  galleryGrid.innerHTML = groups.map(function (group, index) {
    const largeClass = index === 0 ? "large" : "";
    const photoLabel = group.count === 1 ? "photo" : "photos";

    return `
      <article class="gallery-card ${largeClass}" data-category="${escapeAttribute(group.category)}">
        <img src="${escapeAttribute(group.coverImage.src)}" alt="${escapeAttribute(group.coverImage.alt)}">
        <div class="gallery-card-content">
          <span>${escapeHtml(group.category)}</span>
          <small>${group.count} ${photoLabel}</small>
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

  const group = activeGalleryGroups.find(function (item) {
    return item.category === category;
  });

  if (!modal || !title || !grid || !group) {
    return;
  }

  const images = group.images;
  const columnCount = Math.min(images.length, 4);

  activeModalImages = images;

  title.textContent = `${group.category} Photography`;
  grid.style.setProperty("--modal-columns", columnCount);

  grid.innerHTML = images.map(function (image, index) {
    return `
      <article class="gallery-modal-item" data-index="${index}">
        <img src="${escapeAttribute(image.src)}" alt="${escapeAttribute(image.alt)}">
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

loadServicesHeroImages();
createGalleryModal();
createImageViewer();
createPostModal();
loadGalleryPreview();
loadHelpfulAdvicePosts();