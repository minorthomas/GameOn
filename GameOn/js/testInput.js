/*Modal elements dom
-------------------*/
const modalBackground = document.querySelector(".bground");
const modalForm = document.querySelector("form");
const confirmModal = document.querySelector("#confirm-signup")
const confirmModalBtn = document.querySelector("#confirm-signup-btn")

/*Form elements dom
-------------------*/
const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");
const emailInput = document.querySelector("#email");
const birthdateInput = document.querySelector("#birthdate");
const quantityInput = document.querySelector("#quantity");
const locationInput = document.querySelectorAll(".checkbox-input[type=radio]");
const termsInput = document.getElementById("checkbox1");

const formElements = [
    {
        value: firstNameInput,
        error: "2 caractères minimum"
    },
    {
        value: lastNameInput,
        error: "2 caractères minimum"
    },
    {
        value: emailInput,
        error: "Adresse mail invalide"
    },
    {
        value: birthdateInput,
        error: "16 ans minimum"
    },
    {
        value: quantityInput,
        error: "Quantité invalide"
    },
    {
        value: locationInput,
        error: "Une case doit être cochée"
    },
    {
        value: termsInput,
        error: "Les conditions d'utilisation sont obligatoires"
    }
]


/**
 * @param  {dom} element
 * @param  {string} message
 */
//function fires if an element of the form is incorrect
function isInvalid(element, message) {
    let parent;

    //checks if it is a list of elements or a single element
    if (NodeList.prototype.isPrototypeOf(element)) {
        //takes the first element of the node list, and gets the element's parent
        parent = element[0].parentNode; 
    } else {
        parent = element.parentNode;
    }
    
    parent.setAttribute("data-error-visible", true);
    parent.setAttribute("data-error", message);
};

//function fires if the form is fully valid
function isValid() {
    modalForm.style.display = "none";
    confirmModal.style.display = "flex";
    confirmModalBtn.addEventListener("click", () => {
        modalBackground.style.display = "none";
    });
}

function removeError() {
    let inputs = document.querySelectorAll(
        '.formData[data-error-visible="true"]'
    );

    inputs.forEach(input => {
        input.removeAttribute("data-error-visible");
        input.removeAttribute("data-error");
    });
};

/**
 * @param  {dom} element
 */
//functions that test each input
function nameTest(element) {
    let value = element.value;
    let nameRegex = /^[a-zA-Z]+$/;
    if (value.length >= 2 && value !== null) {
        return nameRegex.test(value);
    }
    return false;
};

function emailTest(element) {
    let value = element.value;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(value);
};

function birthdateTest(element) {
    let value = element.value;
    let birthdate = new Date(value); //valeur user
    let today = new Date(); //date aujourd'hui
    today.setFullYear(today.getFullYear() - 16); //recup la valeur année - 16

    return birthdate <= today;
}

function quantityTest(element) {
    let quantityRegex = /^[0-9]+$/;
    return quantityRegex.test(element.value);
};

function locationTest(element) {
    for (let radio of element) {
        if (radio.checked === true) return true;
    }
    return false;
}

function termsTest(element) {
    return element.checked;
}

/*function is triggered when clicking on the submit button of the form,
this function tests if the form is entirely correct or not*/
function validate(event) {
    event.preventDefault();
    removeError();
    
    const validationArray = [
        nameTest(firstNameInput),
        nameTest(lastNameInput),
        emailTest(emailInput),
        birthdateTest(birthdateInput),
        quantityTest(quantityInput),
        locationTest(locationInput),
        termsTest(termsInput)
    ];

    console.log(locationTest(locationInput));

    if (validationArray.every(isValid => isValid)) {
        removeError();
        return isValid();
    }

    formElements.forEach((element, index) => {
        if (!validationArray[index]) {
            isInvalid(element.value, element.error)
        }
    });
}