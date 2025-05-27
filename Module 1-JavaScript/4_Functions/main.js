const events = [];

function addEvent(name, date, seats, category) {
  events.push({ name, date, seats, category });
}

// Closure to track registrations by category
const trackRegistrationByCategory = (() => {
  const counts = {};
  return category => {
    if (!counts[category]) counts[category] = 0;
    counts[category]++;
    return counts[category];
  };
})();

function registerUser(eventName, userName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found.");
    if (event.seats <= 0) throw new Error("No seats left for this event.");

    event.seats--;
    const count = trackRegistrationByCategory(event.category);
    alert(`✅ ${userName} registered for "${event.name}"! Total registered in category "${event.category}": ${count}`);
    renderEvents();
    populateDropdown();
    populateFilterCategories();
  } catch (err) {
    alert(`Registration failed: ${err.message}`);
  }
}

// Callback filter function for dynamic category filtering
function filterEventsByCategory(category, callback) {
  if (!category) {
    callback(events);
    return;
  }
  const filtered = events.filter(e => e.category.toLowerCase() === category.toLowerCase() && e.seats > 0);
  callback(filtered);
}

function renderEvents(filteredEvents) {
  const container = document.getElementById("eventList");
  container.innerHTML = "";

  const list = filteredEvents || events;

  if (list.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No events to display.</p>";
    return;
  }

  list.forEach(e => {
    const div = document.createElement("div");
    div.className = "event-card";
    div.innerHTML = `
      <strong>${e.name}</strong>
      Date: ${e.date}<br />
      Category: ${e.category}<br />
      Seats Left: ${e.seats}
    `;
    container.appendChild(div);
  });
}

function populateDropdown() {
  const select = document.getElementById("eventSelect");
  select.innerHTML = "";
  events.forEach(e => {
    if (e.seats > 0) {
      const option = document.createElement("option");
      option.value = e.name;
      option.textContent = `${e.name} (${e.category}) - ${e.seats} seats`;
      select.appendChild(option);
    }
  });
}

function populateFilterCategories() {
  const filterSelect = document.getElementById("filterCategory");
  // Collect unique categories from events
  const categories = [...new Set(events.map(e => e.category))];
  filterSelect.innerHTML = `<option value="">-- Filter by Category --</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filterSelect.appendChild(opt);
  });
}

// Event listeners
document.getElementById("addEventForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("eventName").value.trim();
  const date = document.getElementById("eventDate").value;
  const seats = parseInt(document.getElementById("eventSeats").value);
  const category = document.getElementById("eventCategory").value.trim();

  if (name && date && seats > 0 && category) {
    addEvent(name, date, seats, category);
    renderEvents();
    populateDropdown();
    populateFilterCategories();
    e.target.reset();
    alert(`✅ Event "${name}" added successfully!`);
  }
});

document.getElementById("registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("userName").value.trim();
  const selectedEvent = document.getElementById("eventSelect").value;
  if (user && selectedEvent) {
    registerUser(selectedEvent, user);
    e.target.reset();
  }
});

document.getElementById("filterCategory").addEventListener("change", e => {
  const category = e.target.value;
  filterEventsByCategory(category, renderEvents);
});

// Sample events on load
addEvent("Tree Plantation", "2025-06-01", 5, "Environment");
addEvent("Yoga Session", "2025-06-03", 3, "Health");
addEvent("Coding Bootcamp", "2025-06-10", 4, "Education");
addEvent("Blood Donation", "2025-05-25", 0, "Health");

window.onload = () => {
  renderEvents();
  populateDropdown();
  populateFilterCategories();
};
