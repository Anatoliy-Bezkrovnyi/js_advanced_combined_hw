"use strict";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Stop the page from reloading

  const formData = new FormData(event.currentTarget);
  
  // Get the value by the "name" attribute
  const delay = formData.get('delay');
  const state = formData.get('state');

    console.log(`Delay: ${delay}, State: ${state}`);
    
    const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (state === 'fulfilled') {
      resolve(`✅ Fulfilled promise in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise in ${delay}ms`);
    }
  }, delay);
});

// Registering promise callbacks
promise
    .then(value => iziToast.success({
        message: (value),
        position: 'topRight'
    })) // "Success! Value passed to resolve function"
    .catch(error => iziToast.error({
        message: (error),
        position: 'topRight'
    }));// "Error! Error passed to reject function"
});

// Create promise

  