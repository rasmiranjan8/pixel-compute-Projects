document
  .getElementById("event-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const eventName = document.getElementById("event-name").value;
    const eventDate = document.getElementById("event-date").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const eventDesc = document.getElementById("event-description").value;
    const location = document.getElementById("location").value;

    // Update invitation details
    document.getElementById("invite-title").textContent = eventName;
    document.getElementById("invite-date").textContent = eventDate;
    document.getElementById(
      "invite-time"
    ).textContent = `${startTime} - ${endTime}`;
    document.getElementById("invite-location").textContent = location;
    document.getElementById("invite-description").textContent = eventDesc;

    // Show the invite container
    document.getElementById("invite-container").style.display = "block";
  });
