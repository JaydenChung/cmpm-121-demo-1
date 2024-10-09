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

// Create a counter display
const Count = document.createElement("p");
let pressCount = 0;
Count.innerHTML = `Button pressed: ${pressCount}`;
app.append(Count);

// Create an upgrade button (for auto-press)
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Auto-Press (Costs 10 Presses)";
upgradeButton.classList.add("upgradeButton");
upgradeButton.disabled = true; // Initially disabled until the player has enough presses
app.append(upgradeButton);


// Function to check if the upgrade can be purchased
function checkUpgradeAvailability() {
  if (pressCount >= 10) {
    upgradeButton.disabled = false;
  } else {
    upgradeButton.disabled = true;
  }
}

// Add an event listener for the manual press button
button.addEventListener("click", () => {
  pressCount++;
  Count.innerHTML = `Button pressed: ${pressCount}`;
  checkUpgradeAvailability(); // Check if the upgrade button should be enabled
});

// Add an event listener for the upgrade button
upgradeButton.addEventListener("click", () => {
  if (pressCount >= 10) {
    pressCount -= 10; // Deduct the cost of the upgrade
    
    Count.innerHTML = `Button pressed: ${pressCount}`;

    checkUpgradeAvailability(); // Check again if the button needs to be disabled

    // Start auto-pressing the button every 5 seconds
    setInterval(() => {
      pressCount++;
      Count.innerHTML = `Button pressed: ${pressCount}`;
      checkUpgradeAvailability(); // Keep checking in case press count changes
    }, 5000);

    upgradeButton.disabled = true; // Disable upgrade button after purchasing
  }
});
