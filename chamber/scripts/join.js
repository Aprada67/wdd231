const url = "data/membership.json";

const memberLevels = document.querySelector("#memberLevels");
const dialogBox = document.querySelector("#dialogBox");
const dialogHeading = document.querySelector("#dialogHeading");
const dialogPrice = document.querySelector("#dialogPrice");
const dialogText = document.querySelector("#dialogText");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
    dialogBox.close();
});

dialogBox.addEventListener("click", (event) => {
    if (event.target === dialogBox) {
        dialogBox.close();
    }
});

async function membershipDataFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembershipLevel(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayMembershipLevel(data) {

    data.membershipLevels.forEach(dialog => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        const memberCardHeading = document.createElement("h4");
        const memberCardInfo = document.createElement("button");
        memberCardInfo.classList.add("more-info");
        memberCardInfo.classList.add("btn");

        memberCardHeading.textContent = dialog.name;
        memberCardInfo.textContent = "More Information";

        memberCard.appendChild(memberCardHeading);
        memberCard.appendChild(memberCardInfo);
        memberLevels.appendChild(memberCard);

        memberCard.addEventListener("click", () => {
            displayMembershipInfo(dialog);
        });
    });
}

function displayMembershipInfo(dialog) {
    console.log(dialog);

    dialogHeading.textContent = dialog.name;
    dialogPrice.textContent = `Price: ${dialog.cost}`;
    dialogText.textContent = `Benefits: ${dialog.benefits}`;

    dialogBox.showModal();
}

membershipDataFetch(url);