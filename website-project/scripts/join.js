const form = document.getElementById("registrationForm")

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

    const userData = {
        fname: fname,
        lname: lname,
        email: email
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    window.location.href = "thankyou.html";
});