"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // console.log('Hello Bulma!');
});

/// Close Modals when clicking outside of them
var modal = document.querySelector(".modal");

// Detect all clicks on the document
document.addEventListener("click", function (event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(".modal-background")) {
        // If user clicks inside the modal's background, hide it!
        modal.classList.remove("is-active");
    }
});

function showContactModal() {
    document.getElementById("contact-modal").classList.add("is-active");
}

function hideContactModal() {
    document.contactform.reset();
    document.getElementById("contact-modal").classList.remove("is-active");
}

// https://stackoverflow.com/a/46181/3582770
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateFormInput() {
    var email = document.getElementById("email-input").value;

    if (validateEmail(email) == false) {
        // Show invalid email warning
        document.getElementById("email-warning-label").classList.remove("is-hidden");
        document.getElementById("email-warning-sign").classList.remove("is-hidden");
        document.getElementById("email-input").classList.add("is-danger");

        return false;
    }

    document.getElementById("email-warning-label").classList.add("is-hidden");
    document.getElementById("email-warning-sign").classList.add("is-hidden");
    document.getElementById("email-input").classList.remove("is-danger");
    document.contactform.reset();

    return true;
}

function showModal(id) {
    document.getElementById(id).classList.add("is-active");
}

function hideModal(id) {
    document.getElementById(id).classList.remove("is-active");
}

// Clickable table rows
jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });
});