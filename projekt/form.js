let adatok=[]

function kuldes(){
    let nev=document.getElementById("nev").value
    let email=document.getElementById("email").value
    let tel=document.getElementById("tel").value
    // let uzenet=document.getElementById("uzenet").value

    let szemely = {
        nev:nev,
        email:email,
        tel:tel
        // uzenet:uzenet
    }

    adatok.push(szemely)
    console.log(adatok);

}
