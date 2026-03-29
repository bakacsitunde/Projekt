import { getUsers, saveUsers } from './storage.js';


// Kiválasztjuk a regisztrációs űrlapot
const form = document.getElementById("registerForm");


// Ellenőrizzük, hogy létezik-e az űrlap az oldalon
if(form){

  // Figyeljük a form beküldését
  form.addEventListener("submit", function(e){

    // Megakadályozzuk az oldal újratöltését
    e.preventDefault();


    // =====================================
    // INPUT MEZŐK ÉRTÉKEINEK KIOLVASÁSA
    // =====================================

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const birthdate = document.getElementById("birthdate").value;

    // Lekérjük a jelenlegi felhasználókat
    const users = getUsers();


    // =====================================
    // VALIDÁCIÓK (ELLENŐRZÉSEK)
    // =====================================

    // 1️⃣ Username hossz ellenőrzése
    if(username.length === 0 || username.length > 30){
      alert("Username must be 1-30 characters!");
      return;
    }

    // 2️⃣ Email ellenőrzés (egyszerű)
    if(!email.includes("@")){
      alert("Email must contain '@'!");
      return;
    }

    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if(!pwRegex.test(password)){
      alert("Password must be at least 8 chars and include uppercase, lowercase, number, special char!");
      return;
    }

    const birthDateObj = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDateObj.getFullYear();

    if(
      today.getMonth() < birthDateObj.getMonth() || 
      (
        today.getMonth() === birthDateObj.getMonth() &&
        today.getDate() < birthDateObj.getDate()
      )
    ){
      age--;
    }

    // Minimum életkor ellenőrzés
    if(age < 14){
      alert("You must be at least 14 years old!");
      return;
    }


    // =====================================
    // ADMIN NÉV VÉDELEM
    // =====================================

    if(username.toLowerCase() === "admin"){
      alert("Cannot register as admin!");
      return;
    }

    if(users.some(u => u.username === username)){
      alert("Username already exists!");
      return;
    }


    // =====================================
    // ÚJ FELHASZNÁLÓ OBJEKTUM LÉTREHOZÁSA
    // =====================================

    const newUser = {


      id: users.length ? users[users.length-1].id + 1 : 2,

      username,
      email,
      password,
      birthdate,

      role: "user"   // alapértelmezett szerepkör
    };


    // =====================================
    // MENTÉS
    // =====================================

    users.push(newUser);   // hozzáadjuk a tömbhöz
    saveUsers(users);      // elmentjük localStorage-ba


    // Konzol debug
    console.log("New user registered:", newUser);
    console.table(users);


    // Sikeres regisztráció
    alert("Registration successful! You can now login.");

    // Átirányítás login oldalra
    window.location.href = "login.html";

  });
}
