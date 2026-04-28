"use strict";

// Виконується першою
console.log("First log");

setTimeout(() => {
	// Виконується третьою, через 2000 мілісекунд (2 секунди)
  console.log("Second log");
}, 2000);

// Виконується другою
console.log("Third log");

const date = new Date();

console.log(date);
// "Fri Jun 18 2021 15:01:35 GMT+0300 (Eastern European Summer Time)"

const dateSeconds = new Date();
console.log(date.getTime()); // 1624021654154

const startTime = Date.now();

// Твій код, виконуваний упродовж деякого часу
for(let i = 0; i <= 100; i += 1) {
	console.log(i);
}

const endTime = Date.now();
const elapsedTime = endTime - startTime;

console.log(`Elapsed time: ${elapsedTime} ms`);


const makePromise = ({ value, delay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(shouldResolve) {
					resolve(value)
				} else {
					reject(value)
				}
			}, delay);
  });
};

makePromise({ value: "A", delay: 1000 })
	.then(value => console.log(value)) // "A"
	.catch(error => console.log(error));

makePromise({ value: "B", delay: 3000 })
	.then(value => console.log(value)) // "B"
	.catch(error => console.log(error));

makePromise({ value: "C", delay: 2000, shouldResolve: false })
	.then(value => console.log(value)) 
	.catch(error => console.log(error)); // "C"