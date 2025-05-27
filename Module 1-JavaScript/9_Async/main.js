const MOCK_API_URL = "https://mocki.io/v1/8fbd4b0f-cd56-4df7-bf1f-2f8f1d019aae";

function setLoading(isLoading) {
  document.getElementById("spinner").style.display = isLoading ? "block" : "none";
}

function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";
  if (!events || events.length === 0) {
    container.innerHTML = "<p>No events found.</p>";
    return;
  }
  events.forEach((e) => {
    const div = document.createElement("div");
    div.className = "event-card";
    div.innerHTML = `
      <strong>${e.name}</strong>
      <p>Date: ${e.date}</p>
      <p>Category: ${e.category}</p>
      <p>Seats: ${e.seats}</p>
    `;
    container.appendChild(div);
  });
}

function fetchEventsThen() {
  setLoading(true);
  fetch(MOCK_API_URL)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      setLoading(false);
      renderEvents(data.events);
    })
    .catch((error) => {
      setLoading(false);
      alert("Failed to fetch events: " + error.message);
    });
}

async function fetchEventsAsync() {
  setLoading(true);
  try {
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    setLoading(false);
    renderEvents(data.events);
  } catch (error) {
    setLoading(false);
    alert("Failed to fetch events: " + error.message);
  }
}

document.getElementById("btnThen").addEventListener("click", fetchEventsThen);
document.getElementById("btnAsync").addEventListener("click", fetchEventsAsync);
