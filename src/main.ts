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
upgradeAButton.innerHTML = "Buy A (Costs 5 units, Provides 0.1 units/sec)";
upgradeAButton.classList.add("upgradeButton");
upgradeAButton.disabled = true;
app.append(upgradeAButton);

const upgradeBButton = document.createElement("button");
upgradeBButton.innerHTML = "Buy B (Costs 50 units, Provides 2.0 units/sec)";
upgradeBButton.classList.add("upgradeButton");
upgradeBButton.disabled = true;
app.append(upgradeBButton);

const upgradeCButton = document.createElement("button");
upgradeCButton.innerHTML = "Buy C (Costs 500 units, Provides 50 units/sec)";
upgradeCButton.classList.add("upgradeButton");
upgradeCButton.disabled = true;
app.append(upgradeCButton);

// Create a status display for items owned
const statusDisplay = document.createElement("p");
statusDisplay.innerHTML = `Upgrades owned: A: 0, B: 0, C: 0`;
app.append(statusDisplay);

// Upgrade cost and rate definitions with initial prices
const upgrades = {
  A: { baseCost: 5, currentCost: 5, income: 0.1, owned: 0 },
  B: { baseCost: 50, currentCost: 50, income: 2.0, owned: 0 },
  C: { baseCost: 500, currentCost: 500, income: 50.0, owned: 0 }
};

// Price multiplier factor
const priceMultiplier = 1.15;

// Add an event listener for the main press button
button.addEventListener("click", () => {
  pressCount++;
  Count.innerHTML = `Button pressed: ${pressCount}`;
  checkUpgradeAvailability(); // Check if any upgrade buttons should be enabled
});

// Function to check if upgrades can be purchased
function checkUpgradeAvailability() {
  upgradeAButton.disabled = pressCount < upgrades.A.currentCost;
  upgradeBButton.disabled = pressCount < upgrades.B.currentCost;
  upgradeCButton.disabled = pressCount < upgrades.C.currentCost;

  // Update button text to show current costs
  upgradeAButton.innerHTML = `Buy A (Costs ${upgrades.A.currentCost.toFixed(2)} units, Provides 0.1 units/sec)`;
  upgradeBButton.innerHTML = `Buy B (Costs ${upgrades.B.currentCost.toFixed(2)} units, Provides 2.0 units/sec)`;
  upgradeCButton.innerHTML = `Buy C (Costs ${upgrades.C.currentCost.toFixed(2)} units, Provides 50 units/sec)`;
}

// Function to update the status display
function updateStatusDisplay() {
  statusDisplay.innerHTML = `Upgrades owned: A: ${upgrades.A.owned}, B: ${upgrades.B.owned}, C: ${upgrades.C.owned}`;
  incomeDisplay.innerHTML = `Income per second: ${incomePerSecond.toFixed(1)} units/sec`;
}

// Function to handle purchasing an upgrade
function purchaseUpgrade(upgrade: keyof typeof upgrades) {
  const upgradeData = upgrades[upgrade];
  if (pressCount >= upgradeData.currentCost) {
    pressCount -= upgradeData.currentCost;
    incomePerSecond += upgradeData.income;
    upgradeData.owned++; // Increase the number of owned upgrades
    Count.innerHTML = `Button pressed: ${pressCount}`;
    
    // Increase the cost of the upgrade for the next purchase
    upgradeData.currentCost *= priceMultiplier;
    
    updateStatusDisplay(); // Update status display for owned items and income
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
