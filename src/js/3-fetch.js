"use strict";

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

fetchUsersBtn.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((users) => {
      const markup = users.map((user) => {
				return `<li>
	          <p><b>Name</b>: ${user.name}</p>
	          <p><b>Email</b>: ${user.email}</p>
	          <p><b>Company</b>: ${user.company.name}</p>
	        </li>`;
        })
        .join("");

			userList.insertAdjacentHTML("beforeend", markup);
    })
    .catch((error) => console.log(error));
});