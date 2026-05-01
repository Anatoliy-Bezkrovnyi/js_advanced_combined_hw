"use strict";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { convertMs } from "./convert-miliseconds";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  startBtn: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let timerId = null;

// Спочатку кнопка вимкнена
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    // Перевірка: чи дата в майбутньому
    if (selectedDate <= new Date()) {
      iziToast.error({
      title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });      
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false; // Увімкнути кнопку, якщо дата вірна
    }
  },
};

flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener("click", () => {
  // Вимикаємо кнопку після старту
  refs.startBtn.disabled = true;
  // Також варто вимкнути інпут, щоб не змінили дату під час відліку
  document.querySelector("#datetime-picker").disabled = true;

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;

    // Якщо час вийшов, зупиняємо таймер
    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      document.querySelector("#datetime-picker").disabled = false;
      return;
    }

    // Конвертуємо мілісекунди в об'єкт часу
    const time = convertMs(deltaTime);
    
    // Оновлюємо інтерфейс
    updateTimerInterface(time);
  }, 1000);
});

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

// Додає 0 перед числом, якщо воно менше 10 (наприклад, 09)
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}