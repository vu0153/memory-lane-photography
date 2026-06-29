const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const logoutButton = document.getElementById("logoutButton");
const refreshBookingsButton = document.getElementById("refreshBookingsButton");

const bookingsTabButton = document.getElementById("bookingsTabButton");
const postsTabButton = document.getElementById("postsTabButton");
const bookingsPanel = document.getElementById("bookingsPanel");
const postsPanel = document.getElementById("postsPanel");
const galleryTabButton = document.getElementById("galleryTabButton");
const galleryPanel = document.getElementById("galleryPanel");
const heroTabButton = document.getElementById("heroTabButton");
const heroPanel = document.getElementById("heroPanel");

const freePortraitTabButton = document.getElementById("freePortraitTabButton");
const freePortraitPanel = document.getElementById("freePortraitPanel");
const refreshFreePortraitButton = document.getElementById("refreshFreePortraitButton");
const setNoFreePortraitPlanButton = document.getElementById("setNoFreePortraitPlanButton");
const freePortraitMessage = document.getElementById("freePortraitMessage");
const freePortraitForm = document.getElementById("freePortraitForm");
const freePortraitIdInput = document.getElementById("freePortraitIdInput");
const freePortraitActiveInput = document.getElementById("freePortraitActiveInput");
const freePortraitTitleInput = document.getElementById("freePortraitTitleInput");
const freePortraitDateInput = document.getElementById("freePortraitDateInput");
const freePortraitStartInput = document.getElementById("freePortraitStartInput");
const freePortraitEndInput = document.getElementById("freePortraitEndInput");
const freePortraitLocationNameInput = document.getElementById("freePortraitLocationNameInput");
const freePortraitLocationAddressInput = document.getElementById("freePortraitLocationAddressInput");
const freePortraitCoordinatesInput = document.getElementById("freePortraitCoordinatesInput");
const freePortraitLatitudeInput = document.getElementById("freePortraitLatitudeInput");
const freePortraitLongitudeInput = document.getElementById("freePortraitLongitudeInput");
const freePortraitMapNoteInput = document.getElementById("freePortraitMapNoteInput");
const freePortraitSummaryInput = document.getElementById("freePortraitSummaryInput");
const freePortraitWhoInput = document.getElementById("freePortraitWhoInput");
const freePortraitBringInput = document.getElementById("freePortraitBringInput");
const freePortraitDeliveryInput = document.getElementById("freePortraitDeliveryInput");
const freePortraitCapacityInput = document.getElementById("freePortraitCapacityInput");
const freePortraitWeatherInput = document.getElementById("freePortraitWeatherInput");
const freePortraitSignupInput = document.getElementById("freePortraitSignupInput");
const freePortraitContactInput = document.getElementById("freePortraitContactInput");
const clearFreePortraitFormButton = document.getElementById("clearFreePortraitFormButton");
const newFreePortraitEventButton = document.getElementById("newFreePortraitEventButton");
const freePortraitHistorySummary = document.getElementById("freePortraitHistorySummary");
const freePortraitEventsTableBody = document.getElementById("freePortraitEventsTableBody");
const freePortraitStatusPreview = document.getElementById("freePortraitStatusPreview");
const freePortraitMapPreview = document.getElementById("freePortraitMapPreview");

const bookingsTableBody = document.getElementById("bookingsTableBody");
const dashboardMessage = document.getElementById("dashboardMessage");
const totalBookings = document.getElementById("totalBookings");
const newBookings = document.getElementById("newBookings");
const lastUpdated = document.getElementById("lastUpdated");
const bookingSearchInput = document.getElementById("bookingSearchInput");
const bookingDateFromInput = document.getElementById("bookingDateFromInput");
const bookingDateToInput = document.getElementById("bookingDateToInput");
const serviceFilterSelect = document.getElementById("serviceFilterSelect");
const statusFilterSelect = document.getElementById("statusFilterSelect");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const exportBookingsPdfButton = document.getElementById("exportBookingsPdfButton");

const quotedPipelineValue = document.getElementById("quotedPipelineValue");
const bookedRevenueValue = document.getElementById("bookedRevenueValue");
const completedRevenueValue = document.getElementById("completedRevenueValue");
const averageDealValue = document.getElementById("averageDealValue");

const postsMessage = document.getElementById("postsMessage");
const postSearchInput = document.getElementById("postSearchInput");
const postPublishedFilter = document.getElementById("postPublishedFilter");
const clearPostFiltersButton = document.getElementById("clearPostFiltersButton");
const newPostButton = document.getElementById("newPostButton");

const postEditorModal = document.getElementById("postEditorModal");
const closePostModalButton = document.getElementById("closePostModalButton");
const postForm = document.getElementById("postForm");
const postFormTitle = document.getElementById("postFormTitle");
const postIdInput = document.getElementById("postIdInput");
const postTitleInput = document.getElementById("postTitleInput");
const postSlugInput = document.getElementById("postSlugInput");
const postExcerptInput = document.getElementById("postExcerptInput");
const postContentInput = document.getElementById("postContentInput");
const postCategoryInput = document.getElementById("postCategoryInput");
const postSortOrderInput = document.getElementById("postSortOrderInput");
const postThumbnailInput = document.getElementById("postThumbnailInput");
const postThumbnailFileInput = document.getElementById("postThumbnailFileInput");
const uploadThumbnailButton = document.getElementById("uploadThumbnailButton");
const thumbnailUploadMessage = document.getElementById("thumbnailUploadMessage");
const postContentImageFileInput = document.getElementById("postContentImageFileInput");
const postContentImageCaptionInput = document.getElementById("postContentImageCaptionInput");
const uploadContentImageButton = document.getElementById("uploadContentImageButton");
const postContentUploadMessage = document.getElementById("postContentUploadMessage");
const postPublishedInput = document.getElementById("postPublishedInput");
const savePostButton = document.getElementById("savePostButton");
const clearPostFormButton = document.getElementById("clearPostFormButton");
const deletePostButton = document.getElementById("deletePostButton");
const postsTableBody = document.getElementById("postsTableBody");

const galleryMessage = document.getElementById("galleryMessage");
const gallerySearchInput = document.getElementById("gallerySearchInput");
const galleryCategoryFilter = document.getElementById("galleryCategoryFilter");
const galleryVisibleFilter = document.getElementById("galleryVisibleFilter");
const clearGalleryFiltersButton = document.getElementById("clearGalleryFiltersButton");
const newGalleryImageButton = document.getElementById("newGalleryImageButton");
const galleryTableBody = document.getElementById("galleryTableBody");

const galleryEditorModal = document.getElementById("galleryEditorModal");
const closeGalleryModalButton = document.getElementById("closeGalleryModalButton");
const galleryForm = document.getElementById("galleryForm");
const galleryFormTitle = document.getElementById("galleryFormTitle");
const galleryIdInput = document.getElementById("galleryIdInput");
const galleryStoragePathInput = document.getElementById("galleryStoragePathInput");
const galleryCategoryInput = document.getElementById("galleryCategoryInput");
const gallerySortOrderInput = document.getElementById("gallerySortOrderInput");
const galleryImageUrlInput = document.getElementById("galleryImageUrlInput");
const galleryImageFileInput = document.getElementById("galleryImageFileInput");
const uploadGalleryImageButton = document.getElementById("uploadGalleryImageButton");
const galleryUploadMessage = document.getElementById("galleryUploadMessage");
const galleryCaptionInput = document.getElementById("galleryCaptionInput");
const galleryAltTextInput = document.getElementById("galleryAltTextInput");
const galleryVisibleInput = document.getElementById("galleryVisibleInput");
const galleryCoverInput = document.getElementById("galleryCoverInput");
const saveGalleryImageButton = document.getElementById("saveGalleryImageButton");
const clearGalleryFormButton = document.getElementById("clearGalleryFormButton");
const deleteGalleryImageButton = document.getElementById("deleteGalleryImageButton");

const heroMessage = document.getElementById("heroMessage");
const heroSearchInput = document.getElementById("heroSearchInput");
const heroActiveFilter = document.getElementById("heroActiveFilter");
const clearHeroFiltersButton = document.getElementById("clearHeroFiltersButton");
const newHeroImageButton = document.getElementById("newHeroImageButton");
const heroTableBody = document.getElementById("heroTableBody");

const heroEditorModal = document.getElementById("heroEditorModal");
const closeHeroModalButton = document.getElementById("closeHeroModalButton");
const heroForm = document.getElementById("heroForm");
const heroFormTitle = document.getElementById("heroFormTitle");
const heroIdInput = document.getElementById("heroIdInput");
const heroStoragePathInput = document.getElementById("heroStoragePathInput");
const heroImageUrlInput = document.getElementById("heroImageUrlInput");
const heroImageFileInput = document.getElementById("heroImageFileInput");
const uploadHeroImageButton = document.getElementById("uploadHeroImageButton");
const heroUploadMessage = document.getElementById("heroUploadMessage");
const heroAltTextInput = document.getElementById("heroAltTextInput");
const heroSortOrderInput = document.getElementById("heroSortOrderInput");
const heroActiveInput = document.getElementById("heroActiveInput");
const saveHeroImageButton = document.getElementById("saveHeroImageButton");
const clearHeroFormButton = document.getElementById("clearHeroFormButton");
const deleteHeroImageButton = document.getElementById("deleteHeroImageButton");


const statusOptions = [
  "new",
  "contacted",
  "quoted",
  "booked",
  "completed",
  "cancelled"
];

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  booked: "Booked",
  completed: "Completed",
  cancelled: "Cancelled"
};

const FREE_PORTRAIT_SERVICE_VALUE = "Free Portrait Session";


const galleryCategories = [
  "Family",
  "Couple",
  "Friends",
  "Portrait",
  "Event"
];


let allBookings = [];
let currentFilteredBookings = [];
let allPosts = [];
let allGalleryImages = [];
let allHeroImages = [];
let allFreePortraitEvents = [];
let freePortraitRegistrationCounts = {};
let currentFreePortraitEvent = null;
let detailModal = null;
let detailModalBody = null;
let activeDetailBookingId = null;
let statusChart = null;
let monthlyEnquiriesChart = null;
let monthlyIncomeChart = null;

document.addEventListener("DOMContentLoaded", async () => {
  createDetailsModal();

  await checkSession();

  loginForm.addEventListener("submit", handleLogin);
  logoutButton.addEventListener("click", handleLogout);
  refreshBookingsButton.addEventListener("click", refreshCurrentTab);

  bookingsTabButton.addEventListener("click", () => switchAdminTab("bookings"));
  postsTabButton.addEventListener("click", () => switchAdminTab("posts"));
  galleryTabButton.addEventListener("click", () => switchAdminTab("gallery"));
  heroTabButton.addEventListener("click", () => switchAdminTab("hero"));
  freePortraitTabButton.addEventListener("click", () => switchAdminTab("freePortrait"));

  bookingsTableBody.addEventListener("change", handleStatusChange);
  bookingsTableBody.addEventListener("click", handleBookingTableClick);
  bookingSearchInput.addEventListener("input", applyFilters);
  bookingDateFromInput.addEventListener("change", applyFilters);
  bookingDateToInput.addEventListener("change", applyFilters);
  serviceFilterSelect.addEventListener("change", applyFilters);
  statusFilterSelect.addEventListener("change", applyFilters);
  clearFiltersButton.addEventListener("click", clearFilters);
  if (exportBookingsPdfButton) {
    exportBookingsPdfButton.addEventListener("click", exportFilteredBookingsPdf);
  }

  postSearchInput.addEventListener("input", applyPostFilters);
  postPublishedFilter.addEventListener("change", applyPostFilters);
  clearPostFiltersButton.addEventListener("click", clearPostFilters);
  newPostButton.addEventListener("click", openNewPostModal);
  uploadThumbnailButton.addEventListener("click", handleThumbnailUpload);
  uploadContentImageButton.addEventListener("click", handleContentImageUpload);
  postForm.addEventListener("submit", handlePostSave);
  postTitleInput.addEventListener("input", handlePostTitleInput);
  clearPostFormButton.addEventListener("click", clearPostForm);
  deletePostButton.addEventListener("click", handlePostDelete);
  postsTableBody.addEventListener("click", handlePostsTableClick);
  closePostModalButton.addEventListener("click", closePostModal);

  gallerySearchInput.addEventListener("input", applyGalleryFilters);
  galleryCategoryFilter.addEventListener("change", applyGalleryFilters);
  galleryVisibleFilter.addEventListener("change", applyGalleryFilters);
  clearGalleryFiltersButton.addEventListener("click", clearGalleryFilters);
  newGalleryImageButton.addEventListener("click", openNewGalleryModal);
  uploadGalleryImageButton.addEventListener("click", handleGalleryImageUpload);
  galleryForm.addEventListener("submit", handleGallerySave);
  clearGalleryFormButton.addEventListener("click", clearGalleryForm);
  deleteGalleryImageButton.addEventListener("click", handleGalleryDelete);
  galleryTableBody.addEventListener("click", handleGalleryTableClick);
  closeGalleryModalButton.addEventListener("click", closeGalleryModal);

  galleryEditorModal.addEventListener("click", (event) => {
    if (event.target === galleryEditorModal) {
      closeGalleryModal();
    }
  });

  heroSearchInput.addEventListener("input", applyHeroFilters);
  heroActiveFilter.addEventListener("change", applyHeroFilters);
  clearHeroFiltersButton.addEventListener("click", clearHeroFilters);
  newHeroImageButton.addEventListener("click", openNewHeroModal);
  uploadHeroImageButton.addEventListener("click", handleHeroImageUpload);
  heroForm.addEventListener("submit", handleHeroSave);
  clearHeroFormButton.addEventListener("click", clearHeroForm);
  deleteHeroImageButton.addEventListener("click", handleHeroDelete);
  heroTableBody.addEventListener("click", handleHeroTableClick);
  closeHeroModalButton.addEventListener("click", closeHeroModal);

refreshFreePortraitButton.addEventListener("click", function () {
  loadFreePortraitEvent(currentFreePortraitEvent ? currentFreePortraitEvent.id : null);
});
setNoFreePortraitPlanButton.addEventListener("click", handleFreePortraitNoPlan);
freePortraitForm.addEventListener("submit", handleFreePortraitSave);
if (newFreePortraitEventButton) {
  newFreePortraitEventButton.addEventListener("click", function () {
    currentFreePortraitEvent = null;
    clearFreePortraitForm(false);
    freePortraitMessage.classList.remove("success");
    freePortraitMessage.textContent = "New Free Portrait session ready. Complete the form and save.";
  });
}
if (freePortraitEventsTableBody) {
  freePortraitEventsTableBody.addEventListener("click", handleFreePortraitHistoryClick);
}
clearFreePortraitFormButton.addEventListener("click", function () {
  clearFreePortraitForm(false);
});
if (freePortraitCoordinatesInput) {
  freePortraitCoordinatesInput.addEventListener("input", renderFreePortraitAdminMap);
}
if (freePortraitLatitudeInput) {
  freePortraitLatitudeInput.addEventListener("input", renderFreePortraitAdminMap);
}
if (freePortraitLongitudeInput) {
  freePortraitLongitudeInput.addEventListener("input", renderFreePortraitAdminMap);
}

  heroEditorModal.addEventListener("click", (event) => {
    if (event.target === heroEditorModal) {
      closeHeroModal();
    }
  });


  postEditorModal.addEventListener("click", (event) => {
    if (event.target === postEditorModal) {
      closePostModal();
    }
  });

  document.addEventListener("keydown", handleEscapeClose);
});

