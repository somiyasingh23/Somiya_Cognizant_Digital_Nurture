const eventName = "Community Meetup";
const eventDate = "2025-06-15";
let availableSeats = 100;

function updateEventInfo() {
    const info = `📅 Event: ${eventName} | 🗓 Date: ${eventDate} | 🎫 Available Seats: ${availableSeats}`;
    document.getElementById('eventInfo').textContent = info;
    console.log(info); 
}


function registerSeat() {
    if (availableSeats > 0) {
        availableSeats--; 
        updateEventInfo();
    } else {
        alert("Sorry! No more seats available.");
    }
}

function cancelSeat() {
    availableSeats++; 
    updateEventInfo();
}

window.onload = function() {
    alert("Page is fully loaded!");
    updateEventInfo();
}
