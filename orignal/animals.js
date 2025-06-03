window.onload = function () {
    // Get selected letter from URL (?letter=A)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedLetter = urlParams.get("letter") || "A"; // Default to A

    // Update page title
    const titleElement = document.getElementById("title");
    if (titleElement) {
        titleElement.innerText = `Animals Starting with "${selectedLetter}"`;
    }

    // JSON files to load
    const jsonFiles = [
        "indian_amphibians_100.json",
        "indian_birds_100.json",
        "indian_fish_100.json",
        "indian_insects_100.json",
        "indian_reptiles_100.json",
        "animal_data.json"
    ];

    let allAnimals = [];
    let loadCount = 0;

    // Load and filter each JSON
    jsonFiles.forEach(file => {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}`);
                }
                return response.json();
            })
            .then(data => {
                const animalsArray = Array.isArray(data) ? data : data.animals;
                if (!Array.isArray(animalsArray)) {
                    console.error(`Invalid format in ${file}`, data);
                    return;
                }

                const filteredAnimals = animalsArray.filter(animal =>
                    animal.name && animal.name.toUpperCase().startsWith(selectedLetter.toUpperCase())
                );

                allAnimals = allAnimals.concat(filteredAnimals);
                loadCount++;

                if (loadCount === jsonFiles.length) {
                    displayAnimals(allAnimals);
                    updateTitleCount(allAnimals.length);
                    updateDynamicText(selectedLetter, allAnimals.length);
                }
            })
            .catch(error => {
                console.error(`Error loading ${file}:`, error);
            });
    });

    // Back button
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", () => window.history.back());
    }

    // Search bar
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", function () {
            const searchText = this.value.toLowerCase();
            const filtered = allAnimals.filter(animal =>
                animal.name.toLowerCase().includes(searchText)
            );
            displayAnimals(filtered);
            updateTitleCount(filtered.length);
            updateDynamicText(selectedLetter, filtered.length);
        });
    }
};

// Display animals
function displayAnimals(animals) {
    const container = document.getElementById("animal-list");
    if (!container) {
        console.error("Element with id 'animal-list' not found!");
        return;
    }

    container.innerHTML = "";

    if (animals.length === 0) {
        container.innerHTML = "<p>No animals found.</p>";
        return;
    }

    animals.forEach(animal => {
        const card = document.createElement("div");
        card.className = "animal-card";

        card.innerHTML = `
            <img src="${animal.imageUrl}" alt="${animal.name}" class="animal-image">
            <h3>${animal.name}</h3>
            <p><strong>Scientific Name:</strong> ${animal.scientificName || "N/A"}</p>
        `;

        container.appendChild(card);
    });
}

// Update <h3 id="species-count">XXX SPECIES</h3>
function updateTitleCount(count) {
    const countElement = document.getElementById("species-count");
    if (countElement) {
        countElement.innerText = `${count} SPECIES`;
    }
}

// Update <span> values dynamically
function updateDynamicText(letter, count) {
    const countSpan = document.getElementById("animal-count");
    const infoSpan = document.getElementById("letter-info");
    const endSpan = document.getElementById("letter-end");

    if (countSpan) countSpan.innerText = count;
    if (infoSpan) infoSpan.innerText = letter;
    if (endSpan) endSpan.innerText = letter;
}