function createDetailsModal() {
  const modalStyle = document.createElement("style");

  modalStyle.textContent = `
    .details-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 22px;
      background: rgba(42, 31, 24, 0.66);
      backdrop-filter: blur(8px);
    }

    .details-modal {
      width: min(860px, 100%);
      max-height: calc(100vh - 44px);
      overflow: auto;
      background: #fffaf5;
      border: 1px solid rgba(255, 255, 255, 0.54);
      border-radius: 24px;
      box-shadow: 0 26px 80px rgba(0, 0, 0, 0.34);
    }

    .details-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 18px;
      padding: 26px 28px 18px;
      border-bottom: 1px solid rgba(81, 65, 56, 0.12);
    }

    .details-modal-header h2 {
      margin: 0;
      color: #2d241f;
      font-size: 24px;
    }

    .details-modal-header p {
      margin: 7px 0 0;
      color: #77665b;
      line-height: 1.5;
    }

    .details-close-button {
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

    .details-close-button:hover {
      background: rgba(93, 68, 54, 0.18);
    }

    .details-modal-body {
      padding: 24px 28px 28px;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .detail-item {
      padding: 15px;
      border: 1px solid rgba(81, 65, 56, 0.1);
      border-radius: 16px;
      background: #fff;
    }

    .detail-item.detail-full {
      grid-column: 1 / -1;
    }

    .detail-label {
      display: block;
      margin-bottom: 7px;
      color: #8a7467;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .detail-value {
      color: #2d241f;
      line-height: 1.55;
      word-break: break-word;
    }

    .detail-value a {
      color: #5d4436;
      font-weight: 700;
      text-decoration: none;
    }

    .detail-message {
      margin: 0;
      white-space: pre-wrap;
    }

    .detail-button {
      margin-top: 10px;
      border: 0;
      border-radius: 999px;
      background: rgba(93, 68, 54, 0.1);
      color: #5d4436;
      padding: 8px 12px;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .detail-button:hover {
      background: rgba(93, 68, 54, 0.18);
    }

    .admin-notes-textarea {
      width: 100%;
      min-height: 140px;
      resize: vertical;
      border: 1px solid rgba(81, 65, 56, 0.16);
      border-radius: 14px;
      background: #fffaf5;
      padding: 13px 14px;
      font: inherit;
      color: #2d241f;
      outline: none;
      line-height: 1.6;
    }

    .admin-price-input {
      width: min(240px, 100%);
      border: 1px solid rgba(81, 65, 56, 0.16);
      border-radius: 14px;
      background: #fffaf5;
      padding: 13px 14px;
      font: inherit;
      color: #2d241f;
      outline: none;
    }

    .admin-notes-textarea:focus,
    .admin-price-input:focus {
      border-color: #9b765f;
      box-shadow: 0 0 0 4px rgba(155, 118, 95, 0.16);
    }

    .details-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-top: 14px;
    }

    .save-notes-button {
      border: 0;
      border-radius: 999px;
      background: #5d4436;
      color: #fffaf5;
      padding: 10px 16px;
      font: inherit;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }

    .save-notes-button:hover {
      background: #463226;
    }

    .save-notes-button:disabled {
      opacity: 0.68;
      cursor: not-allowed;
    }

    .notes-save-message {
      min-height: 20px;
      color: #2f6d3c;
      font-size: 14px;
    }

    @media (max-width: 680px) {
      .details-modal-header {
        padding: 22px 22px 16px;
      }

      .details-modal-body {
        padding: 20px 22px 24px;
      }

      .detail-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  const modal = document.createElement("div");

  modal.id = "bookingDetailsModal";
  modal.className = "details-modal-overlay hidden";

  modal.innerHTML = `
    <div class="details-modal" role="dialog" aria-modal="true" aria-labelledby="bookingDetailsTitle">
      <div class="details-modal-header">
        <div>
          <h2 id="bookingDetailsTitle">Enquiry Details</h2>
          <p>View the full enquiry, add quoted price and keep internal notes.</p>
        </div>

        <button id="closeDetailsModalButton" class="details-close-button" type="button" aria-label="Close details popup">
          ×
        </button>
      </div>

      <div id="bookingDetailsBody" class="details-modal-body"></div>
    </div>
  `;

  document.head.appendChild(modalStyle);
  document.body.appendChild(modal);

  detailModal = document.getElementById("bookingDetailsModal");
  detailModalBody = document.getElementById("bookingDetailsBody");

  document.getElementById("closeDetailsModalButton").addEventListener("click", closeBookingDetails);

  detailModal.addEventListener("click", (event) => {
    if (event.target === detailModal) {
      closeBookingDetails();
    }
  });

  detailModal.addEventListener("click", handleDetailsModalClick);
}

async function checkSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error || !data.session) {
    showLogin();
    return;
  }

  showDashboard();
  await Promise.all([loadBookings(), loadPosts(), loadGalleryImages(), loadHeroImages(), loadFreePortraitEvent()]);
}

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;

  loginButton.disabled = true;
  loginButton.textContent = "Logging in...";
  loginMessage.textContent = "";

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  loginButton.disabled = false;
  loginButton.textContent = "Login";

  if (error || !data.session) {
    loginMessage.textContent = error?.message || "Login failed. Please check your details.";
    return;
  }

  loginMessage.textContent = "";
  showDashboard();
  await Promise.all([loadBookings(), loadPosts(), loadGalleryImages(), loadHeroImages(), loadFreePortraitEvent()]);
}

async function handleLogout() {
  await supabaseClient.auth.signOut();

  allBookings = [];
  currentFilteredBookings = [];
  allPosts = [];
  allGalleryImages = [];
  allHeroImages = [];
  activeDetailBookingId = null;

  bookingSearchInput.value = "";
  serviceFilterSelect.value = "all";
  statusFilterSelect.value = "all";
  bookingDateFromInput.value = "";
  bookingDateToInput.value = "";
  postSearchInput.value = "";
  postPublishedFilter.value = "all";
  gallerySearchInput.value = "";
  galleryCategoryFilter.value = "all";
  galleryVisibleFilter.value = "all";
  heroSearchInput.value = "";
  heroActiveFilter.value = "all";

  totalBookings.textContent = "Total: 0";
  newBookings.textContent = "New: 0";
  lastUpdated.textContent = "Last updated: Not loaded";
  quotedPipelineValue.textContent = "A$0";
  bookedRevenueValue.textContent = "A$0";
  completedRevenueValue.textContent = "A$0";
  averageDealValue.textContent = "A$0";

  destroyCharts();

  bookingsTableBody.innerHTML = `
    <tr>
      <td colspan="9" class="empty-state">Login to load bookings.</td>
    </tr>
  `;

  postsTableBody.innerHTML = `
    <tr>
      <td colspan="5" class="empty-state">Login to load posts.</td>
    </tr>
  `;

  galleryTableBody.innerHTML = `
    <tr>
      <td colspan="8" class="empty-state">Login to load gallery images.</td>
    </tr>
  `;

  heroTableBody.innerHTML = `
    <tr>
      <td colspan="6" class="empty-state">Login to load hero images.</td>
    </tr>
  `;

  clearPostForm();
  clearGalleryForm();
  clearHeroForm();
  closePostModal();
  closeGalleryModal();
  closeHeroModal();
  closeBookingDetails();
  switchAdminTab("bookings");
  showLogin();
}

function showLogin() {
  loginSection.classList.remove("hidden");
  dashboardSection.classList.add("hidden");
  logoutButton.classList.add("hidden");
}

function showDashboard() {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
  logoutButton.classList.remove("hidden");
}

function switchAdminTab(tabName) {
  const isBookings = tabName === "bookings";
  const isPosts = tabName === "posts";
  const isGallery = tabName === "gallery";
  const isHero = tabName === "hero";
  const isFreePortrait = tabName === "freePortrait";

  bookingsTabButton.classList.toggle("active", isBookings);
  postsTabButton.classList.toggle("active", isPosts);
  galleryTabButton.classList.toggle("active", isGallery);
  heroTabButton.classList.toggle("active", isHero);
  freePortraitTabButton.classList.toggle("active", isFreePortrait);
  bookingsPanel.classList.toggle("active", isBookings);
  postsPanel.classList.toggle("active", isPosts);
  galleryPanel.classList.toggle("active", isGallery);
  heroPanel.classList.toggle("active", isHero);
  freePortraitPanel.classList.toggle("active", isFreePortrait);
}

async function refreshCurrentTab() {
  if (freePortraitPanel.classList.contains("active")) {
    await loadFreePortraitEvent();
    return;
  }

  if (heroPanel.classList.contains("active")) {
    await loadHeroImages();
    return;
  }

  if (galleryPanel.classList.contains("active")) {
    await loadGalleryImages();
    return;
  }

  if (postsPanel.classList.contains("active")) {
    await loadPosts();
    return;
  }

  await loadBookings();
}

async function loadBookings() {
  dashboardMessage.classList.remove("success");
  dashboardMessage.textContent = "Loading bookings...";

  const { data, error } = await supabaseClient
    .from("bookings")
    .select("id, created_at, updated_at, full_name, phone, email, service_type, preferred_date, location, message, status, admin_notes, quoted_price")
    .order("created_at", { ascending: false });

  if (error) {
    dashboardMessage.textContent = error.message;

    bookingsTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-state">Unable to load bookings.</td>
      </tr>
    `;

    return;
  }

  allBookings = data || [];
  populateServiceFilterOptions(allBookings);

  updateSummary(allBookings);
  updateStatistics(allBookings);
  renderCharts(allBookings);
  applyFilters();

  dashboardMessage.textContent = "";
}

function applyFilters() {
  currentFilteredBookings = getFilteredBookings();
  renderBookings(currentFilteredBookings);
}

