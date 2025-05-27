
const today = new Date("2025-05-27");
const events = [
    { name: "Tree Plantation Drive", date: "2025-05-30", seats: 5 },
    { name: "Blood Donation Camp", date: "2025-05-15", seats: 10 }, // Past event
    { name: "Art Workshop", date: "2025-06-10", seats: 0 },         // Full
    { name: "Yoga Session", date: "2025-06-01", seats: 2 }
];

function displayValidEvents() {
    const eventList = document.getElementById("eventList");

    events.forEach((event, index) => {
        const eventDate = new Date(event.date);

    
        if (eventDate >= today && event.seats > 0) {
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>${event.name}</strong> - ${event.date} - Seats: ${event.seats}
                <button onclick="register(${index})">Register</button></p>
            `;
            eventList.appendChild(div);
        }
    });
}

function register(index) {
    try {
        const event = events[index];

        if (event.seats <= 0) {
            throw new Error("No seats available.");
        }

        event.seats--;  
        alert(`Registered for ${event.name}. Seats left: ${event.seats}`);

    
        document.getElementById("eventList").innerHTML = "";
        displayValidEvents();
    } catch (err) {
        console.error("Registration error:", err.message);
        alert("Registration failed: " + err.message);
    }
}

window.onload = function () {
    alert("Page is fully loaded!");
    displayValidEvents();
};
