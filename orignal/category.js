let animalsData = [];
let currentPage = 1;
const animalsPerPage = 20;
let filteredData = []; // stores current search results

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "Mammals";

  let jsonFile = "animal_data.json";

  switch (category.toLowerCase()) {
    case "birds":
      jsonFile = "indian_birds_100.json";
      break;
    case "reptiles":
      jsonFile = "indian_reptiles_100.json";
      break;
    case "amphibians":
      jsonFile = "indian_amphibians_100.json";
      break;
    case "fish":
      jsonFile = "indian_fish_100.json";
      break;
    case "insects":
      jsonFile = "indian_insects_100.json";
      break;
  }

  fetch(jsonFile)
    .then((res) => res.json())
    .then((data) => {
      animalsData = data.animals.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );

      filteredData = [...animalsData]; // initialize filteredData

      document.getElementById("categoryTitle").textContent = category.toUpperCase();
      document.getElementById("speciesCount").textContent = `${animalsData.length} species`;

      renderPaginatedAnimals(); // initial render
    })
    .catch((err) => {
      console.error("Failed to fetch animal data:", err);
    });

  // Search
  document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    filteredData = animalsData.filter((animal) =>
      animal.name.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderPaginatedAnimals();
  });

  // Pagination buttons
  document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredData.length / animalsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPaginatedAnimals();
    }
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPaginatedAnimals();
    }
  });

  // Sorting
  document.getElementById("sortSelect").addEventListener("change", applySort);

  // Grouping (basic alert for now)
  document.getElementById("groupSelect").addEventListener("change", applyGroup);
});

// Render function with pagination
function renderPaginatedAnimals() {
  const grid = document.getElementById("animalGrid");
  grid.innerHTML = "";

  const start = (currentPage - 1) * animalsPerPage;
  const end = start + animalsPerPage;
  const animalsToShow = filteredData.slice(start, end);

  animalsToShow.forEach((animal) => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.innerHTML = `
      <a href="animal.html?name=${encodeURIComponent(animal.name)}" class="card-link">
        <img src="${animal.imageUrl}" alt="${animal.name}" />
        <div class="info">
          <h3>${animal.name}</h3>
          <p>${animal.scientificName}</p>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });

  // Update pagination info
  const info = document.getElementById("paginationInfo");
  if (info) {
    info.textContent = `${start + 1} - ${Math.min(end, filteredData.length)} out of ${filteredData.length}`;
  }

  // Show/hide buttons
  document.getElementById("prevBtn").style.display = currentPage === 1 ? "none" : "inline-block";
  document.getElementById("nextBtn").style.display = end >= filteredData.length ? "none" : "inline-block";
}

// Sorting logic
function applySort() {
  const value = document.getElementById("sortSelect").value;

  if (value === "atoz") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === "popularity") {
    filteredData.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  currentPage = 1;
  renderPaginatedAnimals();
}

// Grouping mock logic
function applyGroup() {
  const value = document.getElementById("groupSelect").value;

  if (value === "family") {
    alert("Grouping by Family coming soon!");
  } else if (value === "status") {
    alert("Grouping by Population Status coming soon!");
  } else {
    renderPaginatedAnimals(); // no group
  }
}

// Placeholder for filters
function toggleFilters() {
  alert("Filters UI will be available soon!");
}
function createAlphabetButtons() {
  const container = document.getElementById("alphabetFilter");
  if (!container) return;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  letters.forEach((letter) => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "alphabet-btn";
    btn.addEventListener("click", () => {
      filteredData = animalsData.filter((animal) =>
        animal.name.toUpperCase().startsWith(letter)
      );
      currentPage = 1;
      renderPaginatedAnimals();
    });
    container.appendChild(btn);
  });

  // "All" button to show all animals again
  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = "alphabet-btn";
  allBtn.addEventListener("click", () => {
    filteredData = [...animalsData];
    currentPage = 1;
    renderPaginatedAnimals();
  });
  container.appendChild(allBtn);
}
