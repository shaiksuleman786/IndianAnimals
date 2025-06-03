let habitatsData = {};

function changeHabitat(type) {
  const container = document.getElementById("habitatContainer");
  container.innerHTML = '';

  if (!habitatsData[type]) return;

  habitatsData[type].forEach(item => {
    const card = document.createElement("a");
    card.classList.add("unique-habitat-card");
    card.href = `animal-list.html?region=${encodeURIComponent(item.name.trim())}`;
    card.innerHTML = `
      <img src="${item.src}" alt="${item.name}" class="unique-habitat-image">
      <div class="unique-habitat-info">
        <h3>${item.name}</h3>
        <p>${item.species}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

async function loadHabitatData() {
  try {
    const response = await fetch('habitats.json');
    habitatsData = await response.json();
    changeHabitat('tropical');
  } catch (err) {
    console.error('Error loading habitat data:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadHabitatData);
