
//basically makes a div inside the one already there with the text content inside it
const helloFromJS = document.querySelector("#helloFromJS");
const helloContent = document.createElement("div");
helloContent.classList.add("helloContent");
helloContent.textContent = "Hello this text is from JS!";
helloFromJS.appendChild(helloContent);


const redText = document.querySelector("#redText");
const redContent = document.createElement("p");
document.getElementById("redText").style.color="red";
redContent.classList.add("redContent");
redContent.textContent = "this text should be red...";
redText.appendChild(redContent);


const customisation = document.querySelector("#customisation");
document.getElementById("customisation").style.backgroundColor="pink";
document.getElementById("customisation").style.border="black";

const h1 = document.createElement("h1");
h1.classList.add("h1");
h1.textContent = "CSS and H1 tag from JS";

const p = document.createElement("p");
p.classList.add("p");
p.textContent = "p";

customisation.appendChild(h1);
customisation.appendChild(p);


//buttons with reactions

const helloButton = document.querySelector("#helloButton");
helloButton.onclick = () => alert("button works!");

