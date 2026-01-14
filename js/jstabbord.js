// --- Partie Gestion de la navigation  ---
// Déclaration
const nav = document.querySelector("nav");
const logo = document.getElementById("Logo");

window.addEventListener("scroll", () => {
    // Quand l'axe de scroll vertical est supérieur à 50
    if (window.scrollY > 50) 
    {
    nav.classList.add("retrecit");
    logo.classList.add("retrecit");
    } 
    else 
    {
    nav.classList.remove("retrecit");
    logo.classList.remove("retrecit");
    }
});

// --- Partie affichage des infos du tableau de bord ---

// Fonction utilitaire permettant de demander la date pour laquel l'utilisateur veut consulter les informations.
function Changer(){
    const champ = document.getElementById("entrer").value

    document.getElementsByClassName("infos")[0].textContent = ""

    const sect = document.getElementsByClassName("infos")[0]

    sect.innerHTML = `
                    <article class="artdate">
                        <p>Entrez la date pour laquelle vous voulez consulter le taux de remplissage (Format AAAA-MM-JJ)</p>

                        <input type="text" class="num2 dateB" placeholder="Exemple : 2025-11-01">

                        <input type = "button" id="date" class="valid" value="Valider">
                    </article>`

    let bt = document.getElementById("date")
    bt.addEventListener("click",() => ClickE(sect, champ))
}


let valid = document.getElementById("valider")

valid.addEventListener("click",Changer)

function ClickE(sect, champ) {
    const datel = document.getElementsByClassName("dateB")[0].value;

    sect.textContent = "";

    console.log("champ =", champ);
    console.log("date =", datel);

    
    const getDonnees = async () => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/liaison/${champ}/remplissage/${datel}`
            );

            console.log("status =", response.status);


            if (!response.ok) {
                alert("Aucune information pour cette liaison et cette date ! Veuillez recommencer la saisie.")
                throw new Error("Erreur réseau !");
            }

            const data = await response.json();
            console.log(data);

            let couleur
            let couleurV

            for (let i = 0; i < data.length; i++) {
                if(data[i].nbReservationPassagers / data[i].capacitePassagers <= 0.5){
                    couleur = "vert"
                }else{
                    if(data[i].nbReservationPassagers / data[i].capacitePassagers <= 0.75){
                        couleur="orange"
                    }else{
                        if(data[i].nbReservationPassagers / data[i].capacitePassagers <= 1){
                            couleur = "rouge"
                        }else{
                            couleur="jaune"
                        }
                    }
                }
                if(data[i].nbReservationVoitures / data[i].capaciteVoitures <= 0.5){
                    couleurV = "vertV"
                }else{
                    if(data[i].nbReservationVoitures / data[i].capaciteVoitures <= 0.75){
                        couleurV="orangeV"
                    }else{
                        if(data[i].nbReservationVoitures / data[i].capaciteVoitures <= 1){
                            couleurV = "rougeV"
                        }else{
                            couleurV="jauneV"
                        }
                    }
                }
                sect.innerHTML += `<article class="artdate">
                                <p class="ptab">Pour l'Horraire --> ${data[i].heure}: </p>
                                <p class="${couleur}"> L'occupation des passagers est de : ${data[i].nbReservationPassagers}, il reste : ${data[i].capacitePassagers - data[i].nbReservationPassagers} places !</p>
                                <p class="${couleurV}">L'occupation des véhicules est de : ${data[i].nbReservationVoitures}, il reste : ${data[i].capaciteVoitures - data[i].nbReservationVoitures} places !</p>
                                </article>`

            }

        } catch (error) {
            console.error("Une erreur est survenue :", error);
        }
    };

    getDonnees();
}
