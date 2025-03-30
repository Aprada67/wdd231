const thanks = document.querySelector("#thanks");
const timestamp = new(Date);
const userInfo = new URLSearchParams(window.location.search);
console.log(userInfo);

const fname = userInfo.get("fname");
const lname = userInfo.get("lname");
const level = userInfo.get("level");
const phone = userInfo.get("phone");
const email = userInfo.get("email");
const orgname = userInfo.get("orgname");

function displayThanksMessage() {
    thanks.innerHTML = `
        <h1>YOUR APPLICATION HAVE BEEN RECEIVED</h1>
        <p>Membership Level: ${level}</p>
        <p>Name: ${fname} ${lname}</p>
        <p>Phone Number: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Business Organization: ${orgname}</p>
        <p>Submitted On: ${timestamp}</p>
    `;
}

displayThanksMessage();