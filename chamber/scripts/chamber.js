// -----------------
// ----- Cards -----
// -----------------
const url = "data/members.json";
const cards = document.querySelector("#cards");

// Parse the json data
async function getCompaniesData() {
    const response = await fetch(url);
    const data = await response.json();
    displayCompanies(data.companies);
}

getCompaniesData(url);

// Build company card
const displayCompanies = (companies) => {
    // Only show the first 3 cards initially
    const initialCompanies = companies.slice(0, 3);
    const remainingCompanies = companies.slice(3);

    // Create the first 3 visible cards
    initialCompanies.forEach((company) => {
        let card = document.createElement("div");
        let businessName = document.createElement("h3");
        let sector = document.createElement("p")
        let logo = document.createElement("img");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("a");

        let detailsContainer = document.createElement("div");
        let infoContainer = document.createElement("div");

        card.classList.add("company-card");
        detailsContainer.classList.add("company-details");
        infoContainer.classList.add("company-info");
        sector.classList.add("subheading");

        businessName.textContent = company.name;
        sector.textContent = company.sector;
        address.textContent = company.address;
        phone.innerHTML = "<strong>Telf:</strong> " + company.phoneNumber;
        url.textContent = company.url;
        url.href = company.url;
        url.target = "_blank";

        // Set image attributes
        logo.setAttribute("src", company.image);
        logo.setAttribute("alt", `${company.name} Logo`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute('width', '75');
        logo.setAttribute('height', '75');

        // Add elements to card
        card.appendChild(businessName);
        card.appendChild(sector);
        detailsContainer.appendChild(logo);
        infoContainer.appendChild(address);
        infoContainer.appendChild(phone);
        infoContainer.appendChild(url);
        detailsContainer.appendChild(infoContainer);
        card.appendChild(detailsContainer);

        // Append the card to the main container
        cards.appendChild(card);
    });

    // Create the rest of the cards (initially hidden)
    remainingCompanies.forEach((company) => {
        let card = document.createElement("div");
        let businessName = document.createElement("h3");
        let sector = document.createElement("p")
        let logo = document.createElement("img");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("a");

        let detailsContainer = document.createElement("div");
        let infoContainer = document.createElement("div");

        card.classList.add("company-card");
        detailsContainer.classList.add("company-details");
        infoContainer.classList.add("company-info");
        sector.classList.add("subheading");

        businessName.textContent = company.name;
        sector.textContent = company.sector;
        address.textContent = company.address;
        phone.innerHTML = "<strong>Telf:</strong> " + company.phoneNumber;
        url.textContent = company.url;
        url.href = company.url;
        url.target = "_blank";

        // Set image attributes
        logo.setAttribute("src", company.image);
        logo.setAttribute("alt", `${company.name} Logo`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute('width', '75');
        logo.setAttribute('height', '75');

        // Add elements to card
        card.appendChild(businessName);
        card.appendChild(sector);
        detailsContainer.appendChild(logo);
        infoContainer.appendChild(address);
        infoContainer.appendChild(phone);
        infoContainer.appendChild(url);
        detailsContainer.appendChild(infoContainer);
        card.appendChild(detailsContainer);

        // Initially hide the additional cards
        card.style.display = "none";

        // Append the hidden card to the main container
        cards.appendChild(card);
    });
}

// ---------------------------------
// ----- Grid and List Buttons -----
// ---------------------------------
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#cards")

// Switch to grid view
gridButton.addEventListener("click", () => {
    display.classList.add("company-grid");
    display.classList.remove("company-list");
});

// Switch to list view
listButton.addEventListener("click", () => {
    display.classList.add("company-list");
    display.classList.remove("company-grid");
});

// ----------------------------
// ----- Show More Button -----
// ----------------------------

const cardsContainer = document.querySelector("#cards");
const toggleButton = document.getElementById("toggle-cards");

function toggleCards() {
    const cards = Array.from(cardsContainer.children);
    const isExpanded = toggleButton.textContent === "Show Less";

    cards.slice(3).forEach(card => card.style.display = isExpanded ? "none" : "block");
    toggleButton.textContent = isExpanded ? "Show More" : "Show Less";
}

toggleButton.addEventListener("click", toggleCards);