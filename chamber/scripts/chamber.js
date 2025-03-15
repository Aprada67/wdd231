// ---------------------------
// ----- Hamburguer menu -----
// ---------------------------
function toggleMenu() {
    const menu = document.getElementById("menu");
    const menuIcon = document.getElementById("menu-icon");

    // Toggle the menu
    menu.classList.toggle("menu-active");

    // Change hamb icon to X
    menuIcon.classList.toggle("open");
}

const menuIcon = document.getElementById("menu-icon");
menuIcon.addEventListener("click", toggleMenu);

// Close the menu whe the users clicks outside of it
document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    const menuIcon = document.getElementById("menu-icon");

    // Verify if the click was outside the menu and the hamb menu
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        // If so, we close the menu
        menu.classList.remove("menu-active");
        menuIcon.classList.remove("open");
    }
});

// Close menu on link click
document.querySelectorAll("#menu li a").forEach(link => {
    link.addEventListener("click", function () {
        document.getElementById("menu").classList.remove("menu-active");
        document.getElementById("menu-icon").classList.remove("open");
    });
});

// ---------------------------------
// ----- Grid and List Buttons -----
// ---------------------------------
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#cards")

gridButton.addEventListener("click", () => {
    display.classList.add("company-grid");
    display.classList.remove("company-list");
});

listButton.addEventListener("click", () => {
    display.classList.add("company-list");
    display.classList.remove("company-grid");
});


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
    companies.forEach((company) => {
        // Create elements to add to the div.cards element
        let card = document.createElement("div");
        let businessName = document.createElement("h3");
        let sector = document.createElement("p")
        let logo = document.createElement("img");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("a");

        // Set classes
        card.classList.add("company-card");

        // Set information
        businessName.textContent = company.name;
        sector.textContent = company.sector;
        address.textContent = company.address;
        phone.textContent = company.phoneNumber;
        url.textContent = company.url;

        // Set image attributes
        logo.setAttribute("src", company.image);
        logo.setAttribute("alt", `${company.name} Logo`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '200');

        // Append created elements to card div
        card.appendChild(businessName);
        card.appendChild(sector);
        card.appendChild(logo);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(url);

        cards.appendChild(card);
    });
}