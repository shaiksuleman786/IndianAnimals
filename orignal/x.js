// x.js

// Get the selected alphabet letter from query string
const urlParams = new URLSearchParams(window.location.search);
const selectedLetter = urlParams.get("letter")?.toLowerCase() || "";

const jsonFiles = [
    "indian_amphibians_100.json",
    "indian_birds_100.json",
    "indian_fish_100.json",
    "indian_insects_100.json",
    "indian_reptiles_100.json"
];

const container = document.getElementById("animal-container");

async function loadAndFilterAnimals() {
    let allAnimals = [];

    for (let file of jsonFiles) {
        const response = await fetch(file);
        const data = await response.json();
        allAnimals = allAnimals.concat(data);
    }

    // Filter by starting letter
    const filtered = allAnimals.filter(animal =>
        animal.name?.toLowerCase().startsWith(selectedLetter)
    );

    // Display the filtered data
    if (filtered.length === 0) {
        container.innerHTML = "<p>No animals found.</p>";
        return;
    }

    container.innerHTML = ""; // Clear existing content
    filtered.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("animal-card");
        card.innerHTML = `
            <img src="${animal.imageUrl}" alt="${animal.name}" />
            <h3>${animal.name}</h3>
            <p><i>${animal.scientificName || ""}</i></p>
        `;
        container.appendChild(card);
    });
}

loadAndFilterAnimals();
