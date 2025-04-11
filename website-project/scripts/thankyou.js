const userData = JSON.parse(localStorage.getItem("userData"));
const sectionThanks = document.getElementById("thanks");
const timestamp = new Date();

if (!userData) {
    sectionThanks.innerHTML = `
        <h1 class="thanks-title">Oops! No user data found.</h1>
        <a href="join.html" class="btn-primary btn return">Back to Registration</a>
    `;
} else {
    const fname = userData.fname || "User";
    const lname = userData.lname || "";
    const email = userData.email || "No email provided";

    function displayThanksMessage() {
        sectionThanks.innerHTML = `
            <div class="thanks-container">
            <h1 class="thanks-title">Welcome to Nutrisport</h1>
            <p class="thanks-subtitle">You will receive a confirmation email, check your inbox.</p>
            <div class="thanks-info">
                <p><strong>Name:</strong> ${fname} ${lname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p class="thanks-time">Registration date: ${timestamp.toLocaleString()}</p>
            </div>
            <a href="index.html" class="btn-primary btn return">Back to Home</a>
            <div>
        `;
    }

    displayThanksMessage();
}
