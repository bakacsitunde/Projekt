
import { getUsers, saveUsers, getCurrentUser, removeCurrentUser } from './storage.js';

const currentUser = getCurrentUser();


if(!currentUser || currentUser.role !== "admin"){
  alert("You must be admin!");
  window.location.href = "login.html";   
}
function renderAdminTable(){

  const table = document.getElementById("adminTable");

  const users = getUsers(); 

  table.innerHTML = `
    <tr>
  <th>Azonosító</th>
  <th>Felhasználónév</th>
  <th>E-mail</th>
  <th>Szerepkör</th>
  <th>Műveletek</th>
</tr>

  `;

  users.forEach(user => {

    table.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>

          <!-- Edit gomb -->
          <button onclick="editUser(${user.id})">Szerkesztés</button>

          <!-- Delete gomb csak akkor jelenik meg,
               ha nem admin -->
          ${user.role !== "admin" 
              ? `<button onclick="deleteUser(${user.id})">Delete</button>` 
              : ''}

        </td>
      </tr>
    `;
  });
}

renderAdminTable();

window.editUser = function(id){

  const users = getUsers();

  const user = users.find(u => u.id === id);

  if(!user) return;

  const newUsername = prompt("New username:", user.username) || user.username;
  const newEmail = prompt("New email:", user.email) || user.email;
  const newRole = prompt("New role (admin/user):", user.role) || user.role;

  if(newUsername.toLowerCase() === "admin" && user.id !== 1){
    alert("Cannot change username to admin!");
    return;
  }
  if(!newEmail.includes("@")){
    alert("Email must contain '@'!");
    return;
  }

  user.username = newUsername;
  user.email = newEmail;
  user.role = newRole;

  saveUsers(users);

  renderAdminTable();
}


window.deleteUser = function(id){

  if(id === 1){
    alert("Cannot delete main admin!");
    return;
  }

  if(!confirm("Delete this user?")) return;

  const users = getUsers().filter(u => u.id !== id);

  saveUsers(users);

  renderAdminTable();
}

document.getElementById("logoutBtn").addEventListener("click", ()=>{

  removeCurrentUser();

  window.location.href = "login.html";
});
