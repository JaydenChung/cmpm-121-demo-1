import "./style.css";



// Item interface (added 'owned' and 'description' properties)
interface Item {
  name: string;
  cost: number;
  rate: number;
  owned: number; // Tracks how many of each item the player owns
  description: string; // Fun description of the item
}

// Available items with names, costs, rates, and descriptions
const availableItems: Item[] = [
  { name: "Pickaxe", cost: 10, rate: 0.1, owned: 0, description: "A basic tool for mining crystals." },
  { name: "Drill", cost: 100, rate: 2, owned: 0, description: "A powerful drill that mines crystals faster." },
  { name: "Excavator", cost: 1000, rate: 50, owned: 0, description: "An industrial excavator for mass crystal extraction." },
  { name: "Laser Miner", cost: 5000, rate: 200, owned: 0, description: "A high-tech laser that slices through crystal deposits like butter." },
  { name: "Quantum Digger", cost: 20000, rate: 1000, owned: 0, description: "A futuristic tool that warps space-time to extract crystals instantly." }
];

// Constants
const PRICE_MULTIPLIER = 1.15;

// DOM elements
const app: HTMLDivElement = document.querySelector("#app")!;
const countDisplay = createDisplayElement("Crystals: 0");
const incomeDisplay = createDisplayElement("Crystals per second: 0.0");
const upgradesOwned = createDisplayElement(`Upgrades owned: ${generateOwnedString()}`);

// Game variables
// Existing variables
let crystalCount = 0;
let incomePerSecond = 0;

// Initialize game UI
initializeUI();

// Start updating crystals every second
setInterval(updateCrystals, 1000); // This will run every second

function initializeUI() {
  document.title = "Crystal Miner";
  createHeader("Crystal Miner");

  // Create and append the main mining button
  const mineButton = createButton("Mine Crystal!", handleMineCrystalClick, "myButton");
  app.append(mineButton);

  app.append(countDisplay, incomeDisplay, upgradesOwned);
  createUpgradeButtons();
}

// Function to handle the crystal mining button click
function handleMineCrystalClick() {
  crystalCount++;
  updateCountDisplay();
  checkUpgradeAvailability();
}



// Function to dynamically create upgrade buttons
function createUpgradeButtons() {
  availableItems.forEach((item, index) => {
    const button = createButton(
      `Buy ${item.name} (Costs ${item.cost} crystals, Provides ${item.rate} crystals/sec) - ${item.description}`,
      () => purchaseUpgrade(index)
    );
    button.id = `upgrade-${index}`;
    button.disabled = true;
    app.append(button);
  });
}

// Check if upgrades can be purchased
function checkUpgradeAvailability() {
  availableItems.forEach((item, index) => {
    const button = document.getElementById(`upgrade-${index}`) as HTMLButtonElement;
    button.disabled = crystalCount < item.cost;
    button.innerHTML = `Buy ${item.name} (Costs ${item.cost.toFixed(2)} crystals, Provides ${item.rate} crystals/sec) - ${item.description}`;
  });
}

// Handle purchasing an upgrade
function purchaseUpgrade(index: number) {
  const item = availableItems[index];
  if (crystalCount >= item.cost) {
    crystalCount -= item.cost;
    incomePerSecond += item.rate;
    item.cost *= PRICE_MULTIPLIER;
    item.owned++;
    updateAllDisplays();
    checkUpgradeAvailability();
  }
}

// Update all game displays
function updateAllDisplays() {
  updateCountDisplay();
  updateIncomeDisplay();
  updateUpgradesOwnedDisplay();
}

// Helper to update crystal count display
function updateCountDisplay() {
  countDisplay.innerHTML = `Crystals: ${crystalCount.toFixed(1)}`;
}

// Helper to update income display
function updateIncomeDisplay() {
  incomeDisplay.innerHTML = `Crystals per second: ${incomePerSecond.toFixed(1)}`;
}

// Helper to update upgrades owned display
function updateUpgradesOwnedDisplay() {
  upgradesOwned.innerHTML = `Upgrades owned: ${generateOwnedString()}`;
}

// Generate a string for owned items
function generateOwnedString(): string {
  return availableItems.map((item) => `${item.name}s: ${item.owned}`).join(", ");
}

// Function to increment crystals based on income
function updateCrystals() {
  crystalCount += incomePerSecond;
  updateCountDisplay();
  checkUpgradeAvailability();
}

// Utility functions
function createDisplayElement(initialText: string): HTMLParagraphElement {
  const p = document.createElement("p");
  p.innerHTML = initialText;
  return p;
}

function createHeader(text: string): void {
  const header = document.createElement("h1");
  header.innerHTML = text;
  app.append(header);
}

function createButton(text: string, onClick: () => void, className?: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = text;
  if (className) button.classList.add(className);
  button.addEventListener("click", onClick);
  return button;
}
