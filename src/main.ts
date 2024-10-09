import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing cock";
document.title = gameName;

// Create a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button
const button = document.createElement("button");
button.innerHTML = "Press Me!";
button.classList.add("myButton"); // Optional: Add a class for styling

// Append the button to the app container
app.append(button);



const Count = document.createElement("p");
let pressCount = 0;
Count.innerHTML = `Button pressed: ${pressCount}`;
app.append(Count);

// Add an event listener for the button
button.addEventListener("click", () => {
    pressCount++;
    Count.innerHTML = `Button pressed: ${pressCount}`;
});
