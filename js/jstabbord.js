
function Changer(){
    const champ = document.getElementById("entrer").value

    document.getElementsByClassName("infos")[1].textContent = ""

    const art = document.getElementsByClassName("infos")[1]

    art.innerHTML = `<input type="text" class="dateB" placeholder="veuiller inserer la date au format : yyyy-mm-jj">
                    <input type = "button" id="date" value="Valider">`

    let bt = document.getElementById("date")
    bt.addEventListener("click",() => ClickE(art, champ))

}


let valid = document.getElementById("valider")

valid.addEventListener("click",Changer)

function ClickE(art, champ) {
    const heure = document.getElementsByClassName("dateB")[0].value;

    art.textContent = "";

    console.log("champ =", champ);
    console.log("heure =", heure);

    
    const getDonnees = async () => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/liaison/${champ}/remplissage/${heure}`
            );

            console.log("status =", response.status);


            if (!response.ok) {
                throw new Error("Erreur réseau !");
            }

            const data = await response.json();
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                if(data[i].capacitePassagers - data[i].nbReservationPassagers >= data[i].capacitePassagers/2){
                    couleur = "vert"
                }else{
                    if((data[i].capacitePassagers - data[i].nbReservationPassagers < data[i].capacitePassagers/2) && (data[i].capacitePassagers - data[i].nbReservationPassagers < data[i].capacitePassagers/4)){
                        couleur="orange"
                    }else{
                        if((data[i].capacitePassagers - data[i].nbReservationPassagers < data[i].capacitePassagers/4) && (data[i].nbReservationPassagers == data[i].capacitePassagers)){
                            couleur = "rouge"
                        }else{
                            couleur="jaune"
                        }
                    }
                }
                if(data[i].capaciteVoitures - data[i].nbReservationVoitures >= data[i].capaciteVoitures/2){
                    couleurV = "vertV"
                }else{
                    if((data[i].capaciteVoitures - data[i].nbReservationVoitures < data[i].capaciteVoitures/2) && (data[i].capaciteVoitures - data[i].nbReservationVoitures < data[i].capaciteVoitures/4)){
                        couleurV="orangeV"
                    }else{
                        if((data[i].capaciteVoitures - data[i].nbReservationVoitures < data[i].capaciteVoitures/4) && (data[i].nbReservationVoitures == data[i].capaciteVoitures)){
                            couleurV = "rougeV"
                        }else{
                            couleurV="jauneV"
                        }
                    }
                }
                art.innerHTML += `<p class="${couleur}">Pour l'Horraire --> ${data[i].heure}, l'occupation est de : ${data[i].nbReservationPassagers} passagers, il reste : ${data[i].capacitePassagers - data[i].nbReservationPassagers} places !</p>
                                <p class="${couleurV}">Pour les véhicules l'occupation est de : ${data[i].nbReservationVoitures}, et le restants de place est de : ${data[i].capaciteVoitures - data[i].nbReservationVoitures}</p>`
            }

        } catch (error) {
            console.error("Une erreur est survenue :", error);
        }
    };

    getDonnees();
}
