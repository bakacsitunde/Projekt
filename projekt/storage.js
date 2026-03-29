// ============================================
// ES6 modul - LocalStorage helper
// Ez a fájl a felhasználók kezeléséért felel.
// ============================================


// --------------------------------------------
// FELHASZNÁLÓK LEKÉRÉSE
// --------------------------------------------
export function getUsers() {

  // A localStorage csak SZÖVEGET tud tárolni.
  // Ezért amikor elmentettük a felhasználókat,
  // JSON.stringify() segítségével szöveggé alakítottuk őket.
  //
  // Itt most visszaalakítjuk a szöveget JavaScript tömbbé.

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Magyarázat:
  // localStorage.getItem("users")
  // → visszaadja a "users" kulcshoz tartozó adatot (string vagy null)
  //
  // JSON.parse(...)
  // → a JSON szöveget visszaalakítja JavaScript objektummá/tömbbé
  //
  // || []
  // → ha nincs még eltárolva semmi (null),
  //    akkor legyen egy üres tömb


  // --------------------------------------------
  // ADMIN FELHASZNÁLÓ AUTOMATIKUS LÉTREHOZÁSA
  // --------------------------------------------

  // some() -> megvizsgálja, hogy van-e legalább egy olyan elem,
  // ami megfelel a feltételnek.
  //
  // Itt azt ellenőrizzük:
  // Van-e olyan user, akinek a username-je "admin"?

  if(!users.some(u => u.username === "admin")){

    // Ha NINCS admin felhasználó,
    // akkor automatikusan hozzáadunk egyet.

    // unshift() -> a tömb ELEJÉRE tesz be egy új elemet
    users.unshift({ 
      id: 1, 
      username: "admin", 
      password: "Admin123!", 
      email: "admin@example.com", 
      role: "admin",
      birthdate: "1970-01-01"
    });

    // Mivel módosítottuk a tömböt,
    // újra el kell mentenünk localStorage-ba.

    localStorage.setItem("users", JSON.stringify(users));
  }

  // Visszaadjuk a felhasználó tömböt
  return users;
}



// --------------------------------------------
// FELHASZNÁLÓK MENTÉSE
// --------------------------------------------
export function saveUsers(users) {

  // A users egy JavaScript tömb.
  // A localStorage viszont csak stringet tud tárolni.

  // JSON.stringify()
  // → JavaScript objektum/tömb → JSON szöveg

  localStorage.setItem("users", JSON.stringify(users));
}



// --------------------------------------------
// BEJELENTKEZETT FELHASZNÁLÓ MENTÉSE
// --------------------------------------------
export function setCurrentUser(user) {

  // A bejelentkezett felhasználót eltároljuk
  // a "currentUser" kulcs alatt.

  localStorage.setItem("currentUser", JSON.stringify(user));
}



// --------------------------------------------
// BEJELENTKEZETT FELHASZNÁLÓ LEKÉRÉSE
// --------------------------------------------
export function getCurrentUser() {

  // Kiolvassuk a "currentUser" kulcsot
  // majd JSON.parse segítségével visszaalakítjuk objektummá

  return JSON.parse(localStorage.getItem("currentUser")) || null;

  // Ha nincs bejelentkezett user,
  // akkor null-t adunk vissza.
}



// --------------------------------------------
// KIJELENTKEZÉS
// --------------------------------------------
export function removeCurrentUser() {

  // removeItem()
  // → teljesen törli a megadott kulcsot a localStorage-ból

  localStorage.removeItem("currentUser");
}
