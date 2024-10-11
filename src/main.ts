import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing game";
document.title = gameName;

// Create a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button for manual presses
const button = document.createElement("button");
button.innerHTML = "Press Me!";
button.classList.add("myButton");
app.append(button);

// Create a counter display for button presses
const Count = document.createElement("p");
let pressCount = 0;
Count.innerHTML = `Button pressed: ${pressCount}`;
app.append(Count);

// Create a counter display for income per second
const incomeDisplay = document.createElement("p");
let incomePerSecond = 0;
incomeDisplay.innerHTML = `Income per second: ${incomePerSecond.toFixed(1)} units/sec`;
app.append(incomeDisplay);

// Create upgrade buttons for items A, B, and C
const upgradeAButton = document.createElement("button");
upgradeAButton.innerHTML = "Buy A (Costs 10 units, Provides 0.1 units/sec)";
upgradeAButton.classList.add("upgradeButton");
upgradeAButton.disabled = true;
app.append(upgradeAButton);

const upgradeBButton = document.createElement("button");
upgradeBButton.innerHTML = "Buy B (Costs 100 units, Provides 2.0 units/sec)";
upgradeBButton.classList.add("upgradeButton");
upgradeBButton.disabled = true;
app.append(upgradeBButton);

const upgradeCButton = document.createElement("button");
upgradeCButton.innerHTML = "Buy C (Costs 1000 units, Provides 50 units/sec)";
upgradeCButton.classList.add("upgradeButton");
upgradeCButton.disabled = true;
app.append(upgradeCButton);

// Upgrade cost and rate definitions
const upgrades = {
  A: { cost: 10, income: 0.1 },
  B: { cost: 100, income: 2.0 },
  C: { cost: 1000, income: 50.0 }
};

// Add an event listener for the main press button
button.addEventListener("click", () => {
  pressCount++;
  Count.innerHTML = `Button pressed: ${pressCount}`;
  checkUpgradeAvailability(); // Check if any upgrade buttons should be enabled
});

// Function to check if upgrades can be purchased
function checkUpgradeAvailability() {
  upgradeAButton.disabled = pressCount < upgrades.A.cost;
  upgradeBButton.disabled = pressCount < upgrades.B.cost;
  upgradeCButton.disabled = pressCount < upgrades.C.cost;
}

// Function to handle purchasing an upgrade
function purchaseUpgrade(upgrade: keyof typeof upgrades) {
  const upgradeData = upgrades[upgrade];
  if (pressCount >= upgradeData.cost) {
    pressCount -= upgradeData.cost;
    incomePerSecond += upgradeData.income;
    Count.innerHTML = `Button pressed: ${pressCount}`;
    incomeDisplay.innerHTML = `Income per second: ${incomePerSecond.toFixed(1)} units/sec`;
    checkUpgradeAvailability();
  }
}

// Add event listeners for upgrade buttons
upgradeAButton.addEventListener("click", () => purchaseUpgrade('A'));
upgradeBButton.addEventListener("click", () => purchaseUpgrade('B'));
upgradeCButton.addEventListener("click", () => purchaseUpgrade('C'));

// Start auto-income generation
setInterval(() => {
  pressCount += incomePerSecond;
  Count.innerHTML = `Button pressed: ${pressCount.toFixed(1)}`;
  checkUpgradeAvailability();
}, 1000);  // Increment every second based on income per second
