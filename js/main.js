import { CCMembers } from "./memberData.js";

/**
 * Creates a card for a given person and adds it to the `root` element
 *
 * @param {HTMLDivElement} root element to which the card will be attached
 * @param {JSON} memberInfo details of the member
 * @param {string} circleColor color of circle around the image
 */
function createCard(root, memberInfo, circleColor) {
  const { name, image, designation } = memberInfo;
  root.innerHTML += `
  <div class="CCCard">
    <div
      class="CCImgBg"
      style="background-image: url(./utils/images/${circleColor}_circle.svg)"
    >
      <img class="CCImg" src="${image}" alt="${name}'s Picture" />
    </div>
    <div class="white" style="font-size: 2vh">${name}</div>
    <div class="grey" style="font-size: 1.5vh">${designation.toUpperCase()}</div>
  </div>`;
}

/**
 * Fetches the member data and adds it to DOM the core committee section in
 * alternative rows of length 6 and 5 cards.
 */
function appendMembers() {
  const CCSection = document.getElementById("CC");
  let rowIndex = 0;
  let index = 6;
  let row = document.createElement("div");
  row.className = "CCRow";
  CCSection.appendChild(row);
  while (CCMembers) {
    if (index == 0) {
      rowIndex++;
      index = rowIndex % 2 ? 5 : 6;
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

appendMembers();
