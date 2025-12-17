var passagers = []
var index = 0


const getUneReservation = async (nb) => {
    try{

        document.getElementById('ContainerReservations').textContent = ""

    const response = await
        fetch(`https://can.iutrs.unistra.fr/api/reservation/${nb}`)
    //Vérifier si la réponse est correcte
    if(!response.ok) {
            alert("Aucune réservation trouvée. Veuillez entrer un autre numéro de réservation")
            throw new Error('Erreur de réseau !')
    }
    //Sinon Retourner le résultat au format JSON
    const data = await response.json()
    //Traiter les données récupérées
    const ContainerReservations = document.getElementById('ContainerReservations');

    let codeHTML = `<section class="carte">
                        <section class="datas1">
                            <img id="carte" src="../img/CANcarte.png" alt="Logo">
                            <section>
                                <p class='cart'>Gare de départ : </p> <p class='cartg'>&nbsp; ${data.portDepart}</p>
                            </section>
                            <section>
                                <p class='cart'>Gare d'arrivée : </p> <p class='cartg'>&nbsp; ${data.portArrivee}</p>
                            </section>
                            <section>
                                <p class='cart'>Date : </p> <p class='cartg'>&nbsp; ${data.date.split("-")[2]}/${data.date.split("-")[1]}/${data.date.split("-")[0]}</p>
                            </section>
                            <section>
                                <p class='cart'>Heure départ : </p> <p class='cartg'>&nbsp; ${data.heure}</p>
                            </section>
                            <section>
                                <p class='cart'>Bateau : </p> <p class='cartg'>&nbsp; ${data.bateau}</p>
                            </section>
                        </section>
                        <section class="datas2">
                            <p class="car">Carte d'embarquement</p>
                            <section class="blanc">
                                <section class='ligne'>
                                    <p class='cart2'>Réservation </p> <p class='cart2g'>&nbsp; ${data.id}</p>
                                </section>
                                <section class='ligne'>
                                    <p class='cart2'>Nom </p> <p class='cart2g'>&nbsp; ${data.nom}</p>
                                </section>
                                <section class='ligne'>
                                    <p class='cart2'>Passager </p> <img id="qrcode" src="../img/qrcode.png" alt="qrcode">
                                </section>
                                    <div id='ContainerPassager'>
                                    </div>
                            </section>
                        </section>
                    </section>`

        ContainerReservations.innerHTML = codeHTML

        for(let i = 0; i < data.nbPassagers; i ++)
		{
			await getUnPassager(nb, i+1);
		}

        afficherPassager(0)

    } catch (error){ // Gérer les erreurs
        console.error('Une erreur est survenue :', error)
        return
    }
};

//On remplit la liste passagers
const getUnPassager = async (nbr, nbp) => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/reservation/${nbr}/passager/${nbp}`
            );

            if (!response.ok) {
                throw new Error("Erreur réseau !");
            }

            const data = await response.json();

            //On ajoute le passager dans le tableau passagers
            passagers.push(data)

        } catch (error) {
            console.error("Une erreur est survenue :", error);
    }
};

//On affiche le passager
function afficherPassager(index) {
    const p = passagers[index];

    const ContainerPassager = document.getElementById('ContainerPassager');

    let codeHTML = `<section class='ligne'>
                            <p class='cart2'>Nom </p> <p class='cart2g'>&nbsp; ${data.nom}</p>
                        </section>
                        <section class='ligne'>
                            <p class='cart2'>Prénom </p> <p class='cart2g'>&nbsp; ${data.prenom}</p>
                        </section>
                        <section class='ligne'>
                            <p class='cart2'>Catégorie </p> <p class='cart2g'>&nbsp; ${data.libelleCategorie}</p>
                        </section>
                        <section class='ligne'>
                            <p class='cart2'>Prix </p> <p class='cart2g'>&nbsp; ${data.price}</p>
                        </section>`

    ContainerPassager.innerHTML = codeHTML

    document.getElementById("avant").disabled = index === 0;
    document.getElementById("apres").disabled = index === passagers.length - 1;
}



let valider = document.getElementById("bout")
valider.addEventListener("click", function() {
    const valeur = document.getElementById("nom").value;
    getUneReservation(valeur)
});

document.getElementById("avant").addEventListener("click", () => {
  if (index > 0) {
    index -= 1;
    afficherPassager(index);
  }
});

document.getElementById("apres").addEventListener("click", () => {
  if (index < passagers.length - 1) {
    index += 1;
    afficherPassager(index);
  }
});