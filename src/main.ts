import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Crystal Miner";
document.title = gameName;

// Create a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button
const button = document.createElement("button");
button.innerHTML = "Mine Crystal!";
button.classList.add("myButton");

// Append the button to the app container
app.append(button);

const countDisplay = document.createElement("p");
let crystalCount = 0;
countDisplay.innerHTML = `Crystals: ${crystalCount}`;
app.append(countDisplay);

// Create buttons for upgrades: A, B, C
const aButton = document.createElement("button");
aButton.innerHTML =
  "Buy Pickaxe (Costs 10 crystals, Provides 0.1 crystals/sec)";
aButton.disabled = true;
app.append(aButton);

const bButton = document.createElement("button");
bButton.innerHTML = "Buy Drill (Costs 100 crystals, Provides 2.0 crystals/sec)";
bButton.disabled = true;
app.append(bButton);

const cButton = document.createElement("button");
cButton.innerHTML =
  "Buy Excavator (Costs 1000 crystals, Provides 50 crystals/sec)";
cButton.disabled = true;
app.append(cButton);

// Create a display for the current income rate
const incomeDisplay = document.createElement("p");
let incomePerSecond = 0;
incomeDisplay.innerHTML = `Crystals per second: ${incomePerSecond.toFixed(1)}`;
app.append(incomeDisplay);

// Create a display for upgrades owned
const upgradesOwned = document.createElement("p");
upgradesOwned.innerHTML = `Upgrades owned: Pickaxes: 0, Drills: 0, Excavators: 0`;
app.append(upgradesOwned);

// Define the upgrade costs and properties
const upgrades = {
  A: { baseCost: 10, currentCost: 10, income: 0.1, owned: 0 },
  B: { baseCost: 100, currentCost: 100, income: 2.0, owned: 0 },
  C: { baseCost: 1000, currentCost: 1000, income: 50.0, owned: 0 },
};

// Price multiplier for increased costs
const priceMultiplier = 1.15;

// Button click event to mine crystals manually
button.addEventListener("click", () => {
  crystalCount++;
  countDisplay.innerHTML = `Crystals: ${crystalCount}`;
  checkUpgradeAvailability(); // Check if upgrades are affordable
});

// Function to check if upgrades can be purchased
function checkUpgradeAvailability() {
  aButton.disabled = crystalCount < upgrades.A.currentCost;
  bButton.disabled = crystalCount < upgrades.B.currentCost;
  cButton.disabled = crystalCount < upgrades.C.currentCost;

  // Update the button text to reflect current costs
  aButton.innerHTML = `Buy Pickaxe (Costs ${upgrades.A.currentCost.toFixed(2)} crystals, Provides 0.1 crystals/sec)`;
  bButton.innerHTML = `Buy Drill (Costs ${upgrades.B.currentCost.toFixed(2)} crystals, Provides 2.0 crystals/sec)`;
  cButton.innerHTML = `Buy Excavator (Costs ${upgrades.C.currentCost.toFixed(2)} crystals, Provides 50 crystals/sec)`;
}

// Function to update the status display
function updateStatusDisplay() {
  upgradesOwned.innerHTML = `Upgrades owned: Pickaxes: ${upgrades.A.owned}, Drills: ${upgrades.B.owned}, Excavators: ${upgrades.C.owned}`;
  incomeDisplay.innerHTML = `Crystals per second: ${incomePerSecond.toFixed(1)}`;
}

// Function to handle purchasing an upgrade
function purchaseUpgrade(upgrade: keyof typeof upgrades) {
  const upgradeData = upgrades[upgrade];
  if (crystalCount >= upgradeData.currentCost) {
    crystalCount -= upgradeData.currentCost;
    incomePerSecond += upgradeData.income;
    upgradeData.owned++;
    countDisplay.innerHTML = `Crystals: ${crystalCount}`;

    // Increase the cost for the next purchase
    upgradeData.currentCost *= priceMultiplier;

    updateStatusDisplay();
    checkUpgradeAvailability();
  }
}

// Add event listeners to upgrade buttons
aButton.addEventListener("click", () => purchaseUpgrade("A"));
bButton.addEventListener("click", () => purchaseUpgrade("B"));
cButton.addEventListener("click", () => purchaseUpgrade("C"));

// Automatically increment crystals per second
setInterval(() => {
  crystalCount += incomePerSecond;
  countDisplay.innerHTML = `Crystals: ${crystalCount.toFixed(1)}`;
  checkUpgradeAvailability();
}, 1000); // Runs every second to add income
