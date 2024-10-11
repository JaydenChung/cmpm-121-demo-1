import "./style.css";

// Item interface (added 'owned' property)
interface Item {
  name: string,
  cost: number,
  rate: number,
  owned: number // Tracks how many of each item the player owns
};

// Available items (Pickaxe, Drill, Excavator)
const availableItems: Item[] = [
  { name: "Pickaxe", cost: 10, rate: 0.1, owned: 0 },
  { name: "Drill", cost: 100, rate: 2, owned: 0 },
  { name: "Excavator", cost: 1000, rate: 50, owned: 0 },
];

// Price multiplier for increasing cost
const priceMultiplier = 1.15;

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
app.append(button);

const countDisplay = document.createElement("p");
let crystalCount = 0;
countDisplay.innerHTML = `Crystals: ${crystalCount}`;
app.append(countDisplay);

// Create a display for the current income rate
const incomeDisplay = document.createElement("p");
let incomePerSecond = 0;
incomeDisplay.innerHTML = `Crystals per second: ${incomePerSecond.toFixed(1)}`;
app.append(incomeDisplay);

// Create a display for upgrades owned
const upgradesOwned = document.createElement("p");
upgradesOwned.innerHTML = `Upgrades owned: Pickaxes: 0, Drills: 0, Excavators: 0`;
app.append(upgradesOwned);

// Create upgrade buttons dynamically based on availableItems
availableItems.forEach((item, index) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${item.name} (Costs ${item.cost} crystals, Provides ${item.rate} crystals/sec)`;
  upgradeButton.disabled = true;
  upgradeButton.id = `upgrade-${index}`;
  app.append(upgradeButton);
});

// Function to check if upgrades can be purchased
function checkUpgradeAvailability() {
  availableItems.forEach((item, index) => {
    const upgradeButton = document.getElementById(`upgrade-${index}`) as HTMLButtonElement;
    if (crystalCount >= item.cost) {
      upgradeButton.disabled = false;
    } else {
      upgradeButton.disabled = true;
    }
    upgradeButton.innerHTML = `Buy ${item.name} (Costs ${item.cost.toFixed(2)} crystals, Provides ${item.rate} crystals/sec)`;
  });
}

// Function to update the status display
function updateStatusDisplay() {
  upgradesOwned.innerHTML = `Upgrades owned: Pickaxes: ${availableItems[0].owned}, Drills: ${availableItems[1].owned}, Excavators: ${availableItems[2].owned}`;
  incomeDisplay.innerHTML = `Crystals per second: ${incomePerSecond.toFixed(1)}`;
}

// Button click event to mine crystals manually
button.addEventListener("click", () => {
  crystalCount++;
  countDisplay.innerHTML = `Crystals: ${crystalCount}`;
  checkUpgradeAvailability();
});

// Function to handle purchasing an upgrade
function purchaseUpgrade(index: number) {
  const item = availableItems[index];
  if (crystalCount >= item.cost) {
    crystalCount -= item.cost;
    incomePerSecond += item.rate;
    item.cost *= priceMultiplier;  // Increase cost after each purchase
    item.owned++; // Track number of items owned
    countDisplay.innerHTML = `Crystals: ${crystalCount}`;
    updateStatusDisplay();
    checkUpgradeAvailability();
  }
}

// Add event listeners for the upgrade buttons
availableItems.forEach((_, index) => {
  const upgradeButton = document.getElementById(`upgrade-${index}`) as HTMLButtonElement;
  upgradeButton.addEventListener("click", () => purchaseUpgrade(index));
});

// Automatically increment crystals per second
setInterval(() => {
  crystalCount += incomePerSecond;
  countDisplay.innerHTML = `Crystals: ${crystalCount.toFixed(1)}`;
  checkUpgradeAvailability();
}, 1000);  // Runs every second to add income
