import { pastEvents, upcomingEvents } from "./eventDetails.js";

function pastEventsUpdater() {
  let eventBoxes = document.querySelectorAll(".past-event-boxes")[0];
  for (let index = 0; index < pastEvents.length; index++) {
    const newEvent = `<img src="${pastEvents[index].image}" alt="" class="past-event-image">
    <div class="past-event-details">
      <p class="past-event-topic">${pastEvents[index].name}</p>
      <p class="past-event-desc">${pastEvents[index].description}</p>
    </div>`;
  const newElement = document.createElement('div');
  newElement.classList.add('past-event-box');
  newElement.innerHTML = newEvent;
    eventBoxes.insertAdjacentElement('beforeend', newElement);
  }
}
pastEventsUpdater();

function upcomingEventsUpdater() {
  let eventBoxes = document.querySelectorAll(".upcoming-event-boxes")[0];
  if(upcomingEvents.length == 0) {
    const newElement = document.createElement('div');
    newElement.innerHTML = `<div class="coming-soon">COMING SOON</div>`;
    eventBoxes.insertAdjacentElement('beforeend', newElement);
  }
  for (let index = 0; index < upcomingEvents.length; index++) {
    const newEvent = `<p class="upcoming-event-topic">${upcomingEvents[index].name}</p>
    <div class="event-line"></div>
    <p class="next-session">${upcomingEvents[index].date}</p>
    <p class="venue">${upcomingEvents[index].venue}</p>`;
    const newElement = document.createElement('div');
    newElement.classList.add('upcoming-event-box');
    newElement.innerHTML = newEvent;
    eventBoxes.insertAdjacentElement('beforeend', newElement);
  }
}
upcomingEventsUpdater();