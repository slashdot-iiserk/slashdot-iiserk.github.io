import { CCMembers, OBMembers } from "./memberData.js";
import { Projects } from "./memberProjects.js";

function disablePrevButton(showcaseButtons) {
  for (let i = 0; i < showcaseButtons.length; i++) {
    let someButton = showcaseButtons[i];
    if (someButton.getAttribute("value") == "white") {
      someButton.setAttribute("value", "red");
      for (let j = 0; j < someButton.children.length; j++) {
        someButton.children[j].classList.add("white");
        someButton.children[j].classList.remove("reddish");
      }
      someButton.style.backgroundColor = "transparent";
    }
  }
}
function enableButton(showcaseButton) {
  for (let i = 0; i < showcaseButton.children.length; i++) {
    showcaseButton.children[i].classList.add("reddish");
    showcaseButton.children[i].classList.remove("white");
  }
  showcaseButton.style.background = "white";
  showcaseButton.setAttribute("value", "white");
}

function validClick(showcaseButton, showcaseButtons, showcaseImage, index) {
  disablePrevButton(
    showcaseButtons
  ); /*Iterates through other buttons and deactivates previously active button */
  enableButton(showcaseButton);
  showcaseImage.style.backgroundImage = `url(${Projects[index].image})`; /* Update project image */
  showcaseImage.classList.remove(
    "showcase-change"
  ); /*Image updation animation */
  void showcaseImage.offsetWidth;
  showcaseImage.classList.add("showcase-change");
}

function funShowcase() {
  const showcaseButtons = document.querySelectorAll(".showcase-button");
  const showcaseImage = document.querySelector(".showcase-image");
  showcaseButtons.forEach((showcaseButton, index) => {
    /*Displaying project details */
    showcaseButton.children[0].innerHTML = Projects[index].name;
    showcaseButton.children[1].innerHTML = Projects[index].title;
    showcaseButton.addEventListener(
      "click",
      () => {
        if (showcaseButton.getAttribute("value") == "red") {
          /*Click is valid if button was red while clicking */
          validClick(showcaseButton, showcaseButtons, showcaseImage, index);
        }
      },
      false
    );
  });
}
funShowcase();

function returnLinks(socialLinks) {
  const linkKey = Object.keys(socialLinks);
  var socialElement = ``;
  linkKey.forEach((key, index) => {
    // console.log(socialLinks[key]);
    socialElement += `
    <div>
      <a href='${socialLinks[key]}' target="_blank" rel="noopener noreferrer">
        <i class="fa fa-${key}" ></i>  
      </a>
    </div>`;
  });
  return socialElement;
}

/**
 * Creates a card for a given person and adds it to the `root` element
 *
 * @param {HTMLDivElement} root element to which the card will be attached
 * @param {JSON} memberInfo details of the member
 * @param {string} circleColor color of circle around the image
 * @param {boolean} isOB true if the the card is being created for OB
 */
function createCard(root, memberInfo, circleColor, isOB = false) {
  const { name, image, designation, description, socialLinks } = memberInfo;
  const linkKey = Object.keys(socialLinks);
  // console.log(linkKey);
  // console.log(socialLinks, typeof(socialLinks));
  root.innerHTML += `
  <div class="tile">
    <div
      class="imgBg ${isOB ? "imgBg--large" : "imgBg--small"} popup-btn"
      style="background-image: url(./utils/images/${circleColor}_circle.svg)"
    >
      <img class="roundImg ${
        isOB ? "img--large" : "img--small"
      }" src="${image}" alt="${name}'s Picture" />
    </div>
    <div class="white" style="font-size: ${
      isOB ? "4vmin" : "2vmin"
    }">${name}</div>
    <div class="grey" style="font-size: ${
      isOB ? "2.4vmin" : "1.5vmin"
    }">${designation.toUpperCase()}</div>
  </div>
  <div class="popup-container">
    <div class="description">
    <div
      class="imgBg imgBg--large"
      style="background-image: url(./utils/images/${circleColor}_circle.svg)"
    >
      <img class="roundImg img--large" src="${image}" alt="${name}'s Picture" />
    </div>
      <div style="width: 35vw; text-align: left">
        <div class="white" style="font-size: 3vw">
          ${name}
        </div>
        <div class="reddish" style="font-size: 1.5vw">${designation.toUpperCase()}</div>
        <div class="grey" style="padding-top: 3vh; font-size: 1rem">
          ${description}
        </div>
        <div class="social">
          ${returnLinks(socialLinks)}
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Fetches the member data and adds it to DOM the core committee section in
 * alternative rows of length 6 and 5 cards.
 */
function appendMembers() {
  const CCSection = document.getElementById("CC");
  const body = getComputedStyle(document.body);
  const rowSize = parseInt(body.getPropertyValue("--row-size"));
  let rowIndex = 0;
  let index = rowSize;
  let row = document.createElement("div");
  row.className = "CCRow";
  CCSection.appendChild(row);
  while (CCMembers.length > 0) {
    if (index == 0) {
      rowIndex++;
      index = rowIndex % 2 ? rowSize - 1 : rowSize;
      row = document.createElement("div");
      row.className = "CCRow";
      CCSection.appendChild(row);
    }

    const member = CCMembers.shift();
    createCard(
      row,
      member,
      rowIndex % 3 == 1 ? "red" : rowIndex % 3 == 2 ? "blue" : "yellow"
    );
    index--;
  }
}

function appendOBs() {
  const OBSection = document.getElementById("obs");
  createCard(OBSection, OBMembers[0], "yellow", true);
  createCard(OBSection, OBMembers[1], "red", true);
  createCard(OBSection, OBMembers[2], "blue", true);
}

/**
 * Show Popup
 * @param {HTMLDivElement} popup
 */
function showPopup(popup) {
  popup.classList.add("active");
  toggleScroll();
}

/**
 * Hide Popup
 * @param {HTMLDivElemt} popup
 */
function hidePopup(popup) {
  popup.classList.remove("active");
  toggleScroll();
}
/**
 * Toggle scroll (scrolling should be disabled when popup is open)
 */
function toggleScroll() {
  document.body.classList.toggle("no-scroll");
}

appendOBs();
appendMembers();

const memberCards = document.querySelectorAll(".popup-btn");
const popups = document.querySelectorAll(".popup-container");

memberCards.forEach((card, index) =>
  card.addEventListener("click", (e) => {
    e.preventDefault();
    showPopup(popups[index]);
  })
);
popups.forEach((popup, index) =>
  popup.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("popup-container")) {
      hidePopup(popups[index]);
    } else return;
  })
);
