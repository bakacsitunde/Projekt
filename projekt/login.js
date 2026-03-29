

import { getUsers, setCurrentUser } from './storage.js';


// Kiválasztjuk a HTML-ben lévő login űrlapot
const form = document.getElementById("loginForm");


// Ellenőrizzük, hogy az űrlap létezik-e az oldalon
// (ha több oldalon használjuk a JS fájlt, ez fontos lehet)
if(form){

  // Figyeljük a form beküldését
  form.addEventListener("submit", function(e){

    // Megakadályozzuk az oldal újratöltését
    // (alapból a form submit reload-ot csinál)
    e.preventDefault();


    // ============================
    // INPUT ADATOK KIOLVASÁSA
    // ============================

    // Lekérjük a beírt felhasználónevet
    // .value -> az input mező tartalma
    // .trim() -> levágja a felesleges szóközöket
    const username = document.getElementById("loginUsername").value.trim();

    // Lekérjük a jelszót
    const password = document.getElementById("loginPassword").value;

    // Konzolra kiírjuk (fejlesztéshez hasznos)
    console.log("Trying to login:", username);



    const user = getUsers().find(u => 
      u.username === username && u.password === password
    );

    
    if(!user){
      alert("Incorrect username or password!");
      return;
    }

    setCurrentUser(user);

    console.log("Logged in user:", user);

    // Ha admin
    if(user.role === "admin"){
      window.location.href = "admin.html";
    } 
    // Ha normál felhasználó
    else {
      window.location.href = "fooldal.html";
    }

  });
}
