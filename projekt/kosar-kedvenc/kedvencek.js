
if(localStorage.getItem("kedvencek") == null){
    localStorage.setItem("kedvencek", JSON.stringify([]))
}

function kedvenc(nev){
    let biztos = confirm("Hozzáadod a kedvencekhez?")
    if(!biztos){
        return
    }

    let lista = JSON.parse(localStorage.getItem("kedvencek"))

    lista.push(nev)

    localStorage.setItem("kedvencek", JSON.stringify(lista))

    kedvencekMegjelenit()
}

function kedvencekMegjelenit(){
    let containerElem = document.getElementById("kedvencekLista")
    containerElem.innerHTML = "" 

    let lista = JSON.parse(localStorage.getItem("kedvencek"))

    if(lista.length === 0){
        containerElem.innerHTML = "<p class='no-favorites'>Nincsenek kedvencek</p>"
        return
    }

    for(let i = 0; i < lista.length; i++){
        let card = document.createElement("div")
        card.className = "card kedvenc-card"
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${lista[i]}</h5>
                <button onclick="kedvencTorlesEgy(${i})" class="btn btn-sm btn-danger">Eltávolítás</button>
            </div>
        `
        containerElem.appendChild(card)
    }
}

function kedvencekTorles(){
    let biztos = confirm("Biztos törölni szeretnéd az összes kedvencet?")
    if(!biztos){
        return
    }

    localStorage.removeItem("kedvencek")
    localStorage.setItem("kedvencek", JSON.stringify([]))
    kedvencekMegjelenit()
}

function kedvencTorlesEgy(index){
    let lista = JSON.parse(localStorage.getItem("kedvencek"))
    lista.splice(index, 1)
    localStorage.setItem("kedvencek", JSON.stringify(lista))
    kedvencekMegjelenit()
}

kedvencekMegjelenit()