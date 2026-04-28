import"./assets/styles-Bwb45YF3.js";const o=document.querySelector(".btn"),c=document.querySelector(".user-list");o.addEventListener("click",()=>{fetch("https://jsonplaceholder.typicode.com/users").then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{const n=e.map(t=>`<li>
	          <p><b>Name</b>: ${t.name}</p>
	          <p><b>Email</b>: ${t.email}</p>
	          <p><b>Company</b>: ${t.company.name}</p>
	        </li>`).join("");c.insertAdjacentHTML("beforeend",n)}).catch(e=>console.log(e))});
//# sourceMappingURL=3-fetch.js.map
