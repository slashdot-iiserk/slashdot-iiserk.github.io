import { CCMembers } from "./memberData.js";
import { Projects } from "./memberProjects.js";

function disablePrevButton(showcaseButtons){
  for(let i = 0; i < showcaseButtons.length; i++){
    let someButton = showcaseButtons[i];
    if (someButton.getAttribute("value") == "white"){
      someButton.setAttribute("value", "red");
      for(let j=0; j < someButton.children.length; j++){
        someButton.children[j].classList.add("white");
        someButton.children[j].classList.remove("reddish");
      }
      someButton.style.background = "linear-gradient(180deg, #E43B6E 5.72%, #FF8370 90.17%)";          
    }
  }
}
function enableButton(showcaseButton){
  for(let i=0; i < showcaseButton.children.length; i++){
    showcaseButton.children[i].classList.add("reddish");
    showcaseButton.children[i].classList.remove("white");
  }
  showcaseButton.style.background = "white";
  showcaseButton.setAttribute("value", "white");
}

function validClick(showcaseButton, showcaseButtons, showcaseImage, index){
  disablePrevButton(showcaseButtons);   /*Iterates through other buttons and deactivates previously active button */
  enableButton(showcaseButton);
  showcaseImage.style.backgroundImage = `url(${Projects[index].image})`;  /* Update project image */
  showcaseImage.classList.remove("showcase-change");         /*Image updation animation */
  void showcaseImage.offsetWidth;
  showcaseImage.classList.add("showcase-change");
}

function funShowcase(){
  const showcaseButtons = document.querySelectorAll(".showcase-button");
  const showcaseImage = document.querySelector(".showcase-image");
  showcaseButtons.forEach((showcaseButton, index) => {            /*Displaying project details */
    showcaseButton.children[0].innerHTML = Projects[index].name;
    showcaseButton.children[1].innerHTML = Projects[index].title; 
    showcaseButton.addEventListener("click", () => {              
      if(showcaseButton.getAttribute("value") == "red"){          /*Click is valid if button was red while clicking */       
        validClick(showcaseButton, showcaseButtons, showcaseImage, index);
      }
    }, false);
  });
}
funShowcase();

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
