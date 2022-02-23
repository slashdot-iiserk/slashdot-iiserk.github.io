import { Projects } from "./showcaseData.js";

function createCard(root, projectInfo) {
  const { projectName, image, desc, author } = projectInfo;
  root.innerHTML += `
        <div class="card">
            <img class="projectImg" src="${image}" alt="">
            <h1 class="projectName">${projectName.toUpperCase()}</h1>
            <p class="projectDesc">${desc}</p>
        </div>
    `;
}

function showcaseProjects(divName) {
  let row = document.getElementById(divName);
  for (let index = 0; index < Projects.length; index++) {
    var proj = Projects[index];
    createCard(row, proj);
  }
}

showcaseProjects("showcaseContainer");
// showcaseProjects("showcaseContainerPhone");
