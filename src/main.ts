import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing game";
document.title = gameName;

// Create a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button
const button = document.createElement("button");
button.innerHTML = "Press Me!";
button.classList.add("myButton");
app.append(button);
