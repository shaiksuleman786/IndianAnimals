// Get animal name from URL
const params = new URLSearchParams(window.location.search);
const animalName = params.get("name");

// Load animal data
fetch("animals.json")
  .then(response => response.json())
  .then(data => {
    const animal = data.find(a => a.name === animalName);

    if (!animal) {
      document.body.innerHTML = "<h2>Animal not found.</h2>";
      return;
    }

    // Fill data
    document.getElementById("animal-name-heading").textContent = animal.name;
    document.getElementById("animal-category").textContent = animal.category || "Animal Profile";
    document.getElementById("animal-image").src = animal.imageUrl;
    document.getElementById("photo-credit").textContent = `Scientific Name: ${animal.scientificName}`;
    document.getElementById("source-link").href = animal.source || "#";
    
    const descriptionElement = document.getElementById("description");
    descriptionElement.classList.add("info-text");
    descriptionElement.innerHTML = animal.description.replace(/\n/g, "<br>");

    const lifespanElement = document.getElementById("lifespan");
    lifespanElement.classList.add("lifespan-box");
    lifespanElement.innerHTML = animal.lifespan.replace(/\n/g, "<br>");

    const reproductionElement = document.getElementById("reproduction");
    reproductionElement.classList.add("reproduction-box");
    reproductionElement.innerHTML = animal.reproduction.replace(/\n/g, "<br>");

    const funFactsElement = document.getElementById("fun-facts");
    funFactsElement.innerHTML = animal["fun-facts"];  
    funFactsElement.classList.add("fun-facts-box"); 

    const behaviorElement = document.getElementById("behavior");
    behaviorElement.classList.add("behavior-box");
    behaviorElement.innerHTML = animal.behavior.replace(/\n/g, "<br>");


    populateIcons("winter-regions", animal.winterRegions);
    populateIcons("food-types", animal.foodTypes);
    populateIcons("feeder-types", animal.feederTypes);
    populateIcons("predator", animal.predator);
    populateIcons("habitat", animal.habitat);
  })
  .catch(error => {
    console.error("Error loading animal data:", error);
    document.body.innerHTML = "<h2>Failed to load data.</h2>";
  });

// Function to add icons
function populateIcons(containerId, items = []) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!items || items.length === 0) {
    container.innerHTML = "<p>Not available.</p>";
    return;
  }

  items.forEach(item => {
    const box = document.createElement("div");
     

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    

    const name = document.createElement("p");
    name.textContent = item.name;
     

    box.appendChild(img);
    box.appendChild(name);
    container.appendChild(box);
  });
}
