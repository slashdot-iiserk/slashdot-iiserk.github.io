import { Projects } from "./showcaseData.js";


function createCard(root, projectInfo) {
    const { projectName, image, desc, author } = projectInfo;
    root.innerHTML += `
    <div class="project">
        <div class="card">
            <img class="projectImg" src="${image}" alt="">
            <h1 class="projectName">${projectName.toUpperCase()}</h1>
            <p class="projectDesc">${desc}</p>
        </div>
    </div>
    `
}

function showcaseProjects() {
	const showcaseDiv = document.getElementById("showcaseContainer");
	let rowIndex = 0;
	let index = 0;
	let limit = 2;
	let row = document.createElement("div");
	for (let index = 0; index < Projects.length; index++) {
		var proj = Projects[index];
		// console.log(proj,index % limit == 0);
		if(index % limit == 0) {
			row = document.createElement("div");
			row.className = "projectRow";
			showcaseDiv.appendChild(row);
		};
		
		createCard(
			row,
			proj,

		);

	}
}

showcaseProjects();