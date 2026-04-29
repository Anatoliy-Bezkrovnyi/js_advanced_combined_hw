"use strict";

const formData = { email: "", message: "" };
const form = document.querySelector(".feedback-form");
const email = form.elements.email;
const textarea = form.elements.message;
const localStorageKey = "feedback-form-state";

const savedData = localStorage.getItem(localStorageKey);
if (savedData) {
    try {
        email.value = JSON.parse(savedData).email;
        textarea.value = JSON.parse(savedData).message;
    } catch (error) {
        console.log(error);
    }  
}

form.addEventListener("input", () => {
    formData.email = email.value.trim();
    formData.message = textarea.value.trim();
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (evt.target.elements.email.value === "" || evt.target.elements.message.value === "") {
        return alert("Всі поля повинні бути заповнені!");
    }    
	console.log(formData);
  localStorage.removeItem(localStorageKey);
  form.reset();
});