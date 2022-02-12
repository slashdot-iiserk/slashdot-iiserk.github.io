import { pastEvents, upcomingEvents } from "./eventDetails.js";

function pastEventsUpdater() {
  let eventBoxes = document.querySelectorAll(".past-event-box");
  let eventTopics = document.querySelectorAll(".past-event-topic");
  let eventImages = document.querySelectorAll(".past-event-image");
  let eventDescs = document.querySelectorAll(".past-event-desc");
  for (let index = 0; index < eventBoxes.length; index++) {
    eventTopics[index].innerText = pastEvents[index]["name"];
    eventDescs[index].innerText = pastEvents[index]["description"];
    eventImages[index].src = pastEvents[index]["image"];
  }
}
pastEventsUpdater();

function upcomingEventsUpdater() {
  let eventBoxes = document.querySelectorAll(".eventbox");
  let eventTopics = document.querySelectorAll(".event-topic");
  let eventDates = document.querySelectorAll(".event-date");
  let eventVenues = document.querySelectorAll(".event-venue");
  for (let index = 0; index < eventBoxes.length; index++) {
    eventTopics[index].innerText = upcomingEvents[index]["name"];
    eventDates[index].innerText =
      "Next Session: " + upcomingEvents[index]["date"];
    eventVenues[index].innerText = "Venue: " + upcomingEvents[index]["venue"];
  }
}
upcomingEventsUpdater();
