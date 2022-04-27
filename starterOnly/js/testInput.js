/*Elements dom
-------------------*/
const modalBackground = document.querySelector(".bground");
const modalForm = document.querySelector("form");
const confirmModal = document.querySelector("#confirm-signup")
const confirmModalBtn = document.querySelector("#confirm-signup-btn")

//Inputs
const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");
const emailInput = document.querySelector("#email");
const birthdateInput = document.querySelector("#birthdate");
const quantityInput = document.querySelector("#quantity");
const locationInput = document.querySelectorAll(".checkbox-input[type=radio]");
const termsInput = document.getElementById("checkbox1");

/*Create error messages
---------------*/
const errorMessages = {
    firstNameError: "Le prénom doit contenir 2 caractères minimum",
    lastNameError: "Le nom doit contenir 2 caractères minimum",
    emailError: "Adresse mail invalide",
    birthdateError: "16 ans ou + pour participer à un tournoi GameOn",
    quantityError: "Quantité invalide",
    locationError: "Une case doit être cochée",
    termsError: "Les conditions d'utilisation sont obligatoires",
};

/*Invalid input function
---------------------*/
function isInvalid(element, message) {
    let parent;
    if (NodeList.prototype.isPrototypeOf(element)) { //get parent de l'element cible
        parent = element[0].parentNode;
    } else {
        parent = element.parentNode;
    }
    parent.setAttribute("data-error-visible", true); //add l'attr d'erreur
    parent.setAttribute("data-error", message); //add le second attr d'erreur
};

/*Valid input function
--------------------*/
function isValid() {
    modalForm.style.display = "none";
    confirmModal.style.display = "flex";
    confirmModalBtn.addEventListener("click", () => {
        modalBackground.style.display = "none";
    });
}

/*Remove error function
------------------------*/
function removeError() {
    let inputs = document.querySelectorAll(
        '.formData[data-error-visible="true"]'
    );
    for (let input of inputs) { 
        input.removeAttribute("data-error-visible");
        input.removeAttribute("data-error");
    };
};

/*Test input functions
-------------------------*/

//firtsname
function firstNameTest() {
    let value = firstNameInput.value;
    if (value.length >= 2 && value !== null) {
        return true;
    } else {
        return false;
    };
};

//lastname
function lastNameTest() {
    let value = lastNameInput.value;
    if (value.length >= 2 && value !== null) {
        return true;
    } else {
        return false;
    };
};

//email
function emailTest() {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(emailInput.value);
};

//birthdate
function birthdateTest() {
	let birthdate = new Date(birthdateInput.value); //valeur user
	let today = new Date(); //date aujourd'hui
    today.setFullYear(today.getFullYear() - 16); //recup la valeur année - 16 

    return birthdate <= today; 
}

//quantity
function quantityTest() {
	let quantityRegex = /^[0-9]+$/;
	return quantityRegex.test(quantityInput.value);
};

//location
function locationTest() {
	for (let radio of locationInput) {
		if (radio.checked === true) return true;
	}
	return false;
}

//terms
function termsTest() {
	return termsInput.checked;
}

/*Appel des fonctions
-------------------------*/
function validate(event) {
    event.preventDefault();
    let isValidInput = true;
    removeError();
    if (!firstNameTest()) { //firstname test
        isValidInput = false;
        isInvalid(firstNameInput, errorMessages.firstNameError);
    }
    if (!lastNameTest()) { //lastname test
        isValidInput = false;
        isInvalid(lastNameInput, errorMessages.lastNameError);
    }
    if (!emailTest()) { //email test
        isValidInput = false;
        isInvalid(emailInput, errorMessages.emailError);
    }
    if (!birthdateTest()) { //birthdate test
        isValidInput = false;
        isInvalid(birthdateInput, errorMessages.birthdateError);
    }
    if (!quantityTest()) { 
        isValidInput = false;
        isInvalid(quantityInput, errorMessages.quantityError);
    }
    if (!locationTest()) {
        isValidInput = false;
        isInvalid(locationInput, errorMessages.locationError);
    }
    if (!termsTest()) {
        isValidInput = false;
        isInvalid(termsInput, errorMessages.termsError);
    }
    if (isValidInput) {
        isValid();
    }
}