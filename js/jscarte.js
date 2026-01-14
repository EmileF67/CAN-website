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

// --- Partie d'obtention et d'affichage d'une réservation ---
// Déclaration
var passagers = []
var vehicules = []
var index = 0

// Début de la gestion d'une réservation (identifiant n°<nb>)
const getUneReservation = async (nb) => {
    try {
        passagers = []
        index = 0
        vehicules = []

        document.getElementById('ContainerReservations').textContent = ""
        
        // Obtenir les détails de la réservation n°<nb>
        const response = await fetch(`https://can.iutrs.unistra.fr/api/reservation/${nb}`)

        // Vérifier si la réponse est correcte, sinon alerter l'utilisateur.
        if (!response.ok) {
                alert("Aucune réservation trouvée. Veuillez entrer un autre numéro de réservation")
                throw new Error('Erreur de réseau !')
        }

        // Transformer le résultat au format JSON.
        const data = await response.json()

        // -- Traiter les données récupérées --
        // Obtenir l'endroit où l'on va afficher les réservations
        const ContainerReservations = document.getElementById('ContainerReservations');
        
        // Informations générales
        let codeHTML = `<button id="avant" class="fleche">❮</button>
                        <button id="apres" class="fleche">❯</button>
                        <section class="carte">
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
                                        <div id='ContainerPassager'>
                                        </div>
                                </section>
                            </section>
                        </section>`

        ContainerReservations.innerHTML = codeHTML

        // Quand on clique sur la flèche pour passer à la carte suivante
        let avant = document.getElementById("avant")
        avant.addEventListener("click", function() {
            // Si on est pas déjà au début
            if (index > 0) 
            {
                index -=1
                afficher()
            }
        })
            
        // Quand on clique sur la flèche pour passer à la carte précédente
        let apres = document.getElementById("apres")
        apres.addEventListener("click", function() {
            // Si on est pas déjà à la fin
            if (index < passagers.length + vehicules.length - 1)
            {
                index +=1
                afficher()
            }
        });

        // Ajouter tous les passagers à la liste
        for (let i = 0; i < data.nbPassagers; i ++)
		{
			await getUnPassager(nb, i+1);
		}

        // Ajouter tous les véhicules à la liste
        for (let i = 0; i < data.nbVehicules; i ++)
		{
			await getUnVehicule(nb, i+1);
		}

        afficher()

    } catch (error) { // Gérer les erreurs
        console.error('Une erreur est survenue :', error)
        return
    }
};

// Remplit la liste passagers
const getUnPassager = async (nbr, nbp) => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/reservation/${nbr}/passager/${nbp}`
            );

            if (!response.ok) {
                throw new Error("Erreur réseau !");
            }

            const data = await response.json();

            // On ajoute le passager dans le tableau passagers
            passagers.push(data)

        } catch (error) {
            console.error("Une erreur est survenue :", error);
    }
};

// Remplit la liste véhicules
const getUnVehicule = async (nbr, nbp) => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/reservation/${nbr}/vehicule/${nbp}`
            );

            if (!response.ok) {
                throw new Error("Erreur réseau !");
            }

            const data = await response.json();

            //On ajoute le passager dans le tableau passagers
            vehicules.push(data)

        } catch (error) {
            console.error("Une erreur est survenue :", error);
    }
};

// Gère si on doit afficher un passager ou un véhicule
function afficher() {
    const totpassagers = passagers.length;

    if (index < totpassagers) {
        afficherPassager(index)
    } else {
        afficherVehicule(index - totpassagers)
    }

    document.getElementById("avant").disabled = index === 0 //Quand on est au début des éléments à afficher, fleche avant desactivée
    document.getElementById("apres").disabled = index === totpassagers + vehicules.length - 1 // Quand on est à la fin des éléments à afficher, fleche apres desactivée
}

// Affiche le passager à l'index <indexp>
function afficherPassager(indexp) {
    // Déclaration
    const p = passagers[indexp]
    const ContainerPassager = document.getElementById('ContainerPassager')

    // Création du code html pour présenter correctement les informations du passager
    let codeHTML = `<section class='ligne'>
                        <p class='cart2'>Passager </p> <img id="qrcode" src="../img/qrcode.png" alt="qrcode">
                    </section>
                    <section class='ligne'>
                        <p class='cart2'>Nom </p> <p class='cart2g'>&nbsp; ${p.nom}</p>
                    </section>
                    <section class='ligne'>
                        <p class='cart2'>Prénom </p> <p class='cart2g'>&nbsp; ${p.prenom}</p>
                    </section>
                    <section class='ligne'>
                        <p class='cart2'>Catégorie </p> <p class='cart2g'>&nbsp; ${p.libelleCategorie}</p>
                    </section>
                    <section class='ligne'>
                        <p class='cart2'>Prix </p> <p class='cart2g'>&nbsp; ${p.price}</p>
                    </section>`

    ContainerPassager.innerHTML = codeHTML
}

// Affiche le vehicule à l'index <indexv>
function afficherVehicule(indexv) {
    // Déclaration
    const v = vehicules[indexv]
    const ContainerPassager = document.getElementById('ContainerPassager')

    // Création du code html pour présenter correctement les informations du véhicule
    let codeHTML = `    <section class='ligne'>
                            <p class='cart2'>Véhicule </p> <img id="qrcode" src="../img/qrcode.png" alt="qrcode">
                        </section>
                        <section class='ligne'>
                            <p class='cart2'>Catégorie </p> <p class='cart2g'>&nbsp; ${v.libelle}</p>
                        </section>
                        <section class='ligne'>
                            <p class='cart2'>Nombre </p> <p class='cart2g'>&nbsp; ${v.quantite}</p>
                        </section>
                        <section class='ligne'>
                            <p class='cart2'>Prix </p> <p class='cart2g'>&nbsp; ${v.prix}</p>
                        </section>`

    ContainerPassager.innerHTML = codeHTML
}


// --- Partie de la gestion du bouton valider sur la page cartes_embarquement ---
// Déclaration
let valider = document.getElementById("bout")

valider.addEventListener("click", function() {
    const valeur = document.getElementById("nom").value;
    getUneReservation(valeur)
});

document.getElementById('Logo').addEventListener('click', () => {
    window.location.href = 'accueil.html';
});