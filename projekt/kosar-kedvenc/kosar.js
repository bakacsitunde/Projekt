
if(localStorage.getItem("kosar") == null){
    localStorage.setItem("kosar", JSON.stringify([]))
}

function kosarba(nev, ar, dbId){
    let biztos = confirm("Biztos kosárba teszed?")
    if(!biztos){
        return
    }

    let db = document.getElementById(dbId).value

    let kosar = JSON.parse(localStorage.getItem("kosar"))

    let termek = {
        nev: nev,
        ar: ar,
        db: Number(db)
    }

    kosar.push(termek)

    localStorage.setItem("kosar", JSON.stringify(kosar))

    kosarMegjelenit()
}

function kosarMegjelenit(){
    let tabla = document.getElementById("kosarTabla")
    tabla.innerHTML = ""

    let kosar = JSON.parse(localStorage.getItem("kosar"))
    let vegosszeg = 0

    for(let i = 0; i < kosar.length; i++){
        let sor = document.createElement("tr")
        let osszeg = kosar[i].ar * kosar[i].db
        vegosszeg += osszeg

        sor.innerHTML =
            "<td>" + kosar[i].nev + "</td>" +
            "<td>" + kosar[i].db + "</td>" +
            "<td>" + kosar[i].ar + " Ft</td>" +
            "<td>" + osszeg + " Ft</td>"

        tabla.appendChild(sor)
    }

    document.getElementById("vegosszeg").innerText =
        "Fizetendő: " + vegosszeg + " Ft"
}

function kosarTorles(){
    let biztos = confirm("Biztos törölni szeretnéd a kosarat?")
    if(!biztos){
        return
    }

    localStorage.removeItem("kosar")
    localStorage.setItem("kosar", JSON.stringify([]))
    kosarMegjelenit()
}

function rendeles(){
    let kosar = JSON.parse(localStorage.getItem("kosar"))

    if(kosar.length == 0){
        alert("A kosár üres!")
        return
    }

    let biztos = confirm("Biztos megrendeled?")
    if(!biztos){
        return
    }

    let szoveg = "Rendelés:\n\n"
    let osszeg = 0

    for(let i = 0; i < kosar.length; i++){
        let ar = kosar[i].ar * kosar[i].db
        osszeg += ar
        szoveg += kosar[i].nev + " - " + kosar[i].db + " db\n"
    }

    szoveg += "\nFizetendő: " + osszeg + " Ft"
    alert(szoveg)

    localStorage.removeItem("kosar")
    localStorage.setItem("kosar", JSON.stringify([]))
    kosarMegjelenit()

    document.getElementById("uzenet").innerText =
        "Köszönjük a vásárlást!"
}

kosarMegjelenit()