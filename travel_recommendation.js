let data = null;

async function loadData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        data = await response.json();
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function normalizeKeyword(input) {
    const word = input.trim().toLowerCase();
    if (["beach", "beaches"].includes(word)) return "beaches";
    if (["temple", "temples"].includes(word)) return "temples";
    if (["country", "countries"].includes(word)) return "countries";
    return null;
}

function renderResults(items, isCountry = false) {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = "";

    if (isCountry) {
        items.forEach(country => {
            country.cities.forEach(city => {
                container.innerHTML += `
          <div>
            <img src="${city.imageUrl}" alt="${city.name}">
            <h4>${city.name}</h4>
            <p>${city.description}</p>
          </div>
        `;
            });
        });
    } else {
        items.forEach(item => {
            container.innerHTML += `
        <div>
          <img src="${item.imageUrl}" alt="${item.name}">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
        </div>
      `;
        });
    }

    document.getElementById("resultsPopup").classList.remove("hidden");
}

function handleSearch() {
    const input = document.getElementById("searchInput").value;
    const category = normalizeKeyword(input);

    if (!category || !data) {
        alert("Please enter a valid search query.");
        return;
    }

    if (category === "countries") {
        renderResults(data.countries, true);
    } else {
        renderResults(data[category]);
    }
}

function clearResults() {
    document.getElementById("resultsPopup").classList.add("hidden");
    document.getElementById("resultsContainer").innerHTML = "";
    document.getElementById("searchInput").value = "";
}

window.addEventListener("DOMContentLoaded", loadData);