function getFilteredBookings() {
  const searchTerm = bookingSearchInput.value.trim().toLowerCase();
  const serviceFilter = serviceFilterSelect.value;
  const statusFilter = statusFilterSelect.value;
  const submittedFrom = bookingDateFromInput.value || "";
  const submittedTo = bookingDateToInput.value || "";

  return allBookings.filter((booking) => {
    const bookingStatus = booking.status || "new";

    const matchesStatus =
      statusFilter === "all" || bookingStatus === statusFilter;

    const bookingService = booking.service_type || "Not provided";
    const matchesService =
      serviceFilter === "all" || bookingService === serviceFilter;

    const submittedDate = getDateOnlyValue(booking.created_at);
    const matchesSubmittedFrom = !submittedFrom || (submittedDate && submittedDate >= submittedFrom);
    const matchesSubmittedTo = !submittedTo || (submittedDate && submittedDate <= submittedTo);

    const searchableText = [
      booking.full_name,
      booking.phone,
      booking.email,
      booking.service_type,
      booking.preferred_date,
      booking.location,
      booking.message,
      booking.status,
      booking.admin_notes,
      booking.quoted_price
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !searchTerm || searchableText.includes(searchTerm);

    return matchesStatus && matchesService && matchesSubmittedFrom && matchesSubmittedTo && matchesSearch;
  });
}

function populateServiceFilterOptions(bookings) {
  if (!serviceFilterSelect) {
    return;
  }

  const currentValue = serviceFilterSelect.value || "all";
  const services = [...new Set(bookings
    .map((booking) => booking.service_type || "Not provided")
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));

  serviceFilterSelect.innerHTML = `
    <option value="all">All services</option>
    ${services.map((service) => `
      <option value="${escapeAttribute(service)}">${escapeHtml(service)}</option>
    `).join("")}
  `;

  const hasPreviousValue = services.includes(currentValue);
  serviceFilterSelect.value = hasPreviousValue ? currentValue : "all";
}

function exportFilteredBookingsPdf() {
  const bookings = getFilteredBookings();

  if (!bookings.length) {
    dashboardMessage.classList.remove("success");
    dashboardMessage.textContent = "No bookings match the current filters to export.";
    return;
  }

  dashboardMessage.textContent = "";
  const reportWindow = window.open("", "_blank", "width=980,height=1200");

  if (!reportWindow) {
    dashboardMessage.classList.remove("success");
    dashboardMessage.textContent = "Popup blocked. Please allow popups for this site, then try Export PDF again.";
    return;
  }

  const reportHtml = buildBookingReportHtml(bookings);
  reportWindow.document.open();
  reportWindow.document.write(reportHtml);
  reportWindow.document.close();
  reportWindow.focus();
}

function buildBookingReportHtml(bookings) {
  const generatedAt = formatDateTime(new Date().toISOString());
  const dateRangeLabel = getBookingReportDateRangeLabel();
  const serviceLabel = serviceFilterSelect.value === "all"
    ? "All services"
    : serviceFilterSelect.options[serviceFilterSelect.selectedIndex]?.text || serviceFilterSelect.value;
  const statusLabel = statusFilterSelect.value === "all"
    ? "All status"
    : formatStatus(statusFilterSelect.value);
  const totalQuoted = bookings.reduce((total, booking) => total + parseMoney(booking.quoted_price), 0);
  const logoUrl = new URL("assets/logo/ml-logo-icon.svg", window.location.href).href;
  const statusSummary = statusOptions
    .map((status) => {
      const count = bookings.filter((booking) => (booking.status || "new") === status).length;
      return `${escapeHtml(formatStatus(status))}: ${count}`;
    })
    .join(" · ");

  const rows = bookings.map((booking, index) => {
    const contactItems = [booking.phone, booking.email]
      .filter(Boolean)
      .map((item) => escapeHtml(item))
      .join("<br>") || "Not provided";

    return `
      <tr>
        <td class="number-cell">${index + 1}</td>
        <td>${escapeHtml(booking.full_name || "Unknown")}</td>
        <td>${contactItems}</td>
        <td>${escapeHtml(booking.service_type || "Not provided")}</td>
        <td>${escapeHtml(formatDateTime(booking.created_at))}</td>
        <td>${escapeHtml(formatDate(booking.preferred_date))}</td>
        <td>${escapeHtml(formatStatus(booking.status || "new"))}</td>
        <td class="money-cell">${escapeHtml(formatCurrency(parseMoney(booking.quoted_price)))}</td>
      </tr>
    `;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Memory Lane Booking Report</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 13mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #ffffff;
      color: #000000;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10px;
      line-height: 1.4;
    }

    .report-page {
      width: 100%;
      min-height: 100vh;
      background: #ffffff;
      padding: 18px;
    }

    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 18px;
      padding-bottom: 12px;
      border-bottom: 2px solid #000000;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      filter: grayscale(1) contrast(1.05);
    }

    .brand-title {
      margin: 0;
      color: #000000;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 24px;
      line-height: 1;
    }

    .brand-subtitle {
      margin-top: 4px;
      color: #000000;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .report-meta {
      text-align: right;
      color: #000000;
      font-size: 9px;
    }

    .report-title-block {
      margin: 18px 0 12px;
    }

    .report-title-block h2 {
      margin: 0;
      color: #000000;
      font-size: 21px;
      line-height: 1.15;
    }

    .report-title-block p {
      margin: 5px 0 0;
      color: #000000;
      font-size: 10px;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 8px;
      margin: 12px 0 10px;
    }

    .summary-card {
      min-height: 48px;
      padding: 9px;
      border: 1px solid #000000;
      background: #ffffff;
    }

    .summary-card span {
      display: block;
      color: #000000;
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .summary-card strong {
      display: block;
      margin-top: 5px;
      color: #000000;
      font-size: 12px;
    }

    .status-summary {
      margin: 0 0 12px;
      color: #000000;
      font-size: 9px;
      font-weight: 700;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      background: #ffffff;
      border: 1px solid #000000;
    }

    th,
    td {
      padding: 7px 6px;
      border-bottom: 1px solid #000000;
      border-right: 1px solid #000000;
      text-align: left;
      vertical-align: top;
      word-wrap: break-word;
      overflow-wrap: anywhere;
    }

    th:last-child,
    td:last-child {
      border-right: 0;
    }

    thead th {
      background: #ffffff;
      color: #000000;
      font-size: 8px;
      font-weight: 900;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    tbody tr:last-child td {
      border-bottom: 0;
    }

    .number-cell {
      text-align: center;
      font-weight: 800;
    }

    .money-cell {
      text-align: right;
      font-weight: 800;
      white-space: nowrap;
    }

    .col-no { width: 5%; }
    .col-client { width: 13%; }
    .col-contact { width: 21%; }
    .col-service { width: 15%; }
    .col-submitted { width: 15%; }
    .col-preferred { width: 13%; }
    .col-status { width: 9%; }
    .col-price { width: 9%; }

    .report-footer {
      margin-top: 12px;
      padding-top: 8px;
      border-top: 1px solid #000000;
      color: #000000;
      font-size: 8.5px;
      text-align: right;
    }

    .print-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-bottom: 14px;
    }

    .print-actions button {
      border: 1px solid #000000;
      border-radius: 999px;
      background: #ffffff;
      color: #000000;
      padding: 9px 14px;
      font: inherit;
      font-weight: 800;
      cursor: pointer;
    }

    @media print {
      body {
        background: #ffffff;
        -webkit-print-color-adjust: economy;
        print-color-adjust: economy;
      }

      .report-page {
        min-height: auto;
        padding: 0;
      }

      .print-actions {
        display: none;
      }

      table {
        page-break-inside: auto;
      }

      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
    }
  </style>
</head>
<body>
  <div class="report-page">
    <div class="print-actions">
      <button type="button" onclick="window.print()">Save as PDF</button>
      <button type="button" onclick="window.close()">Close</button>
    </div>

    <header class="report-header">
      <div class="brand">
        <img src="${escapeAttribute(logoUrl)}" alt="Memory Lane logo" />
        <div>
          <h1 class="brand-title">Memory Lane</h1>
          <div class="brand-subtitle">Photo Studio</div>
        </div>
      </div>

      <div class="report-meta">
        <strong>Generated</strong><br>
        ${escapeHtml(generatedAt)}
      </div>
    </header>

    <section class="report-title-block">
      <h2>Booking Report</h2>
      <p>Filtered booking export from the Memory Lane admin dashboard.</p>
    </section>

    <section class="summary-grid" aria-label="Report summary">
      <div class="summary-card">
        <span>Date range</span>
        <strong>${escapeHtml(dateRangeLabel)}</strong>
      </div>
      <div class="summary-card">
        <span>Service filter</span>
        <strong>${escapeHtml(serviceLabel)}</strong>
      </div>
      <div class="summary-card">
        <span>Status filter</span>
        <strong>${escapeHtml(statusLabel)}</strong>
      </div>
      <div class="summary-card">
        <span>Total bookings</span>
        <strong>${bookings.length}</strong>
      </div>
      <div class="summary-card">
        <span>Total quoted</span>
        <strong>${escapeHtml(formatCurrency(totalQuoted))}</strong>
      </div>
    </section>

    <section class="status-summary" aria-label="Status summary">
      ${statusSummary}
    </section>

    <table aria-label="Booking report table">
      <thead>
        <tr>
          <th class="col-no">No.</th>
          <th class="col-client">Client</th>
          <th class="col-contact">Contact</th>
          <th class="col-service">Service</th>
          <th class="col-submitted">Submitted date</th>
          <th class="col-preferred">Preferred date</th>
          <th class="col-status">Status</th>
          <th class="col-price">Quoted price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <footer class="report-footer">
      Memory Lane Photo Studio booking report · ${escapeHtml(generatedAt)}
    </footer>
  </div>

  <script>
    window.addEventListener("load", function () {
      setTimeout(function () {
        window.print();
      }, 350);
    });
  </script>
</body>
</html>`;
}

function getBookingReportDateRangeLabel() {
  const submittedFrom = bookingDateFromInput.value || "";
  const submittedTo = bookingDateToInput.value || "";

  if (submittedFrom && submittedTo) {
    return `${formatDate(submittedFrom)} – ${formatDate(submittedTo)}`;
  }

  if (submittedFrom) {
    return `From ${formatDate(submittedFrom)}`;
  }

  if (submittedTo) {
    return `Up to ${formatDate(submittedTo)}`;
  }

  return "All submitted dates";
}

function clearFilters() {
  bookingSearchInput.value = "";
  bookingDateFromInput.value = "";
  bookingDateToInput.value = "";
  serviceFilterSelect.value = "all";
  statusFilterSelect.value = "all";
  applyFilters();
}

function getDateOnlyValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function updateSummary(bookings) {
  totalBookings.textContent = `Total: ${bookings.length}`;

  newBookings.textContent = `New: ${
    bookings.filter((booking) => (booking.status || "new") === "new").length
  }`;

  lastUpdated.textContent = `Last updated: ${formatDateTime(new Date().toISOString())}`;
}

function updateStatistics(bookings) {
  const quotedPipeline = sumPricesByStatuses(bookings, ["quoted"]);
  const bookedRevenue = sumPricesByStatuses(bookings, ["booked", "completed"]);
  const completedRevenue = sumPricesByStatuses(bookings, ["completed"]);

  const bookedDeals = bookings.filter((booking) => {
    const status = booking.status || "new";
    return ["booked", "completed"].includes(status) && parseMoney(booking.quoted_price) > 0;
  });

  const averageDeal = bookedDeals.length
    ? bookedRevenue / bookedDeals.length
    : 0;

  quotedPipelineValue.textContent = formatCurrency(quotedPipeline);
  bookedRevenueValue.textContent = formatCurrency(bookedRevenue);
  completedRevenueValue.textContent = formatCurrency(completedRevenue);
  averageDealValue.textContent = formatCurrency(averageDeal);
}

function sumPricesByStatuses(bookings, statuses) {
  return bookings.reduce((total, booking) => {
    const status = booking.status || "new";

    if (!statuses.includes(status)) {
      return total;
    }

    return total + parseMoney(booking.quoted_price);
  }, 0);
}

function renderBookings(bookings) {
  if (!bookings.length) {
    bookingsTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-state">No bookings found.</td>
      </tr>
    `;

    return;
  }

  bookingsTableBody.innerHTML = bookings.map((booking) => {
    const status = booking.status || "new";
    const message = booking.message || "No message";
    const shortMessage = message.length > 90 ? `${message.slice(0, 90)}...` : message;
    const notesFlag = booking.admin_notes ? `<div class="booking-contact">Internal note saved</div>` : "";

    return `
      <tr>
        <td>${formatDateTime(booking.created_at)}</td>
        <td>
          <div class="booking-name">${escapeHtml(booking.full_name || "Unknown")}</div>
          ${notesFlag}
        </td>
        <td>
          <div class="booking-contact">
            <span>${escapeHtml(booking.phone || "No phone")}</span>
            <span>${escapeHtml(booking.email || "No email")}</span>
          </div>
        </td>
        <td>${escapeHtml(booking.service_type || "Not provided")}</td>
        <td>${formatDate(booking.preferred_date)}</td>
        <td>
          <span class="booking-price">${formatCurrency(parseMoney(booking.quoted_price))}</span>
        </td>
        <td>
          <div class="booking-message">${escapeHtml(shortMessage)}</div>
          <button class="detail-button" type="button" data-booking-id="${booking.id}">
            View details
          </button>
        </td>
        <td>
          <select class="status-select" data-booking-id="${booking.id}">
            ${statusOptions.map((option) => `
              <option value="${option}" ${option === status ? "selected" : ""}>
                ${formatStatus(option)}
              </option>
            `).join("")}
          </select>
        </td>
        <td>
          <div class="booking-row-actions">
            <button class="delete-row-button delete-booking-button" type="button" data-booking-id="${booking.id}">
              Delete
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function handleBookingTableClick(event) {
  const deleteButton = event.target.closest(".delete-booking-button");

  if (deleteButton) {
    deleteBookingFromTable(deleteButton.dataset.bookingId);
    return;
  }

  const detailButton = event.target.closest(".detail-button");

  if (!detailButton) {
    return;
  }

  const bookingId = detailButton.dataset.bookingId;
  const booking = allBookings.find((item) => String(item.id) === String(bookingId));

  if (!booking) {
    return;
  }

  openBookingDetails(booking);
}

async function deleteBookingFromTable(bookingId) {
  if (!bookingId) {
    return;
  }

  const booking = allBookings.find((item) => String(item.id) === String(bookingId));
  const clientName = booking && booking.full_name ? booking.full_name : "this booking";
  const confirmed = window.confirm(`Delete ${clientName}? This cannot be undone.`);

  if (!confirmed) {
    return;
  }

  dashboardMessage.classList.remove("success");
  dashboardMessage.textContent = "Deleting booking...";

  const { data, error } = await supabaseClient
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .select("id");

  if (error) {
    dashboardMessage.textContent = error.message;
    await loadBookings();
    return;
  }

  if (!data || data.length === 0) {
    dashboardMessage.textContent = "Booking was not deleted. Please check the Supabase delete policy for the bookings table.";
    await loadBookings();
    return;
  }

  if (String(activeDetailBookingId) === String(bookingId)) {
    closeBookingDetails();
  }

  await loadBookings();

  dashboardMessage.classList.add("success");
  dashboardMessage.textContent = "Booking deleted.";

  setTimeout(() => {
    dashboardMessage.classList.remove("success");
    dashboardMessage.textContent = "";
  }, 1800);
}

function openBookingDetails(booking) {
  activeDetailBookingId = booking.id;

  const phoneValue = booking.phone
    ? `<a href="tel:${escapeAttribute(booking.phone)}">${escapeHtml(booking.phone)}</a>`
    : "No phone provided";

  const emailValue = booking.email
    ? `<a href="mailto:${escapeAttribute(booking.email)}">${escapeHtml(booking.email)}</a>`
    : "No email provided";

  const updatedAt = booking.updated_at
    ? formatDateTime(booking.updated_at)
    : "Not updated yet";

  detailModalBody.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <span class="detail-label">Client</span>
        <div class="detail-value">${escapeHtml(booking.full_name || "Unknown")}</div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Status</span>
        <div class="detail-value">${escapeHtml(formatStatus(booking.status || "new"))}</div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Phone</span>
        <div class="detail-value">${phoneValue}</div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Email</span>
        <div class="detail-value">${emailValue}</div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Service</span>
        <div class="detail-value">${escapeHtml(booking.service_type || "Not provided")}</div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Preferred Date</span>
        <div class="detail-value">${formatDate(booking.preferred_date)}</div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Submitted</span>
        <div class="detail-value">${formatDateTime(booking.created_at)}</div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Last Updated</span>
        <div class="detail-value">${updatedAt}</div>
      </div>

      <div class="detail-item detail-full">
        <span class="detail-label">Client Message</span>
        <div class="detail-value">
          <p class="detail-message">${escapeHtml(booking.message || "No message provided")}</p>
        </div>
      </div>

      <div class="detail-item detail-full">
        <span class="detail-label">Quoted Price</span>
        <input
          id="quotedPriceInput"
          class="admin-price-input"
          type="number"
          min="0"
          step="0.01"
          placeholder="Example: 390"
          value="${escapeAttribute(booking.quoted_price ?? "")}"
        />
      </div>

      <div class="detail-item detail-full">
        <span class="detail-label">Internal Admin Notes</span>
        <textarea id="adminNotesTextarea" class="admin-notes-textarea" placeholder="Add private notes for this enquiry...">${escapeHtml(booking.admin_notes || "")}</textarea>

        <div class="details-actions">
          <button id="saveBookingDetailsButton" class="save-notes-button" type="button">
            Save Details
          </button>

          <span id="notesSaveMessage" class="notes-save-message"></span>
        </div>
      </div>
    </div>
  `;

  detailModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeBookingDetails() {
  if (!detailModal) {
    return;
  }

  activeDetailBookingId = null;
  detailModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function handleDetailsModalClick(event) {
  if (event.target.id !== "saveBookingDetailsButton") {
    return;
  }

  saveBookingDetails();
}

async function saveBookingDetails() {
  if (!activeDetailBookingId) {
    return;
  }

  const notesTextarea = document.getElementById("adminNotesTextarea");
  const quotedPriceInput = document.getElementById("quotedPriceInput");
  const saveButton = document.getElementById("saveBookingDetailsButton");
  const notesMessage = document.getElementById("notesSaveMessage");

  if (!notesTextarea || !quotedPriceInput || !saveButton || !notesMessage) {
    return;
  }

  const adminNotes = notesTextarea.value.trim();
  const rawQuotedPrice = quotedPriceInput.value.trim();
  const quotedPrice = rawQuotedPrice ? Number(rawQuotedPrice) : null;

  if (rawQuotedPrice && Number.isNaN(quotedPrice)) {
    notesMessage.style.color = "#7c3f31";
    notesMessage.textContent = "Please enter a valid price.";
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = "Saving...";
  notesMessage.textContent = "";

  const { data, error } = await supabaseClient
    .from("bookings")
    .update({
      admin_notes: adminNotes || null,
      quoted_price: quotedPrice
    })
    .eq("id", activeDetailBookingId)
    .select("id, updated_at, admin_notes, quoted_price")
    .single();

  saveButton.disabled = false;
  saveButton.textContent = "Save Details";

  if (error) {
    notesMessage.style.color = "#7c3f31";
    notesMessage.textContent = error.message;
    return;
  }

  const booking = allBookings.find((item) => String(item.id) === String(activeDetailBookingId));

  if (booking) {
    booking.admin_notes = data.admin_notes;
    booking.quoted_price = data.quoted_price;
    booking.updated_at = data.updated_at;
  }

  updateSummary(allBookings);
  updateStatistics(allBookings);
  renderCharts(allBookings);
  applyFilters();

  notesMessage.style.color = "#2f6d3c";
  notesMessage.textContent = "Details saved.";

  setTimeout(() => {
    if (notesMessage) {
      notesMessage.textContent = "";
    }
  }, 1800);
}

async function handleStatusChange(event) {
  if (!event.target.classList.contains("status-select")) {
    return;
  }

  const select = event.target;
  const bookingId = select.dataset.bookingId;
  const newStatus = select.value;

  select.disabled = true;
  dashboardMessage.classList.remove("success");
  dashboardMessage.textContent = "Updating status...";

  const { data, error } = await supabaseClient
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", bookingId)
    .select("id, status, updated_at")
    .single();

  select.disabled = false;

  if (error) {
    dashboardMessage.textContent = error.message;
    await loadBookings();
    return;
  }

  const booking = allBookings.find((item) => String(item.id) === String(bookingId));

  if (booking) {
    booking.status = data.status;
    booking.updated_at = data.updated_at;
  }

  updateSummary(allBookings);
  updateStatistics(allBookings);
  renderCharts(allBookings);
  applyFilters();

  dashboardMessage.classList.add("success");
  dashboardMessage.textContent = "Status updated.";

  setTimeout(() => {
    dashboardMessage.classList.remove("success");
    dashboardMessage.textContent = "";
  }, 1800);
}

async function loadPosts() {
  postsMessage.classList.remove("success");
  postsMessage.textContent = "Loading posts...";

  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, category, thumbnail_url, is_published, sort_order, published_at, created_at, updated_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    postsMessage.textContent = error.message;

    postsTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">Unable to load posts.</td>
      </tr>
    `;

    return;
  }

  allPosts = data || [];
  applyPostFilters();
  postsMessage.textContent = "";
}

function applyPostFilters() {
  const searchTerm = postSearchInput.value.trim().toLowerCase();
  const publishedFilter = postPublishedFilter.value;

  const filteredPosts = allPosts.filter((post) => {
    const matchesStatus =
      publishedFilter === "all" ||
      (publishedFilter === "published" && post.is_published) ||
      (publishedFilter === "draft" && !post.is_published);

    const searchableText = [
      post.title,
      post.slug,
      post.excerpt,
      post.content,
      post.category
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !searchTerm || searchableText.includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  renderPosts(filteredPosts);
}

function clearPostFilters() {
  postSearchInput.value = "";
  postPublishedFilter.value = "all";
  applyPostFilters();
}

function renderPosts(posts) {
  if (!posts.length) {
    postsTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No posts found.</td>
      </tr>
    `;
    return;
  }

  postsTableBody.innerHTML = posts.map((post) => {
    const statusClass = post.is_published ? "published" : "draft";
    const statusText = post.is_published ? "Published" : "Draft";

    return `
      <tr>
        <td>
          <div class="post-title">${escapeHtml(post.title)}</div>
          <div class="post-meta">
            <span>${escapeHtml(post.slug)}</span>
            <span>${escapeHtml(post.category || "Photography Tips")}</span>
          </div>
        </td>
        <td>
          <span class="post-status-pill ${statusClass}">
            ${statusText}
          </span>
        </td>
        <td>${Number(post.sort_order || 0)}</td>
        <td>${formatDateTime(post.updated_at || post.created_at)}</td>
        <td>
          <button class="detail-button edit-post-button" type="button" data-post-id="${post.id}">
            Edit
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function handlePostsTableClick(event) {
  const editButton = event.target.closest(".edit-post-button");

  if (!editButton) {
    return;
  }

  const postId = editButton.dataset.postId;
  const post = allPosts.find((item) => String(item.id) === String(postId));

  if (!post) {
    return;
  }

  loadPostIntoForm(post);
  openPostModal();
}

function openNewPostModal() {
  clearPostForm();
  openPostModal();
}

function openPostModal() {
  postEditorModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closePostModal() {
  postEditorModal.classList.add("hidden");

  if (!detailModal || detailModal.classList.contains("hidden")) {
    document.body.style.overflow = "";
  }
}

function loadPostIntoForm(post) {
  postFormTitle.textContent = "Edit Post";
  postIdInput.value = post.id;
  postTitleInput.value = post.title || "";
  postSlugInput.value = post.slug || "";
  postExcerptInput.value = post.excerpt || "";
  postContentInput.value = post.content || "";
  postCategoryInput.value = post.category || "Photography Tips";
  postSortOrderInput.value = post.sort_order ?? 0;
  postThumbnailInput.value = post.thumbnail_url || "";
  postPublishedInput.checked = Boolean(post.is_published);
  deletePostButton.classList.remove("hidden");
  clearUploadMessages();

  postsMessage.classList.remove("success");
  postsMessage.textContent = "";
}

function handlePostTitleInput() {
  if (postIdInput.value || postSlugInput.value.trim()) {
    return;
  }

  postSlugInput.value = createSlug(postTitleInput.value);
}


async function handleThumbnailUpload() {
  const file = postThumbnailFileInput.files[0];

  if (!file) {
    setUploadMessage(thumbnailUploadMessage, "Please choose an image first.", "error");
    return;
  }

  uploadThumbnailButton.disabled = true;
  uploadThumbnailButton.textContent = "Uploading...";
  setUploadMessage(thumbnailUploadMessage, "Uploading thumbnail...", "");

  const result = await uploadBlogImage(file, "thumbnails");

  uploadThumbnailButton.disabled = false;
  uploadThumbnailButton.textContent = "Upload Thumbnail";

  if (result.error) {
    setUploadMessage(thumbnailUploadMessage, result.error, "error");
    return;
  }

  postThumbnailInput.value = result.publicUrl;
  postThumbnailFileInput.value = "";
  setUploadMessage(thumbnailUploadMessage, "Thumbnail uploaded and URL added.", "success");
}

async function handleContentImageUpload() {
  const file = postContentImageFileInput.files[0];

  if (!file) {
    setUploadMessage(postContentUploadMessage, "Please choose an image first.", "error");
    return;
  }

  uploadContentImageButton.disabled = true;
  uploadContentImageButton.textContent = "Uploading...";
  setUploadMessage(postContentUploadMessage, "Uploading content image...", "");

  const result = await uploadBlogImage(file, "content");

  uploadContentImageButton.disabled = false;
  uploadContentImageButton.textContent = "Upload Content Image";

  if (result.error) {
    setUploadMessage(postContentUploadMessage, result.error, "error");
    return;
  }

  const caption = postContentImageCaptionInput.value.trim();
  const fallbackCaption = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
  const imageCaption = caption || fallbackCaption;
  const imageMarkup = `\n\n[image:${result.publicUrl}|${imageCaption}]\n\n`;

  insertTextAtCursor(postContentInput, imageMarkup);

  postContentImageFileInput.value = "";
  postContentImageCaptionInput.value = "";
  setUploadMessage(postContentUploadMessage, "Content image uploaded and inserted into the article.", "success");
}

async function uploadBlogImage(file, folderName) {
  if (typeof supabaseClient === "undefined") {
    return { error: "Supabase is not connected." };
  }

  const validationError = validateImageFile(file);

  if (validationError) {
    return { error: validationError };
  }

  const baseSlug = createSlug(postSlugInput.value || postTitleInput.value || "post");
  const safeFileName = createSafeFileName(file.name);
  const filePath = `${folderName}/${baseSlug}/${Date.now()}-${safeFileName}`;

  const { error } = await supabaseClient.storage
    .from("blog-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabaseClient.storage
    .from("blog-images")
    .getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    return { error: "Image uploaded, but public URL could not be created." };
  }

  return {
    publicUrl: data.publicUrl,
    path: filePath
  };
}

async function handlePostSave(event) {
  event.preventDefault();

  const postId = postIdInput.value || null;
  const title = postTitleInput.value.trim();
  const slug = postSlugInput.value.trim() || createSlug(title);
  const excerpt = postExcerptInput.value.trim();
  const content = postContentInput.value.trim();
  const category = postCategoryInput.value.trim() || "Photography Tips";
  const thumbnailUrl = postThumbnailInput.value.trim() || null;
  const sortOrder = Number(postSortOrderInput.value || 0);
  const isPublished = postPublishedInput.checked;

  if (!title || !slug || !excerpt || !content) {
    postsMessage.textContent = "Please complete title, slug, excerpt and content.";
    return;
  }

  savePostButton.disabled = true;
  savePostButton.textContent = "Saving...";
  postsMessage.classList.remove("success");
  postsMessage.textContent = "";

  const payload = {
    title,
    slug,
    excerpt,
    content,
    category,
    thumbnail_url: thumbnailUrl,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_published: isPublished
  };

  let error;

  if (postId) {
    const response = await supabaseClient
      .from("blog_posts")
      .update(payload)
      .eq("id", postId);

    error = response.error;
  } else {
    const response = await supabaseClient
      .from("blog_posts")
      .insert([payload]);

    error = response.error;
  }

  savePostButton.disabled = false;
  savePostButton.textContent = "Save Post";

  if (error) {
    postsMessage.textContent = error.message;
    return;
  }

  postsMessage.classList.add("success");
  postsMessage.textContent = postId ? "Post updated." : "Post created.";

  clearPostForm();
  closePostModal();
  await loadPosts();
}

async function handlePostDelete() {
  const postId = postIdInput.value;

  if (!postId) {
    return;
  }

  const confirmed = window.confirm("Delete this post? This cannot be undone.");

  if (!confirmed) {
    return;
  }

  deletePostButton.disabled = true;
  deletePostButton.textContent = "Deleting...";

  const { error } = await supabaseClient
    .from("blog_posts")
    .delete()
    .eq("id", postId);

  deletePostButton.disabled = false;
  deletePostButton.textContent = "Delete Post";

  if (error) {
    postsMessage.textContent = error.message;
    return;
  }

  postsMessage.classList.add("success");
  postsMessage.textContent = "Post deleted.";

  clearPostForm();
  closePostModal();
  await loadPosts();
}

function clearPostForm() {
  postFormTitle.textContent = "New Post";
  postForm.reset();
  postIdInput.value = "";
  postCategoryInput.value = "Photography Tips";
  postSortOrderInput.value = "0";
  postPublishedInput.checked = false;
  deletePostButton.classList.add("hidden");
  clearUploadMessages();
}


async function loadGalleryImages() {
  galleryMessage.classList.remove("success");
  galleryMessage.textContent = "Loading gallery images...";

  const { data, error } = await supabaseClient
    .from("gallery_images")
    .select("id, category, image_url, storage_path, caption, alt_text, sort_order, is_cover, is_visible, created_at, updated_at")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    galleryMessage.textContent = error.message;

    galleryTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">Unable to load gallery images.</td>
      </tr>
    `;

    return;
  }

  allGalleryImages = data || [];
  applyGalleryFilters();
  galleryMessage.textContent = "";
}

function applyGalleryFilters() {
  const searchTerm = gallerySearchInput.value.trim().toLowerCase();
  const categoryFilter = galleryCategoryFilter.value;
  const visibleFilter = galleryVisibleFilter.value;

  const filteredImages = allGalleryImages.filter((image) => {
    const matchesCategory =
      categoryFilter === "all" || image.category === categoryFilter;

    const matchesVisible =
      visibleFilter === "all" ||
      (visibleFilter === "visible" && image.is_visible) ||
      (visibleFilter === "hidden" && !image.is_visible);

    const searchableText = [
      image.category,
      image.caption,
      image.alt_text,
      image.image_url,
      image.storage_path
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !searchTerm || searchableText.includes(searchTerm);

    return matchesCategory && matchesVisible && matchesSearch;
  });

  renderGalleryImages(filteredImages);
}

function clearGalleryFilters() {
  gallerySearchInput.value = "";
  galleryCategoryFilter.value = "all";
  galleryVisibleFilter.value = "all";
  heroSearchInput.value = "";
  heroActiveFilter.value = "all";
  applyGalleryFilters();
}

function renderGalleryImages(images) {
  if (!images.length) {
    galleryTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">No gallery images found.</td>
      </tr>
    `;
    return;
  }

  galleryTableBody.innerHTML = images.map((image) => {
    const visibleClass = image.is_visible ? "visible" : "hidden-status";
    const visibleText = image.is_visible ? "Visible" : "Hidden";
    const coverText = image.is_cover ? "Cover" : "-";
    const coverClass = image.is_cover ? "gallery-status-pill cover" : "";

    return `
      <tr>
        <td>
          <div class="gallery-image-cell">
            <img class="gallery-thumb" src="${escapeAttribute(image.image_url)}" alt="${escapeAttribute(image.alt_text || image.caption || image.category || "Gallery image")}">
            <div class="gallery-image-meta">
              <span class="gallery-image-category">${escapeHtml(image.category || "Uncategorised")}</span>
              <span>${escapeHtml(image.storage_path || "External URL")}</span>
            </div>
          </div>
        </td>
        <td>${escapeHtml(image.category || "Not provided")}</td>
        <td>${escapeHtml(image.caption || "No caption")}</td>
        <td>${Number(image.sort_order || 0)}</td>
        <td>${image.is_cover ? `<span class="${coverClass}">${coverText}</span>` : coverText}</td>
        <td>
          <span class="gallery-status-pill ${visibleClass}">
            ${visibleText}
          </span>
        </td>
        <td>${formatDateTime(image.updated_at || image.created_at)}</td>
        <td>
          <button class="detail-button edit-gallery-button" type="button" data-gallery-id="${image.id}">
            Edit
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function handleGalleryTableClick(event) {
  const editButton = event.target.closest(".edit-gallery-button");

  if (!editButton) {
    return;
  }

  const galleryId = editButton.dataset.galleryId;
  const image = allGalleryImages.find((item) => String(item.id) === String(galleryId));

  if (!image) {
    return;
  }

  loadGalleryIntoForm(image);
  openGalleryModal();
}

function openNewGalleryModal(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  clearGalleryForm();
  openGalleryModal();
}

function openGalleryModal() {
  if (!galleryEditorModal) {
    console.error("galleryEditorModal not found");
    return;
  }

  galleryEditorModal.classList.remove("hidden");
  galleryEditorModal.style.display = "flex";
  galleryEditorModal.style.zIndex = "99999";
  document.body.style.overflow = "hidden";
}

function closeGalleryModal() {
  if (!galleryEditorModal) {
    return;
  }

  galleryEditorModal.classList.add("hidden");
  galleryEditorModal.style.display = "";

  const postModalOpen = postEditorModal && !postEditorModal.classList.contains("hidden");
  const detailModalOpen = detailModal && !detailModal.classList.contains("hidden");

  if (!postModalOpen && !detailModalOpen) {
    document.body.style.overflow = "";
  }
}

function loadGalleryIntoForm(image) {
  galleryFormTitle.textContent = "Edit Gallery Image";
  galleryIdInput.value = image.id;
  galleryStoragePathInput.value = image.storage_path || "";
  galleryCategoryInput.value = galleryCategories.includes(image.category) ? image.category : "Family";
  gallerySortOrderInput.value = image.sort_order ?? 0;
  galleryImageUrlInput.value = image.image_url || "";
  galleryCaptionInput.value = image.caption || "";
  galleryAltTextInput.value = image.alt_text || "";
  galleryVisibleInput.checked = Boolean(image.is_visible);
  galleryCoverInput.checked = Boolean(image.is_cover);
  deleteGalleryImageButton.classList.remove("hidden");
  clearGalleryUploadMessage();

  galleryMessage.classList.remove("success");
  galleryMessage.textContent = "";
}

async function handleGalleryImageUpload() {
  const file = galleryImageFileInput.files[0];

  if (!file) {
    setUploadMessage(galleryUploadMessage, "Please choose an image first.", "error");
    return;
  }

  uploadGalleryImageButton.disabled = true;
  uploadGalleryImageButton.textContent = "Uploading...";
  setUploadMessage(galleryUploadMessage, "Uploading gallery image...", "");

  const result = await uploadGalleryImage(file, galleryCategoryInput.value);

  uploadGalleryImageButton.disabled = false;
  uploadGalleryImageButton.textContent = "Upload Gallery Image";

  if (result.error) {
    setUploadMessage(galleryUploadMessage, result.error, "error");
    return;
  }

  galleryImageUrlInput.value = result.publicUrl;
  galleryStoragePathInput.value = result.path;
  galleryImageFileInput.value = "";

  if (!galleryAltTextInput.value.trim()) {
    galleryAltTextInput.value = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
  }

  setUploadMessage(galleryUploadMessage, "Gallery image uploaded and URL added.", "success");
}

async function uploadGalleryImage(file, category) {
  if (typeof supabaseClient === "undefined") {
    return { error: "Supabase is not connected." };
  }

  const validationError = validateImageFile(file);

  if (validationError) {
    return { error: validationError };
  }

  const safeCategory = galleryCategories.includes(category) ? category : "Family";
  const safeFileName = createSafeFileName(file.name);
  const filePath = `${createSlug(safeCategory)}/${Date.now()}-${safeFileName}`;

  const { error } = await supabaseClient.storage
    .from("gallery-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabaseClient.storage
    .from("gallery-images")
    .getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    return { error: "Image uploaded, but public URL could not be created." };
  }

  return {
    publicUrl: data.publicUrl,
    path: filePath
  };
}

async function handleGallerySave(event) {
  event.preventDefault();

  const galleryId = galleryIdInput.value || null;
  const category = galleryCategoryInput.value;
  const imageUrl = galleryImageUrlInput.value.trim();
  const storagePath = galleryStoragePathInput.value.trim() || null;
  const caption = galleryCaptionInput.value.trim() || null;
  const altText = galleryAltTextInput.value.trim() || caption || category;
  const sortOrder = Number(gallerySortOrderInput.value || 0);
  const isVisible = galleryVisibleInput.checked;
  const isCover = galleryCoverInput.checked;

  if (!galleryCategories.includes(category)) {
    galleryMessage.textContent = "Please choose a valid gallery category.";
    return;
  }

  if (!imageUrl) {
    galleryMessage.textContent = "Please upload an image or paste an image URL.";
    return;
  }

  saveGalleryImageButton.disabled = true;
  saveGalleryImageButton.textContent = "Saving...";
  galleryMessage.classList.remove("success");
  galleryMessage.textContent = "";

  if (isCover) {
    let coverUpdate = supabaseClient
      .from("gallery_images")
      .update({ is_cover: false })
      .eq("category", category)
      .eq("is_cover", true);

    if (galleryId) {
      coverUpdate = coverUpdate.neq("id", galleryId);
    }

    const { error: coverError } = await coverUpdate;

    if (coverError) {
      saveGalleryImageButton.disabled = false;
      saveGalleryImageButton.textContent = "Save Gallery Image";
      galleryMessage.textContent = coverError.message;
      return;
    }
  }

  const payload = {
    category,
    image_url: imageUrl,
    storage_path: storagePath,
    caption,
    alt_text: altText,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_cover: isCover,
    is_visible: isVisible
  };

  let error;

  if (galleryId) {
    const response = await supabaseClient
      .from("gallery_images")
      .update(payload)
      .eq("id", galleryId);

    error = response.error;
  } else {
    const response = await supabaseClient
      .from("gallery_images")
      .insert([payload]);

    error = response.error;
  }

  saveGalleryImageButton.disabled = false;
  saveGalleryImageButton.textContent = "Save Gallery Image";

  if (error) {
    galleryMessage.textContent = error.message;
    return;
  }

  galleryMessage.classList.add("success");
  galleryMessage.textContent = galleryId ? "Gallery image updated." : "Gallery image created.";

  clearGalleryForm();
  closeGalleryModal();
  await loadGalleryImages();
}

async function handleGalleryDelete() {
  const galleryId = galleryIdInput.value;
  const storagePath = galleryStoragePathInput.value;

  if (!galleryId) {
    return;
  }

  const confirmed = window.confirm("Delete this gallery image? This cannot be undone.");

  if (!confirmed) {
    return;
  }

  deleteGalleryImageButton.disabled = true;
  deleteGalleryImageButton.textContent = "Deleting...";

  const { error } = await supabaseClient
    .from("gallery_images")
    .delete()
    .eq("id", galleryId);

  if (!error && storagePath) {
    await supabaseClient.storage
      .from("gallery-images")
      .remove([storagePath]);
  }

  deleteGalleryImageButton.disabled = false;
  deleteGalleryImageButton.textContent = "Delete Gallery Image";

  if (error) {
    galleryMessage.textContent = error.message;
    return;
  }

  galleryMessage.classList.add("success");
  galleryMessage.textContent = "Gallery image deleted.";

  clearGalleryForm();
  closeGalleryModal();
  await loadGalleryImages();
}

function clearGalleryForm() {
  galleryFormTitle.textContent = "New Gallery Image";
  galleryForm.reset();
  galleryIdInput.value = "";
  galleryStoragePathInput.value = "";
  galleryCategoryInput.value = "Family";
  gallerySortOrderInput.value = "0";
  galleryVisibleInput.checked = true;
  galleryCoverInput.checked = false;
  deleteGalleryImageButton.classList.add("hidden");
  clearGalleryUploadMessage();
}

function clearGalleryUploadMessage() {
  galleryImageFileInput.value = "";
  setUploadMessage(galleryUploadMessage, "", "");
}



function validateImageFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeMb = 10;
  const maxSizeBytes = maxSizeMb * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, PNG and WEBP images are allowed.";
  }

  if (file.size > maxSizeBytes) {
    return `Image must be smaller than ${maxSizeMb} MB.`;
  }

  return "";
}

function createSafeFileName(fileName) {
  const extensionMatch = fileName.match(/\.[a-z0-9]+$/i);
  const extension = extensionMatch ? extensionMatch[0].toLowerCase() : "";
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const safeName = createSlug(nameWithoutExtension) || "image";

  return `${safeName}${extension}`;
}

function insertTextAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const currentValue = textarea.value;

  textarea.value = currentValue.slice(0, start) + text + currentValue.slice(end);
  textarea.focus();

  const newCursorPosition = start + text.length;

  textarea.setSelectionRange(newCursorPosition, newCursorPosition);
}

function setUploadMessage(element, message, type) {
  if (!element) {
    return;
  }

  element.classList.remove("success", "error");

  if (type) {
    element.classList.add(type);
  }

  element.textContent = message;
}

function clearUploadMessages() {
  if (postThumbnailFileInput) {
    postThumbnailFileInput.value = "";
  }

  if (postContentImageFileInput) {
    postContentImageFileInput.value = "";
  }

  if (postContentImageCaptionInput) {
    postContentImageCaptionInput.value = "";
  }

  setUploadMessage(thumbnailUploadMessage, "", "");
  setUploadMessage(postContentUploadMessage, "", "");
}


async function loadHeroImages() {
  heroMessage.classList.remove("success");
  heroMessage.textContent = "Loading hero images...";

  const { data, error } = await supabaseClient
    .from("hero_images")
    .select("id, image_url, storage_path, alt_text, sort_order, is_active, created_at, updated_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    heroMessage.textContent = error.message;

    heroTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">Unable to load hero images.</td>
      </tr>
    `;

    return;
  }

  allHeroImages = data || [];
  applyHeroFilters();
  heroMessage.textContent = "";
}

function applyHeroFilters() {
  const searchTerm = heroSearchInput.value.trim().toLowerCase();
  const activeFilter = heroActiveFilter.value;

  const filteredImages = allHeroImages.filter((image) => {
    const matchesActive =
      activeFilter === "all" ||
      (activeFilter === "active" && image.is_active) ||
      (activeFilter === "inactive" && !image.is_active);

    const searchableText = [
      image.alt_text,
      image.image_url,
      image.storage_path
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !searchTerm || searchableText.includes(searchTerm);

    return matchesActive && matchesSearch;
  });

  renderHeroImages(filteredImages);
}

function clearHeroFilters() {
  heroSearchInput.value = "";
  heroActiveFilter.value = "all";
  applyHeroFilters();
}

function renderHeroImages(images) {
  if (!images.length) {
    heroTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No hero images found.</td>
      </tr>
    `;
    return;
  }

  heroTableBody.innerHTML = images.map((image) => {
    const activeClass = image.is_active ? "visible" : "hidden-status";
    const activeText = image.is_active ? "Active" : "Inactive";

    return `
      <tr>
        <td>
          <div class="gallery-image-cell">
            <img class="gallery-thumb" src="${escapeAttribute(image.image_url)}" alt="${escapeAttribute(image.alt_text || "Hero image")}">
            <div class="gallery-image-meta">
              <span class="gallery-image-category">Hero Image</span>
              <span>${escapeHtml(image.storage_path || "External URL")}</span>
            </div>
          </div>
        </td>
        <td>${escapeHtml(image.alt_text || "No alt text")}</td>
        <td>${Number(image.sort_order || 0)}</td>
        <td>
          <span class="gallery-status-pill ${activeClass}">
            ${activeText}
          </span>
        </td>
        <td>${formatDateTime(image.updated_at || image.created_at)}</td>
        <td>
          <button class="detail-button edit-hero-button" type="button" data-hero-id="${image.id}">
            Edit
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function handleHeroTableClick(event) {
  const editButton = event.target.closest(".edit-hero-button");

  if (!editButton) {
    return;
  }

  const heroId = editButton.dataset.heroId;
  const image = allHeroImages.find((item) => String(item.id) === String(heroId));

  if (!image) {
    return;
  }

  loadHeroIntoForm(image);
  openHeroModal();
}

function openNewHeroModal(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  clearHeroForm();
  openHeroModal();
}

function openHeroModal() {
  if (!heroEditorModal) {
    console.error("heroEditorModal not found");
    return;
  }

  heroEditorModal.classList.remove("hidden");
  heroEditorModal.style.display = "flex";
  heroEditorModal.style.zIndex = "99999";
  document.body.style.overflow = "hidden";
}

function closeHeroModal() {
  if (!heroEditorModal) {
    return;
  }

  heroEditorModal.classList.add("hidden");
  heroEditorModal.style.display = "";

  const postModalOpen = postEditorModal && !postEditorModal.classList.contains("hidden");
  const galleryModalOpen = galleryEditorModal && !galleryEditorModal.classList.contains("hidden");
  const detailModalOpen = detailModal && !detailModal.classList.contains("hidden");

  if (!postModalOpen && !galleryModalOpen && !detailModalOpen) {
    document.body.style.overflow = "";
  }
}

function loadHeroIntoForm(image) {
  heroFormTitle.textContent = "Edit Hero Image";
  heroIdInput.value = image.id;
  heroStoragePathInput.value = image.storage_path || "";
  heroImageUrlInput.value = image.image_url || "";
  heroAltTextInput.value = image.alt_text || "";
  heroSortOrderInput.value = image.sort_order ?? 0;
  heroActiveInput.checked = Boolean(image.is_active);
  deleteHeroImageButton.classList.remove("hidden");
  clearHeroUploadMessage();

  heroMessage.classList.remove("success");
  heroMessage.textContent = "";
}

async function handleHeroImageUpload() {
  const file = heroImageFileInput.files[0];

  if (!file) {
    setUploadMessage(heroUploadMessage, "Please choose an image first.", "error");
    return;
  }

  uploadHeroImageButton.disabled = true;
  uploadHeroImageButton.textContent = "Uploading...";
  setUploadMessage(heroUploadMessage, "Uploading hero image...", "");

  const result = await uploadHeroImage(file);

  uploadHeroImageButton.disabled = false;
  uploadHeroImageButton.textContent = "Upload Hero Image";

  if (result.error) {
    setUploadMessage(heroUploadMessage, result.error, "error");
    return;
  }

  heroImageUrlInput.value = result.publicUrl;
  heroStoragePathInput.value = result.path;
  heroImageFileInput.value = "";

  if (!heroAltTextInput.value.trim()) {
    heroAltTextInput.value = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
  }

  setUploadMessage(heroUploadMessage, "Hero image uploaded and URL added.", "success");
}

async function uploadHeroImage(file) {
  if (typeof supabaseClient === "undefined") {
    return { error: "Supabase is not connected." };
  }

  const validationError = validateImageFile(file);

  if (validationError) {
    return { error: validationError };
  }

  const safeFileName = createSafeFileName(file.name);
  const filePath = `hero/${Date.now()}-${safeFileName}`;

  const { error } = await supabaseClient.storage
    .from("hero-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabaseClient.storage
    .from("hero-images")
    .getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    return { error: "Image uploaded, but public URL could not be created." };
  }

  return {
    publicUrl: data.publicUrl,
    path: filePath
  };
}

async function handleHeroSave(event) {
  event.preventDefault();

  const heroId = heroIdInput.value || null;
  const imageUrl = heroImageUrlInput.value.trim();
  const storagePath = heroStoragePathInput.value.trim() || null;
  const altText = heroAltTextInput.value.trim() || "Memory Lane hero image";
  const sortOrder = Number(heroSortOrderInput.value || 0);
  const isActive = heroActiveInput.checked;

  if (!imageUrl) {
    heroMessage.textContent = "Please upload an image or paste an image URL.";
    return;
  }

  saveHeroImageButton.disabled = true;
  saveHeroImageButton.textContent = "Saving...";
  heroMessage.classList.remove("success");
  heroMessage.textContent = "";

  const payload = {
    image_url: imageUrl,
    storage_path: storagePath,
    alt_text: altText,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_active: isActive
  };

  let error;

  if (heroId) {
    const response = await supabaseClient
      .from("hero_images")
      .update(payload)
      .eq("id", heroId);

    error = response.error;
  } else {
    const response = await supabaseClient
      .from("hero_images")
      .insert([payload]);

    error = response.error;
  }

  saveHeroImageButton.disabled = false;
  saveHeroImageButton.textContent = "Save Hero Image";

  if (error) {
    heroMessage.textContent = error.message;
    return;
  }

  heroMessage.classList.add("success");
  heroMessage.textContent = heroId ? "Hero image updated." : "Hero image created.";

  clearHeroForm();
  closeHeroModal();
  await loadHeroImages();
}

async function handleHeroDelete() {
  const heroId = heroIdInput.value;
  const storagePath = heroStoragePathInput.value;

  if (!heroId) {
    return;
  }

  const confirmed = window.confirm("Delete this hero image? This cannot be undone.");

  if (!confirmed) {
    return;
  }

  deleteHeroImageButton.disabled = true;
  deleteHeroImageButton.textContent = "Deleting...";

  const { error } = await supabaseClient
    .from("hero_images")
    .delete()
    .eq("id", heroId);

  if (!error && storagePath) {
    await supabaseClient.storage
      .from("hero-images")
      .remove([storagePath]);
  }

  deleteHeroImageButton.disabled = false;
  deleteHeroImageButton.textContent = "Delete Hero Image";

  if (error) {
    heroMessage.textContent = error.message;
    return;
  }

  heroMessage.classList.add("success");
  heroMessage.textContent = "Hero image deleted.";

  clearHeroForm();
  closeHeroModal();
  await loadHeroImages();
}

function clearHeroForm() {
  heroFormTitle.textContent = "New Hero Image";
  heroForm.reset();
  heroIdInput.value = "";
  heroStoragePathInput.value = "";
  heroImageUrlInput.value = "";
  heroAltTextInput.value = "";
  heroSortOrderInput.value = "0";
  heroActiveInput.checked = true;
  deleteHeroImageButton.classList.add("hidden");
  clearHeroUploadMessage();
}

function clearHeroUploadMessage() {
  heroImageFileInput.value = "";
  setUploadMessage(heroUploadMessage, "", "");
}




async function loadFreePortraitEvent(selectedEventId) {
  if (!freePortraitMessage) {
    return;
  }

  freePortraitMessage.classList.remove("success");
  freePortraitMessage.textContent = "Loading free portrait sessions...";

  const { data, error } = await supabaseClient
    .from("free_portrait_events")
    .select("*")
    .order("event_date", { ascending: false })
    .order("start_time", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) {
    freePortraitMessage.textContent = error.message;
    renderFreePortraitAdminStatus(null, error.message);
    renderFreePortraitHistoryList([], {}, error.message);
    return;
  }

  allFreePortraitEvents = data || [];
  freePortraitRegistrationCounts = await loadFreePortraitRegistrationCounts(allFreePortraitEvents);

  currentFreePortraitEvent = findFreePortraitEventForForm(allFreePortraitEvents, selectedEventId);

  if (currentFreePortraitEvent) {
    loadFreePortraitIntoForm(currentFreePortraitEvent);
    freePortraitMessage.textContent = "";
  } else {
    clearFreePortraitForm(true);
    freePortraitMessage.textContent = "No saved free portrait sessions yet. Complete the form and save when ready.";
  }

  renderFreePortraitHistoryList(allFreePortraitEvents, freePortraitRegistrationCounts);
}

function findFreePortraitEventForForm(events, selectedEventId) {
  if (!events || !events.length) {
    return null;
  }

  if (selectedEventId) {
    const selectedEvent = events.find((item) => String(item.id) === String(selectedEventId));

    if (selectedEvent) {
      return selectedEvent;
    }
  }

  const activeUpcoming = events
    .filter((item) => item.is_active && !isFreePortraitEventEnded(item))
    .sort(compareFreePortraitEventsAscending)[0];

  return activeUpcoming || events[0];
}

function compareFreePortraitEventsAscending(a, b) {
  const dateA = `${a.event_date || "9999-12-31"} ${a.start_time || "23:59"}`;
  const dateB = `${b.event_date || "9999-12-31"} ${b.start_time || "23:59"}`;
  return dateA.localeCompare(dateB);
}

async function loadFreePortraitRegistrationCounts(events) {
  const emptyCounts = {};

  events.forEach((event) => {
    if (event && event.id) {
      emptyCounts[String(event.id)] = 0;
    }
  });

  if (!events.length) {
    return emptyCounts;
  }

  const { data, error } = await supabaseClient
    .from("bookings")
    .select("id, created_at, service_type, preferred_date, free_portrait_event_id")
    .eq("service_type", FREE_PORTRAIT_SERVICE_VALUE);

  if (error) {
    console.error(error);
    freePortraitMessage.textContent = `${error.message}. Run the Free Portrait history SQL update if registration counts are not loading.`;
    return emptyCounts;
  }

  const eventsById = new Map(events.map((event) => [String(event.id), event]));

  (data || []).forEach((booking) => {
    const event = findBestFreePortraitEventForBooking(booking, events, eventsById);

    if (!event || !event.id) {
      return;
    }

    if (!isBookingCountedForFreePortraitEvent(booking, event)) {
      return;
    }

    const eventId = String(event.id);
    emptyCounts[eventId] = (emptyCounts[eventId] || 0) + 1;
  });

  return emptyCounts;
}

function findBestFreePortraitEventForBooking(booking, events, eventsById) {
  if (!booking) {
    return null;
  }

  const linkedEventId = booking.free_portrait_event_id ? String(booking.free_portrait_event_id) : "";
  const linkedEvent = linkedEventId ? eventsById.get(linkedEventId) : null;
  const preferredDateEvent = findLegacyFreePortraitEventForBooking(booking, events);

  if (!linkedEvent) {
    return preferredDateEvent;
  }

  if (!preferredDateEvent) {
    return linkedEvent;
  }

  const linkedDate = String(linkedEvent.event_date || "").slice(0, 10);
  const preferredDate = String(booking.preferred_date || "").slice(0, 10);

  if (preferredDate && linkedDate && preferredDate !== linkedDate) {
    return preferredDateEvent;
  }

  return linkedEvent;
}

function findLegacyFreePortraitEventForBooking(booking, events) {
  if (!booking || !booking.preferred_date) {
    return null;
  }

  const preferredDate = String(booking.preferred_date).slice(0, 10);

  return events.find((event) => String(event.event_date || "").slice(0, 10) === preferredDate) || null;
}

function isBookingCountedForFreePortraitEvent(booking, event) {
  const eventEndDate = getFreePortraitEventEndDate(event);

  if (!eventEndDate || !booking.created_at) {
    return true;
  }

  const bookingCreatedAt = new Date(booking.created_at);

  if (Number.isNaN(bookingCreatedAt.getTime())) {
    return true;
  }

  return bookingCreatedAt.getTime() <= eventEndDate.getTime();
}

function getFreePortraitEventEndDate(event) {
  if (!event || !event.event_date) {
    return null;
  }

  const eventDate = String(event.event_date).slice(0, 10);
  const eventEndTime = event.end_time ? String(event.end_time).slice(0, 5) : "23:59";
  const endDate = new Date(`${eventDate}T${eventEndTime}:59`);

  if (Number.isNaN(endDate.getTime())) {
    return null;
  }

  return endDate;
}

function isFreePortraitEventEnded(event) {
  const eventEndDate = getFreePortraitEventEndDate(event);

  if (!eventEndDate) {
    return false;
  }

  return Date.now() > eventEndDate.getTime();
}

function getFreePortraitEventStatus(event) {
  if (!event) {
    return { label: "Draft", className: "draft" };
  }

  if (isFreePortraitEventEnded(event)) {
    return { label: event.is_active ? "Ended" : "Ended draft", className: "ended" };
  }

  if (event.is_active) {
    return { label: "Published", className: "published" };
  }

  return { label: "Draft", className: "draft" };
}

function renderFreePortraitHistoryList(events, counts, errorMessage) {
  if (!freePortraitEventsTableBody) {
    return;
  }

  if (errorMessage) {
    freePortraitEventsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">${escapeHtml(errorMessage)}</td>
      </tr>
    `;
    return;
  }

  if (!events.length) {
    freePortraitEventsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No Free Portrait sessions saved yet.</td>
      </tr>
    `;

    if (freePortraitHistorySummary) {
      freePortraitHistorySummary.textContent = "0 sessions saved";
    }

    return;
  }

  const totalRegistrations = events.reduce((total, event) => {
    return total + Number(counts[String(event.id)] || 0);
  }, 0);

  if (freePortraitHistorySummary) {
    freePortraitHistorySummary.textContent = `${events.length} sessions saved · ${totalRegistrations} registrations`;
  }

  freePortraitEventsTableBody.innerHTML = events.map((event) => {
    const status = getFreePortraitEventStatus(event);
    const timeText = [formatTimeValue(event.start_time), formatTimeValue(event.end_time)]
      .filter(Boolean)
      .join(" - ") || "No time";
    const registrationCount = Number(counts[String(event.id)] || 0);

    return `
      <tr>
        <td>
          <span class="free-portrait-event-title">${escapeHtml(event.title || "Free Portrait Session")}</span>
          <span class="free-portrait-event-meta">${escapeHtml(event.session_summary || "No summary saved")}</span>
        </td>
        <td>
          <strong>${escapeHtml(event.event_date ? formatDate(event.event_date) : "No date")}</strong>
          <span class="free-portrait-event-meta">${escapeHtml(timeText)}</span>
        </td>
        <td>
          <strong>${escapeHtml(event.location_name || "No location")}</strong>
          <span class="free-portrait-event-meta">${escapeHtml(event.location_address || "No address")}</span>
        </td>
        <td>
          <span class="free-portrait-session-status ${status.className}">${escapeHtml(status.label)}</span>
        </td>
        <td>
          <span class="free-portrait-registration-count">${registrationCount}</span>
        </td>
        <td>
          <button class="detail-button edit-free-portrait-event-button" type="button" data-free-portrait-id="${escapeAttribute(event.id)}">
            Edit
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function handleFreePortraitHistoryClick(event) {
  const editButton = event.target.closest(".edit-free-portrait-event-button");

  if (!editButton) {
    return;
  }

  const eventId = editButton.dataset.freePortraitId;
  const selectedEvent = allFreePortraitEvents.find((item) => String(item.id) === String(eventId));

  if (!selectedEvent) {
    return;
  }

  currentFreePortraitEvent = selectedEvent;
  loadFreePortraitIntoForm(selectedEvent);
  freePortraitMessage.classList.remove("success");
  freePortraitMessage.textContent = "Session loaded for editing.";
}

function loadFreePortraitIntoForm(event) {
  freePortraitIdInput.value = event.id || "";
  freePortraitActiveInput.checked = Boolean(event.is_active);
  freePortraitTitleInput.value = event.title || "";
  freePortraitDateInput.value = event.event_date || "";
  freePortraitStartInput.value = event.start_time ? String(event.start_time).slice(0, 5) : "";
  freePortraitEndInput.value = event.end_time ? String(event.end_time).slice(0, 5) : "";
  freePortraitLocationNameInput.value = event.location_name || "";
  freePortraitLocationAddressInput.value = event.location_address || "";
  freePortraitLatitudeInput.value = event.latitude ?? "";
  freePortraitLongitudeInput.value = event.longitude ?? "";
  if (freePortraitCoordinatesInput) {
    freePortraitCoordinatesInput.value = event.google_maps_url || buildGoogleMapsSearchUrlFromCoordinates(event.latitude, event.longitude) || "";
  }
  freePortraitMapNoteInput.value = event.map_note || "";
  freePortraitSummaryInput.value = event.session_summary || "";
  freePortraitWhoInput.value = event.who_is_it_for || "";
  freePortraitBringInput.value = event.what_to_bring || "";
  freePortraitDeliveryInput.value = event.delivery_time || "";
  freePortraitCapacityInput.value = event.capacity_note || "";
  freePortraitWeatherInput.value = event.weather_note || "";
  freePortraitSignupInput.value = event.signup_note || "";
  freePortraitContactInput.value = event.contact_note || "";

  renderFreePortraitAdminStatus(event);
  renderFreePortraitAdminMap();
}

function clearFreePortraitForm(empty) {
  if (!freePortraitForm) {
    return;
  }

  freePortraitForm.reset();
  freePortraitIdInput.value = "";
  freePortraitActiveInput.checked = false;
  freePortraitLatitudeInput.value = "";
  freePortraitLongitudeInput.value = "";
  if (freePortraitCoordinatesInput) {
    freePortraitCoordinatesInput.value = "";
  }
  freePortraitTitleInput.value = empty ? "" : "Free Individual Portrait Session";
  freePortraitSummaryInput.value = empty ? "" : "A relaxed, one-person portrait opportunity by Memory Lane Photo Studio.";
  freePortraitWhoInput.value = empty ? "" : "One individual person at a time. This is not a family, couple or group photoshoot.";
  freePortraitBringInput.value = empty ? "" : "Wear something simple and comfortable. Bring yourself, a tidy look and an honest smile.";
  freePortraitDeliveryInput.value = empty ? "" : "Selected images may be available during the session or later the same day where possible.";
  freePortraitCapacityInput.value = empty ? "" : "Limited availability. One person per short portrait moment.";
  freePortraitWeatherInput.value = empty ? "" : "Outdoor sessions may move, change time or be postponed if weather is not suitable.";
  freePortraitSignupInput.value = empty ? "" : "Please contact us before attending so we can manage timing.";
  freePortraitContactInput.value = empty ? "" : "Use the website contact form to ask about the session.";

  renderFreePortraitAdminStatus(null);
  renderFreePortraitAdminMap();
}

async function handleFreePortraitSave(event) {
  event.preventDefault();

  const payload = buildFreePortraitPayload();

  if (!payload.title) {
    freePortraitMessage.textContent = "Please enter a session title.";
    return;
  }

  if (payload.is_active && (!payload.event_date || !payload.start_time || !payload.location_name)) {
    freePortraitMessage.textContent = "To publish a session, please enter at least date, start time and location name.";
    return;
  }

  const existingId = freePortraitIdInput.value.trim();

  freePortraitMessage.classList.remove("success");
  freePortraitMessage.textContent = "Saving free portrait session...";

  const saveFreePortraitButton = document.getElementById("saveFreePortraitButton");
  saveFreePortraitButton.disabled = true;
  saveFreePortraitButton.textContent = "Saving...";

  let response;

  if (existingId) {
    response = await supabaseClient
      .from("free_portrait_events")
      .update(payload)
      .eq("id", existingId)
      .select("*")
      .single();
  } else {
    response = await supabaseClient
      .from("free_portrait_events")
      .insert([payload])
      .select("*")
      .single();
  }

  saveFreePortraitButton.disabled = false;
  saveFreePortraitButton.textContent = "Save Free Portrait Plan";

  if (response.error) {
    freePortraitMessage.textContent = response.error.message;
    return;
  }

  currentFreePortraitEvent = response.data;
  await loadFreePortraitEvent(currentFreePortraitEvent.id);

  freePortraitMessage.classList.add("success");
  freePortraitMessage.textContent = currentFreePortraitEvent.is_active
    ? "Free portrait session saved and published."
    : "Free portrait session saved as draft.";

  setTimeout(() => {
    freePortraitMessage.classList.remove("success");
    freePortraitMessage.textContent = "";
  }, 2400);
}

async function handleFreePortraitNoPlan() {
  const confirmed = window.confirm("Unpublish the selected Free Portrait session? It will stay in session history.");

  if (!confirmed) {
    return;
  }

  const existingId = freePortraitIdInput.value.trim();

  if (!existingId) {
    freePortraitActiveInput.checked = false;
    freePortraitMessage.textContent = "No saved session selected. Choose a session from history or save this form first.";
    return;
  }

  freePortraitMessage.classList.remove("success");
  freePortraitMessage.textContent = "Unpublishing selected session...";

  const response = await supabaseClient
    .from("free_portrait_events")
    .update({ is_active: false })
    .eq("id", existingId)
    .select("*")
    .single();

  if (response.error) {
    freePortraitMessage.textContent = response.error.message;
    return;
  }

  currentFreePortraitEvent = response.data;
  await loadFreePortraitEvent(currentFreePortraitEvent.id);

  freePortraitMessage.classList.add("success");
  freePortraitMessage.textContent = "Selected Free Portrait session unpublished.";
}

function buildFreePortraitPayload() {
  const coordinates = getFreePortraitCoordinates();

  return {
    is_active: Boolean(freePortraitActiveInput.checked),
    title: freePortraitTitleInput.value.trim() || "Free Individual Portrait Session",
    event_date: freePortraitDateInput.value || null,
    start_time: freePortraitStartInput.value || null,
    end_time: freePortraitEndInput.value || null,
    location_name: freePortraitLocationNameInput.value.trim() || null,
    location_address: freePortraitLocationAddressInput.value.trim() || null,
    google_maps_url: buildGoogleMapsUrlFromInput(freePortraitCoordinatesInput ? freePortraitCoordinatesInput.value.trim() : "") || null,
    latitude: coordinates?.latitude ?? null,
    longitude: coordinates?.longitude ?? null,
    map_note: freePortraitMapNoteInput.value.trim() || null,
    session_summary: freePortraitSummaryInput.value.trim() || null,
    who_is_it_for: freePortraitWhoInput.value.trim() || null,
    what_to_bring: freePortraitBringInput.value.trim() || null,
    delivery_time: freePortraitDeliveryInput.value.trim() || null,
    capacity_note: freePortraitCapacityInput.value.trim() || null,
    weather_note: freePortraitWeatherInput.value.trim() || null,
    signup_note: freePortraitSignupInput.value.trim() || null,
    contact_note: freePortraitContactInput.value.trim() || null
  };
}

function renderFreePortraitAdminStatus(event, errorMessage) {
  if (!freePortraitStatusPreview) {
    return;
  }

  if (errorMessage) {
    freePortraitStatusPreview.innerHTML = `
      <strong>Setup needed</strong>
      <p>${escapeHtml(errorMessage)}</p>
      <p>If this says a column does not exist, run the SQL file included in the update package inside Supabase.</p>
    `;
    return;
  }

  if (!event) {
    freePortraitStatusPreview.innerHTML = `
      <strong>No session selected</strong>
      <p>Create a new session or select a saved session from the history table below.</p>
    `;
    return;
  }

  const status = getFreePortraitEventStatus(event);
  const dateText = event.event_date ? formatDate(event.event_date) : "No date";
  const timeText = [formatTimeValue(event.start_time), formatTimeValue(event.end_time)]
    .filter(Boolean)
    .join(" - ") || "No time";
  const registrationCount = Number(freePortraitRegistrationCounts[String(event.id)] || 0);

  const googleMapsUrl = buildGoogleMapsUrlFromEvent(event);
  const mapLinkMarkup = googleMapsUrl
    ? `<a class="free-portrait-preview-link" href="${escapeAttribute(googleMapsUrl)}" target="_blank" rel="noopener">Open Google Maps</a>`
    : `<p class="free-portrait-preview-warning">No Google Maps link added yet.</p>`;

  freePortraitStatusPreview.innerHTML = `
    <strong>${escapeHtml(status.label)}</strong>
    <p>${escapeHtml(event.title || "Free Portrait Session")}</p>
    <p>${escapeHtml(dateText)} · ${escapeHtml(timeText)}</p>
    <p>${escapeHtml(event.location_name || "No location set")}</p>
    <p><strong>${registrationCount}</strong> registrations counted for this session.</p>
    ${mapLinkMarkup}
  `;
}

function renderFreePortraitAdminMap() {
  if (!freePortraitMapPreview) {
    return;
  }

  const googleMapsUrl = buildGoogleMapsUrlFromInput(freePortraitCoordinatesInput ? freePortraitCoordinatesInput.value.trim() : "");

  if (!googleMapsUrl) {
    freePortraitMapPreview.innerHTML = `
      <div class="free-portrait-preview-map-empty">
        Paste the Google Maps share link for the exact location. The public page will show an “Open in Google Maps” button.
      </div>
    `;
    return;
  }

  freePortraitMapPreview.innerHTML = `
    <div class="free-portrait-preview-map-ready">
      <span>Google Maps link ready</span>
      <strong>${escapeHtml(freePortraitLocationNameInput.value.trim() || "Location selected")}</strong>
      <p>Visitors will be able to open this location directly in Google Maps.</p>
      <a class="free-portrait-preview-link" href="${escapeAttribute(googleMapsUrl)}" target="_blank" rel="noopener">
        Test Google Maps Link
      </a>
    </div>
  `;
}


function buildGoogleMapsUrlFromInput(value) {
  const raw = String(value || "").trim();

  if (!raw) {
    return "";
  }

  if (/^https?:\/\//i.test(raw)) {
    try {
      const parsedUrl = new URL(raw);
      const host = parsedUrl.hostname.toLowerCase();

      if (host.includes("google.") || host.includes("goo.gl") || host.includes("maps.app.goo.gl")) {
        return parsedUrl.href;
      }

      return "";
    } catch (error) {
      return "";
    }
  }

  const coordinates = parseCoordinatePair(raw);

  if (coordinates) {
    return buildGoogleMapsSearchUrlFromCoordinates(coordinates.latitude, coordinates.longitude);
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(raw)}`;
}

function buildGoogleMapsUrlFromEvent(event) {
  if (!event) {
    return "";
  }

  if (event.google_maps_url) {
    return buildGoogleMapsUrlFromInput(event.google_maps_url) || event.google_maps_url;
  }

  return buildGoogleMapsSearchUrlFromCoordinates(event.latitude, event.longitude);
}

function buildGoogleMapsSearchUrlFromCoordinates(latitude, longitude) {
  const lat = parseCoordinate(latitude);
  const lon = parseCoordinate(longitude);

  if (lat === null || lon === null) {
    return "";
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lon}`)}`;
}

function getFreePortraitCoordinates() {
  const coordinateText = freePortraitCoordinatesInput ? freePortraitCoordinatesInput.value.trim() : "";
  const parsedFromText = parseCoordinatePair(coordinateText);

  if (parsedFromText) {
    freePortraitLatitudeInput.value = String(parsedFromText.latitude);
    freePortraitLongitudeInput.value = String(parsedFromText.longitude);
    return parsedFromText;
  }

  const latitude = parseCoordinate(freePortraitLatitudeInput.value);
  const longitude = parseCoordinate(freePortraitLongitudeInput.value);

  if (latitude === null || longitude === null) {
    return null;
  }

  return { latitude, longitude };
}

function parseCoordinatePair(value) {
  const raw = String(value || "").trim();

  if (!raw) {
    return null;
  }

  const atMatch = raw.match(/@\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (atMatch) {
    return normaliseCoordinatePair(Number(atMatch[1]), Number(atMatch[2]));
  }

  const decimalMatches = raw.match(/-?\d+(?:\.\d+)?/g);
  if (decimalMatches && decimalMatches.length >= 2 && !/[NSEW]/i.test(raw)) {
    return normaliseCoordinatePair(Number(decimalMatches[0]), Number(decimalMatches[1]));
  }

  const dmsMatches = Array.from(raw.matchAll(/(\d+(?:\.\d+)?)\s*[°º]\s*(?:(\d+(?:\.\d+)?)\s*['’′])?\s*(?:(\d+(?:\.\d+)?)\s*(?:"|”|″))?\s*([NSEW])/gi));
  if (dmsMatches.length >= 2) {
    const first = convertDmsMatch(dmsMatches[0]);
    const second = convertDmsMatch(dmsMatches[1]);

    if (first && second) {
      const latitude = first.direction === "N" || first.direction === "S" ? first.value : second.value;
      const longitude = first.direction === "E" || first.direction === "W" ? first.value : second.value;
      return normaliseCoordinatePair(latitude, longitude);
    }
  }

  return null;
}

function convertDmsMatch(match) {
  const degrees = Number(match[1]);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const direction = String(match[4] || "").toUpperCase();

  if (!Number.isFinite(degrees) || !Number.isFinite(minutes) || !Number.isFinite(seconds) || !direction) {
    return null;
  }

  let value = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") {
    value *= -1;
  }

  return {
    value: Number(value.toFixed(7)),
    direction
  };
}

function normaliseCoordinatePair(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  let lat = latitude;
  let lon = longitude;

  if (Math.abs(lat) > 90 && Math.abs(lon) <= 90) {
    lat = longitude;
    lon = latitude;
  }

  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return null;
  }

  return {
    latitude: Number(lat.toFixed(7)),
    longitude: Number(lon.toFixed(7))
  };
}

function parseCoordinate(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);

  return Number.isFinite(parsed) ? parsed : null;
}

function formatCoordinatePair(latitude, longitude) {
  const lat = parseCoordinate(latitude);
  const lon = parseCoordinate(longitude);

  if (lat === null || lon === null) {
    return "";
  }

  return `${lat}, ${lon}`;
}

function buildOpenStreetMapEmbedUrl(latitude, longitude) {
  const lat = Number(latitude);
  const lon = Number(longitude);
  const delta = 0.006;

  const bbox = [
    lon - delta,
    lat - delta,
    lon + delta,
    lat + delta
  ].join(",");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

function formatTimeValue(value) {
  if (!value) {
    return "";
  }

  const timeParts = String(value).split(":");

  if (timeParts.length < 2) {
    return String(value);
  }

  return `${timeParts[0]}:${timeParts[1]}`;
}


function renderCharts(bookings) {
  if (typeof Chart === "undefined") {
    return;
  }

  renderStatusChart(bookings);
  renderMonthlyEnquiriesChart(bookings);
  renderMonthlyIncomeChart(bookings);
}

function renderStatusChart(bookings) {
  const canvas = document.getElementById("statusChart");

  if (!canvas) {
    return;
  }

  const counts = statusOptions.map((status) =>
    bookings.filter((booking) => (booking.status || "new") === status).length
  );

  if (statusChart) {
    statusChart.destroy();
  }

  statusChart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: statusOptions.map((status) => statusLabels[status]),
      datasets: [
        {
          data: counts,
          backgroundColor: [
            "#8a7467",
            "#b19076",
            "#d6ad60",
            "#7b826b",
            "#466b4f",
            "#8b4f45"
          ],
          borderColor: "#fffaf5",
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            color: "#2d241f",
            font: {
              family: "Inter"
            }
          }
        }
      }
    }
  });
}

function renderMonthlyEnquiriesChart(bookings) {
  const canvas = document.getElementById("monthlyEnquiriesChart");

  if (!canvas) {
    return;
  }

  const monthlyData = buildMonthlyData(bookings);

  if (monthlyEnquiriesChart) {
    monthlyEnquiriesChart.destroy();
  }

  monthlyEnquiriesChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: monthlyData.labels,
      datasets: [
        {
          label: "Enquiries",
          data: monthlyData.enquiries,
          backgroundColor: "#b19076",
          borderRadius: 8
        }
      ]
    },
    options: getStandardChartOptions()
  });
}

function renderMonthlyIncomeChart(bookings) {
  const canvas = document.getElementById("monthlyIncomeChart");

  if (!canvas) {
    return;
  }

  const monthlyData = buildMonthlyData(bookings);

  if (monthlyIncomeChart) {
    monthlyIncomeChart.destroy();
  }

  monthlyIncomeChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: monthlyData.labels,
      datasets: [
        {
          label: "Booked + completed income",
          data: monthlyData.income,
          backgroundColor: "#7b826b",
          borderRadius: 8
        }
      ]
    },
    options: getStandardChartOptions(true)
  });
}

function getStandardChartOptions(isCurrency = false) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw || 0;
            return isCurrency ? formatCurrency(value) : value;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#5d4436",
          font: {
            family: "Inter"
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#5d4436",
          font: {
            family: "Inter"
          },
          callback: (value) => isCurrency ? formatCurrency(value) : value
        },
        grid: {
          color: "rgba(81, 65, 56, 0.1)"
        }
      }
    }
  };
}

function buildMonthlyData(bookings) {
  const monthMap = new Map();

  bookings.forEach((booking) => {
    const dateValue = booking.preferred_date || booking.created_at;

    if (!dateValue) {
      return;
    }

    const date = new Date(booking.preferred_date ? `${booking.preferred_date}T00:00:00` : dateValue);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, {
        label: new Intl.DateTimeFormat("en-AU", {
          month: "short",
          year: "numeric"
        }).format(date),
        enquiries: 0,
        income: 0
      });
    }

    const month = monthMap.get(monthKey);
    const status = booking.status || "new";

    month.enquiries += 1;

    if (["booked", "completed"].includes(status)) {
      month.income += parseMoney(booking.quoted_price);
    }
  });

  const sortedMonths = Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([, value]) => value);

  return {
    labels: sortedMonths.map((month) => month.label),
    enquiries: sortedMonths.map((month) => month.enquiries),
    income: sortedMonths.map((month) => month.income)
  };
}

function destroyCharts() {
  if (statusChart) {
    statusChart.destroy();
    statusChart = null;
  }

  if (monthlyEnquiriesChart) {
    monthlyEnquiriesChart.destroy();
    monthlyEnquiriesChart = null;
  }

  if (monthlyIncomeChart) {
    monthlyIncomeChart.destroy();
    monthlyIncomeChart = null;
  }
}

function parseMoney(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return number;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function formatDateTime(value) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatDate(value) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function formatStatus(value) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function handleEscapeClose(event) {
  if (event.key !== "Escape") {
    return;
  }

  if (heroEditorModal && !heroEditorModal.classList.contains("hidden")) {
    closeHeroModal();
    return;
  }

  if (galleryEditorModal && !galleryEditorModal.classList.contains("hidden")) {
    closeGalleryModal();
    return;
  }

  if (postEditorModal && !postEditorModal.classList.contains("hidden")) {
    closePostModal();
    return;
  }

  closeBookingDetails();
}

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