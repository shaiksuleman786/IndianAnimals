 const slider = document.querySelector('.slider');

function activate(e) {
    const items = document.querySelectorAll('.item');
    if (e.target.matches('.next')) {
        slider.append(items[0]);
    }
    if (e.target.matches('.prev')) {
        slider.prepend(items[items.length - 1]);
    }
}

document.addEventListener('click', activate, false);
document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById("scrollContainer");
    let leftBtn = document.getElementById("leftBtn");
    let rightBtn = document.getElementById("rightBtn");

    function toggleScrollButtons() {
        leftBtn.style.display = container.scrollLeft > 5 ? "block" : "none";
        rightBtn.style.display = container.scrollLeft + container.clientWidth < container.scrollWidth - 5 ? "block" : "none";
    }

    leftBtn.addEventListener("click", function() {
        container.scrollBy({
            left: -200,
            behavior: "smooth"
        });
        setTimeout(toggleScrollButtons, 300);
    });

    rightBtn.addEventListener("click", function() {
        container.scrollBy({
            left: 200,
            behavior: "smooth"
        });
        setTimeout(toggleScrollButtons, 300);
    });

    container.addEventListener("scroll", toggleScrollButtons);
    window.onload = toggleScrollButtons;
});
AOS.init();

function openPopup(imgElement) {
    var popup = document.getElementById("popup");
    var popupImg = document.getElementById("popup-img");

    popupImg.src = imgElement.src;
    popup.style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

 
        let habitatsData = {};

        async function loadHabitats() {
            try {
                const response = await fetch('habitats.json');
                habitatsData = await response.json();
                changeHabitat('tropical'); // Load default category
            } catch (error) {
                console.error("Error loading habitat data:", error);
            }
        }

        function changeHabitat(category) {
            const container = document.getElementById("habitatContainer");
            container.innerHTML = "";

            if (!habitatsData[category]) {
                container.innerHTML = "<p>No data available for this category.</p>";
                return;
            }

            habitatsData[category].forEach(habitat => {
                const card = document.createElement("div");
                card.classList.add("unique-habitat-card");
                card.innerHTML = `
                    <img src="${habitat.src}" alt="${habitat.name}" class="unique-habitat-image">
                    <div class="unique-habitat-info">
                        <h3>${habitat.name}</h3>
                        <p>${habitat.species}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        loadHabitats();

        
    