function editNav() {
  let nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");

//function that opens the modal
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//function that closes the modal
function closeModal() {
  modalbg.style.display = "none";
  removeError(); //remove all errors after close modal
}

//close modal event
closeModalBtn.addEventListener("click", closeModal);