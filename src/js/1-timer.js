"use strict";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { convertMs } from "./convert-miliseconds";

const refs = {
  startBtn: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let today = new Date();
let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < today) {
      alert("Please choose a date in the future");
      refs.startBtn.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0]; 
    interval = Number(selectedDates[0] - today); 
    console.log(interval);
  },
};


refs.startBtn.addEventListener("click", setStartTimer);
  
  
  const setStartTimer = () => {
  refs.startBtn.disabled = true;

  // 1. Отримуємо об'єкт з розрахованими даними
  const timeData = convertMs(interval); 

  // 2. Прописуємо кожне значення у відповідний елемент інтерфейсу
  refs.days.textContent = addLeadingZero(timeData.days);
  refs.hours.textContent = addLeadingZero(timeData.hours);
  refs.minutes.textContent = addLeadingZero(timeData.minutes);
  refs.seconds.textContent = addLeadingZero(timeData.seconds);
};

// Допоміжна функція для форматування (01 замість 1)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr("#datetime-picker", options);