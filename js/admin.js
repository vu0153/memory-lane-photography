const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const logoutButton = document.getElementById("logoutButton");
const refreshBookingsButton = document.getElementById("refreshBookingsButton");
const bookingsTableBody = document.getElementById("bookingsTableBody");
const dashboardMessage = document.getElementById("dashboardMessage");
const totalBookings = document.getElementById("totalBookings");
const newBookings = document.getElementById("newBookings");
const lastUpdated = document.getElementById("lastUpdated");
const bookingSearchInput = document.getElementById("bookingSearchInput");
const statusFilterSelect = document.getElementById("statusFilterSelect");
const clearFiltersButton = document.getElementById("clearFiltersButton");

const quotedPipelineValue = document.getElementById("quotedPipelineValue");
const bookedRevenueValue = document.getElementById("bookedRevenueValue");
const completedRevenueValue = document.getElementById("completedRevenueValue");
const averageDealValue = document.getElementById("averageDealValue");

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

let allBookings = [];
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
  refreshBookingsButton.addEventListener("click", loadBookings);
  bookingsTableBody.addEventListener("change", handleStatusChange);
  bookingsTableBody.addEventListener("click", handleBookingTableClick);
  bookingSearchInput.addEventListener("input", applyFilters);
  statusFilterSelect.addEventListener("change", applyFilters);
  clearFiltersButton.addEventListener("click", clearFilters);
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
  await loadBookings();
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
  await loadBookings();
}

async function handleLogout() {
  await supabaseClient.auth.signOut();

  allBookings = [];
  activeDetailBookingId = null;
  bookingSearchInput.value = "";
  statusFilterSelect.value = "all";

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
      <td colspan="8" class="empty-state">Login to load bookings.</td>
    </tr>
  `;

  closeBookingDetails();
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
        <td colspan="8" class="empty-state">Unable to load bookings.</td>
      </tr>
    `;

    return;
  }

  allBookings = data || [];

  updateSummary(allBookings);
  updateStatistics(allBookings);
  renderCharts(allBookings);
  applyFilters();

  dashboardMessage.textContent = "";
}

function applyFilters() {
  const searchTerm = bookingSearchInput.value.trim().toLowerCase();
  const statusFilter = statusFilterSelect.value;

  const filteredBookings = allBookings.filter((booking) => {
    const bookingStatus = booking.status || "new";

    const matchesStatus =
      statusFilter === "all" || bookingStatus === statusFilter;

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

    return matchesStatus && matchesSearch;
  });

  renderBookings(filteredBookings);
}

function clearFilters() {
  bookingSearchInput.value = "";
  statusFilterSelect.value = "all";
  applyFilters();
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
        <td colspan="8" class="empty-state">No bookings found.</td>
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
      </tr>
    `;
  }).join("");
}

function handleBookingTableClick(event) {
  if (!event.target.classList.contains("detail-button")) {
    return;
  }

  const bookingId = event.target.dataset.bookingId;
  const booking = allBookings.find((item) => String(item.id) === String(bookingId));

  if (!booking) {
    return;
  }

  openBookingDetails(booking);
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

function handleEscapeClose(event) {
  if (event.key === "Escape") {
    closeBookingDetails();
  }
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