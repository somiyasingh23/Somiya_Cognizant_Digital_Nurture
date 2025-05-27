class Event {
  constructor(name, date, seats, category) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
  }
}
Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

const events = [];

function addEvent(name, date, seats, category) {
  events.push(new Event(name, date, seats, category));
}

const trackRegistrationByCategory = (() => {
  const counts = {};
  return (category) => {
    if (!counts[category]) counts[category] = 0;
    counts[category]++;
    return counts[category];
  };
})();

function registerUser(eventName, userName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found.");
    if (!event.checkAvailability()) throw new Error("No seats left for this event.");
    event.seats--;
    const count = trackRegistrationByCategory(event.category);
    alert(`✅ ${userName} registered for "${event.name}"! Total registered in category "${event.category}": ${count}`);
    renderEvents();
    populateDropdown();
    populateFilterCategories();
    renderMusicEvents();
  } catch (err) {
    alert(`Registration failed: ${err.message}`);
  }
}

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

  if (list.length.length === 0) {
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
    if (e.checkAvailability()) {
      const option = document.createElement("option");
      option.value = e.name;
      option.textContent = `${e.name} (${e.category}) - ${e.seats} seats`;
      select.appendChild(option);
    }
  });
}

function populateFilterCategories() {
  const filterSelect = document.getElementById("filterCategory");
  const categories = [...new Set(events.map(e => e.category))];
  filterSelect.innerHTML = `<option value="">-- Filter by Category --</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filterSelect.appendChild(opt);
  });
}

function renderMusicEvents() {
  const musicEventsDiv = document.getElementById("musicEventList");
  const musicEvents = events.filter(e => e.category.toLowerCase() === "music");
  musicEventsDiv.innerHTML = musicEvents
    .map(e => `<div class="event-card">🎵 ${e.name} - Seats Left: ${e.seats}</div>`)
    .join("");
}

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
    renderMusicEvents();
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

window.onload = () => {

  addEvent("Tree Plantation", "2025-06-01", 5, "Environment");
  addEvent("Yoga Session", "2025-06-03", 3, "Health");
  addEvent("Coding Bootcamp", "2025-06-10", 4, "Education");
  addEvent("Live Jazz Night", "2025-06-15", 10, "Music");
  addEvent("Rock Concert", "2025-06-20", 8, "Music");
  renderEvents();
  populateDropdown();
  populateFilterCategories();
  renderMusicEvents();
};
