// ----- Hamburguer menu -----
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

// ----- Cards -----
const url = "data/members.json";
const cards = document.querySelector("#cards");

// Parse the json data
async function getCompaniesData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.companies)
    //displayCompanies();
}

getCompaniesData();

// Build company card
