// Get actual year
const currentYear = new Date().getFullYear();
document.getElementById("copyrigth").textContent = `© ${currentYear} Carabobensis Chamber of Commerce`;

// Last Modification
const lastModifiedDate = new Date(document.lastModified);
const options = {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false};
const formattedDate = lastModifiedDate.toLocaleString("en-US", options);

document.getElementById("last-modified").textContent = `Last Modification: ${formattedDate}`;