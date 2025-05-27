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
  renderEvents();
  populateFilterCategories();
}

// Closure to track registration counts by category
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
    const event = events.find((e) => e.name === eventName);
    if (!event) throw new Error("Event not found.");
    if (!event.checkAvailability()) throw new Error("No seats left.");

    event.seats--;
    const count = trackRegistrationByCategory(event.category);
    alert(
      `✅ ${userName} registered for "${event.name}"! Total in category "${event.category}": ${count}`
    );
    renderEvents();
    populateFilterCategories();
  } catch (err) {
    alert(`Registration failed: ${err.message}`);
  }
}

function cancelRegistration(eventName, userName) {
  const event = events.find((e) => e.name === eventName);
  if (!event) {
    alert("Event not found.");
    return;
  }
  event.seats++;
  alert(
    `❌ ${userName} cancelled registration for "${event.name}". Seats left: ${event.seats}`
  );
  renderEvents();
  populateFilterCategories();
}

function filterEventsByCategory(category, callback) {
  if (!category) {
    callback(events);
    return;
  }
  const filtered = events.filter(
    (e) =>
      e.category.toLowerCase() === category.toLowerCase() && e.seats > 0
  );
  callback(filtered);
}

function renderEvents(filteredEvents) {
  const container = document.querySelector("#eventList");
  container.innerHTML = "";

  const list = filteredEvents || events;

  if (list.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No events to display.</p>";
    return;
  }

  // Use .map() to create event cards content
  list
    .map((e) => {
      const card = document.createElement("div");
      card.className = "event-card";

      const title = document.createElement("strong");
      title.textContent = e.name;

      const date = document.createElement("p");
      date.textContent = `Date: ${e.date}`;

      const category = document.createElement("p");
      category.textContent = `Category: ${e.category}`;

      const seats = document.createElement("p");
      seats.textContent = `Seats Left: ${e.seats}`;

      const registerBtn = document.createElement("button");
      registerBtn.textContent = "Register";
      registerBtn.disabled = !e.checkAvailability();
      registerBtn.onclick = () => {
        const userName = prompt("Enter your name to register:");
        if (userName && userName.trim() !== "") {
          registerUser(e.name, userName.trim());
        }
      };

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel Registration";
      cancelBtn.onclick = () => {
        const userName = prompt("Enter your name to cancel registration:");
        if (userName && userName.trim() !== "") {
          cancelRegistration(e.name, userName.trim());
        }
      };

      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(category);
      card.appendChild(seats);
      card.appendChild(registerBtn);
      card.appendChild(cancelBtn);

      return card;
    })
    .forEach((card) => container.appendChild(card));
}

function populateFilterCategories() {
  const filterSelect = document.querySelector("#filterCategory");
  // Unique categories from events
  const categories = [...new Set(events.map((e) => e.category))];
  filterSelect.innerHTML = `<option value="">-- Filter by Category --</option>`;
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filterSelect.appendChild(opt);
  });
}

document.querySelector("#addEventForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#eventName").value.trim();
  const date = document.querySelector("#eventDate").value;
  const seats = parseInt(document.querySelector("#eventSeats").value);
  const category = document.querySelector("#eventCategory").value.trim();

  if (name && date && seats > 0 && category) {
    addEvent(name, date, seats, category);
    e.target.reset();
    alert(`✅ Event "${name}" added successfully!`);
  }
});

document.querySelector("#filterCategory").addEventListener("change", (e) => {
  const category = e.target.value;
  filterEventsByCategory(category, renderEvents);
});

// Sample initial events
addEvent("Tree Plantation", "2025-06-01", 5, "Environment");
addEvent("Yoga Session", "2025-06-03", 3, "Health");
addEvent("Coding Bootcamp", "2025-06-10", 4, "Education");
addEvent("Blood Donation", "2025-05-25", 0, "Health");
