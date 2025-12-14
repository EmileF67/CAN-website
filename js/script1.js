var nbenfant = 0
var nbjeune = 0
var nbadulte = 0
var nbbebe = 0
var nbanimal = 0

var tarifenfant = 0
var tarifjeune = 0
var tarifadulte = 0
var tarifanimal = 0
var tarifptot = 0

var nbtrot = 0
var nbvelo = 0
var nbvelelec = 0
var nbcartand = 0
var nbmobil = 0
var nbmoto = 0
var nbcat1 = 0
var nbcat2 = 0
var nbcat3 = 0
var nbcat4 = 0
var nbcamp = 0

var tariftrot = 0
var tarifvelo = 0
var tarifvelelec = 0
var tarifcartand = 0
var tarifmobil = 0
var tarifmoto = 0
var tarifcat1 = 0
var tarifcat2 = 0
var tarifcat3 = 0
var tarifcat4 = 0
var tarifcamp = 0
var tarifvtot = 0
var tariftotal = 0

var tariftrotseul = 0
var tarifveloseul = 0
var tarifvelelecseul = 0
var tarifcartandseul = 0
var tarifmobilseul = 0
var tarifmotoseul = 0
var tarifcat1seul = 0
var tarifcat2seul = 0
var tarifcat3seul = 0
var tarifcat4seul = 0
var tarifcampseul = 0
var tarifenfantseul = 0
var tarifjeuneseul = 0
var tarifadulteseul = 0
var tarifanimalseul = 0


const getUneReservation = async (nb) => {
    try{
        nbenfant = 0
        nbjeune = 0
        nbadulte = 0
        nbbebe = 0
        nbanimal = 0

        tarifenfant = 0
        tarifjeune = 0
        tarifadulte = 0
        tarifptot = 0
        tarifanimal = 0

        nbtrot = 0
        nbvelo = 0
        nbvelelec = 0
        nbcartand = 0
        nbmobil = 0
        nbmoto = 0
        nbcat1 = 0
        nbcat2 = 0
        nbcat3 = 0
        nbcat4 = 0
        nbcamp = 0

        tariftrot = 0
        tarifvelo = 0
        tarifvelelec = 0
        tarifcartand = 0
        tarifmobil = 0
        tarifmoto = 0
        tarifcat1 = 0
        tarifcat2 = 0
        tarifcat3 = 0
        tarifcat4 = 0
        tarifcamp = 0
        tarifvtot = 0
        tariftotal = 0
        

        tariftrotseul = 0
        tarifveloseul = 0
        tarifvelelecseul = 0
        tarifcartandseul = 0
        tarifmobilseul = 0
        tarifmotoseul = 0
        tarifcat1seul = 0
        tarifcat2seul = 0
        tarifcat3seul = 0
        tarifcat4seul = 0
        tarifcampseul = 0

        tarifenfantseul = 0
        tarifjeuneseul = 0
        tarifadulteseul = 0
        tarifanimalseul = 0

        document.getElementById('ContainerReservations').textContent = ""

    const response = await
        fetch(`https://can.iutrs.unistra.fr/api/reservation/${nb}`)
    //Vérifier si la réponse est correcte
    if(!response.ok) {
            throw new Error('Erreur de réseau !')
            alert("Aucune réservation trouvée. Veuillez entrer un autre numéro de réservation")
            return
    }
    //Sinon Retourner le résultat au format JSON
    const data = await response.json()
    //Traiter les données récupérées
    const ContainerReservations = document.getElementById('ContainerReservations');

    for(let i = 0; i < data.nbPassagers; i ++)
			{
				await getUnPassager(data.portDepart, nb, i+1);
			}

    for(let i = 0; i < data.nbVehicules; i ++)
			{
				await getUnVehicule(data.portDepart, nb, i+1);
			}

    let ligneP = ""

    let ligneV = ""

    if(nbadulte > 0) 
    {
        ligneP += `<tr>
						<td>Adulte 26 ans et plus</td> 	<td>${nbadulte}</td> <td>${tarifadulteseul.toString().replace('.', ',')}</td> <td>${tarifadulte.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbjeune > 0) 
    {
        ligneP += `<tr>
						<td>Jeune 18 à 25 ans inclus</td> 	<td>${nbjeune}</td> <td>${tarifjeuneseul.toString().replace('.', ',')}</td> <td>${tarifjeune.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbenfant > 0) 
    {
        ligneP += `<tr>
						<td>Enfant 4 à 17 inclus</td> 	<td>${nbenfant}</td> <td>${tarifenfantseul.toString().replace('.', ',')}</td> <td>${tarifenfant.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbbebe > 0) 
    {
        ligneP += `<tr>
						<td>Bébé moins de 4 ans</td> 	<td>${nbbebe}</td> <td>gratuit</td> <td>0</td>
					</tr>`
    }
    if(nbanimal > 0) 
    {
        ligneP += `<tr>
						<td>Animal de compagnie</td> 	<td>${nbanimal}</td> <td>3,35</td> <td>${tarifanimal.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbtrot > 0) 
    {
        ligneV += `<tr>
						<td>Trottinette électrique</td> 	<td>${nbtrot}</td> <td>${tariftrotseul.toString().replace('.', ',')}</td> <td>${tariftrot.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbvelo > 0) 
    {
        ligneV += `<tr>
						<td>Vélo ou remorque à vélo</td> 	<td>${nbvelo}</td> <td>${tarifveloseul.toString().replace('.', ',')}</td> <td>${tarifvelo.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbvelelec > 0) 
    {
        ligneV += `<tr>
						<td>Vélo électrique </td> 	<td>${nbvelelec}</td> <td>${tarifvelelecseul.toString().replace('.', ',')}</td> <td>${tarifvelelec.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbcartand > 0) 
    {
        ligneV += `<tr>
						<td>Vélo cargo ou tandem </td> 	<td>${nbcartand}</td> <td>${tarifcartandseul.toString().replace('.', ',')}</td> <td>${tarifcartand.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbmobil > 0) 
    {
        ligneV += `<tr>
						<td>Deux-roues <= 125 cm3</td> 	<td>${nbmobil}</td> <td>${tarifmobilseul.toString().replace('.', ',')}</td> <td>${tarifmobil.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbmoto > 0) 
    {
        ligneV += `<tr>
						<td>Deux-roues > 125 cm3</td> 	<td>${nbmoto}</td> <td>${tarifmotoseul.toString().replace('.', ',')}</td> <td>${tarifmoto.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbcat1> 0) 
    {
        ligneV += `<tr>
						<td>Voiture moins de 4 m</td> 	<td>${nbcat1}</td> <td>${tarifcat1seul.toString().replace('.', ',')}</td> <td>${tarifcat1.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbcat2 > 0) 
    {
        ligneV += `<tr>
						<td>Voiture de 4 m à 4,39 m</td> 	<td>${nbcat2}</td> <td>${tarifcat2seul.toString().replace('.', ',')}</td> <td>${tarifcat2.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbcat3 > 0) 
    {
        ligneV += `<tr>
						<td>Voiture de 4,40 m à 4,79 m</td> 	<td>${nbcat3}</td> <td>${tarifcat3seul.toString().replace('.', ',')}</td> <td>${tarifcat3.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbcat4 > 0) 
    {
        ligneV += `<tr>
						<td>Voiture 4,80 m et plus</td> 	<td>${nbcat4}</td> <td>${tarifcat4seul.toString().replace('.', ',')}</td> <td>${tarifcat4.toString().replace('.', ',')}</td>
					</tr>`
    }
    if(nbcamp > 0) 
    {
        ligneV += `<tr>
						<td>Camping-car - véhicule plus de 2,10 de haut</td> 	<td>${nbcamp}</td> <td>${tarifcampseul.toString().replace('.', ',')}</td> <td>${tarifcamp.toString().replace('.', ',')}</td>
					</tr>`
    }

    tariftotal = tarifvtot + tarifptot



    let codeHTML = `<section class='page'>
                    <img id='Logo2' src='../img/CAN.png' alt='Logo'> 
                    <p class='factTitre'>Facture</p>
                    <p class='fact'>Illkirch le <span id='datedujour'></span></p>
                    <br>
                    <section>
                        <p class='factgras'>Réservation n° : </p> <p class='fact'>&nbsp; ${data.id}</p>
                    </section>
                    <section>
                        <p class='factgras'>Nom de réservation : </p> <p class='fact'>&nbsp; ${data.nom}</p>
                    </section>
                    <br>
                    <section>
                        <p class='factgras'>Traversée : </p> <p class='fact'>&nbsp; ${data.portDepart} - ${data.portArrivee}</p>
                    </section>
                    <section>
                        <p class='factgras'>Date : </p> <p class='fact'>&nbsp; ${data.date.split("-")[2]}/${data.date.split("-")[1]}/${data.date.split("-")[0]}</p>
                    </section>
                    <section>
                        <p class='factgras'>Départ : </p> <p class='fact'>&nbsp; ${data.heure}</p>
                    </section>
                    <section>
                        <p class='factgras'>Bateau : </p> <p class='fact'>&nbsp; ${data.bateau}</p>
                    </section>
                    <br>
                    <p class='factgras'>Les personnes </p>
                    <br>
                    <table>
						<thead> 
							<tr>
								<th>Catégorie</th><th>Nombre</th><th>Prix unitaire</th><th>Prix en ligne</th>
							</tr>
						</thead>
						<tbody>
                            ${ligneP}
                        </tbody>
                    </table>
                    <section class='soustot'>
                        <p class='fact'>Sous total personnes : <span>&nbsp; ${arrondir(tarifptot).toString().replace('.', ',')}€</span></p>
                    </section>
                    <p class='factgras'>Les véhicules </p>
                    <br>
                    <table>
						<thead> 
							<tr>
								<th>Catégorie</th><th>Quantité</th><th>Prix unitaire</th><th>Prix en ligne</th>
							</tr>
						</thead>
						<tbody>
							${ligneV}
						</tbody>
                    </table>
                    <section class='soustot'>
                        <p class='fact'>Sous total véhicules : <span>&nbsp; ${arrondir(tarifvtot).toString().replace('.', ',')}€</span></p>
                    </section>
                    <section class='soustot'>
                        <p class='fact'>Prix total : <span>&nbsp; ${arrondir(tariftotal).toString().replace('.', ',')}€</span></p>
                    </section>
                    </section>`
        
        // <span> créé une petite zone de texte sans retour ligne
        // &nbsp = espace insécable
        ContainerReservations.innerHTML = codeHTML

        const LaDate = new Date();
        document.getElementById('datedujour').textContent = LaDate.toLocaleDateString()
        //Récupérer la date du jour

    } catch (error){ // Gérer les erreurs
        alert("Aucune réservation trouvée. Veuillez entrer un autre numéro de réservation")
        console.error('Une erreur est survenue :', error)
        return
    }
};

const getUnPassager = async (port, nbr, nbp) => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/reservation/${nbr}/passager/${nbp}`
            );

            if (!response.ok) {
                throw new Error("Erreur réseau !");
            }

            const data = await response.json(); 

            if(port === 'Lorient')
            {
                if(data.libelleCategorie === "Bébé moins de 4 ans")
                {
                    nbbebe += 1
                }
                if(data.libelleCategorie === "Enfant 4 à 17 ans inclus")
                {
                    nbenfant += 1
                    tarifenfant += 11.25
                    tarifenfantseul = 11.25
                }
                if(data.libelleCategorie === "Jeune 18 à 25 ans inclus")
                {
                    nbjeune += 1
                    tarifjeune += 13.80
                    tarifjeuneseul = 13.80
                }
                if(data.libelleCategorie === "Adulte 26 ans et plus")
                {
                    nbadulte += 1
                    tarifadulte += 18.75
                    tarifadulteseul = 18.75
                }
                if(data.libelleCategorie === "Aninal de compagnie")
                {
                    nbanimal += 1
                    tarifanimal += 3.35
                    tarifanimalseul = 3.35
                }
            }
            else
            {
                if(data.libelleCategorie === "Bébé moins de 4 ans")
                {
                    nbbebe += 1
                }
                if(data.libelleCategorie === "Enfant 4 à 17 ans inclus")
                {
                    nbenfant += 1
                    tarifenfant += 11.65
                    tarifenfantseul = 11.65
                }
                if(data.libelleCategorie === "Jeune 18 à 25 ans inclus")
                {
                    nbjeune += 1
                    tarifjeune += 14.10
                    tarifjeuneseul = 14.10
                }
                if(data.libelleCategorie === "Adulte 26 ans et plus")
                {
                    nbadulte += 1
                    tarifadulte += 18.80
                    tarifadulteseul = 18.80
                }
                if(data.libelleCategorie === "Aninal de compagnie")
                {
                    nbanimal += 1
                    tarifanimal += 3.35
                    tarifanimalseul = 3.35
                }
            }

            tarifptot = (tarifenfant + tarifjeune + tarifadulte + tarifanimal) 

        } catch (error) {
            console.error("Une erreur est survenue :", error);
    }
};

const getUnVehicule = async (port, nbr, nbv) => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/reservation/${nbr}/vehicule/${nbv}`
            );

            if (!response.ok) {
                throw new Error("Erreur réseau !");
            }

            const data = await response.json(); 

            if (port === "Lorient" || port === "Port-Tudy")
            {
                if(data.code === "trot")
                {
                    nbtrot += 1
                    tariftrot += 4.70
                    tariftrotseul = 4.70
                }
                if(data.code === "velo")
                {
                    nbvelo += 1
                    tarifvelo += 8.20
                    tarifveloseul = 8.20
                }
                if(data.code === "velelec")
                {
                    nbvelelec += 1
                    tarifvelelec += 11.00
                    tarifvelelecseul = 11.00
                }
                if(data.code === "cartand")
                {
                    nbcartand += 1
                    tarifcartand += 16.45
                    tarifcartandseul = 16.45
                }
                if(data.code === "mobil")
                {
                    nbmobil += 1
                    tarifmobil += 23.10
                    tarifmobilseul = 23.10
                }
                if(data.code === "moto")
                {
                    nbmoto += 1
                    tarifmoto += 66.05
                    tarifmotoseul = 66.05
                }
                if(data.code === "cat1")
                {
                    nbcat1 += 1
                    tarifcat1 += 96.05
                    tarifcat1seul = 96.05
                }
                if(data.code === "cat2")
                {
                    nbcat2 += 1
                    tarifcat2 += 114.80
                    tarifcat2seul = 114.80
                }
                if(data.code === "cat3")
                {
                    nbcat3 += 1
                    tarifcat3 += 174.45
                    tarifcat3seul = 174.45
                }
                if(data.code === "cat4")
                {
                    nbcat4 += 1
                    tarifcat4 += 210.90
                    tarifcat4seul = 210.90
                }
                if(data.code === "camp")
                {
                    nbcamp += 1
                    tarifcamp += 330.20
                    tarifcampseul = 330.20
                }
            }
            else
            {
                if(data.code === "trot")
                {
                    nbtrot += 1
                    tariftrot += 4.70
                    tariftrotseul = 4.70
                }
                if(data.code === "velo")
                {
                    nbvelo += 1
                    tarifvelo += 8.20
                    tarifveloseul = 8.20
                }
                if(data.code === "velelec")
                {
                    nbvelelec += 1
                    tarifvelelec += 11.00
                    tarifvelelecseul = 11.00
                }
                if(data.code === "cartand")
                {
                    nbcartand += 1
                    tarifcartand += 16.45
                    tarifcartandseul = 16.45
                }
                if(data.code === "mobil")
                {
                    nbmobil += 1
                    tarifmobil += 23.35
                    tarifmobilseul = 23.35
                }
                if(data.code === "moto")
                {
                    nbmoto += 1
                    tarifmoto += 66.40
                    tarifmotoseul = 66.40
                }
                if(data.code === "cat1")
                {
                    nbcat1 += 1
                    tarifcat1 += 98.50
                    tarifcat1seul = 98.50
                }
                if(data.code === "cat2")
                {
                    nbcat2 += 1
                    tarifcat2 += 117.20
                    tarifcat2seul = 117.20
                }
                if(data.code === "cat3")
                {
                    nbcat3 += 1
                    tarifcat3 += 176.90
                    tarifcat3seul = 176.90
                }
                if(data.code === "cat4")
                {
                    nbcat4 += 1
                    tarifcat4 += 213.35
                    tarifcat4seul = 213.35
                }
                if(data.code === "camp")
                {
                    nbcamp += 1
                    tarifcamp += 332.70
                    tarifcampseul = 332.70
                }
            }

            

            tarifvtot = (tariftrot + tarifvelo + tarifvelelec + tarifcartand + tarifmobil +
                        tarifmoto + tarifcat1 + tarifcat2 + tarifcat3 + tarifcat4 + tarifcamp)

        } catch (error) {
            console.error("Une erreur est survenue :", error);
    }
};

let valider = document.getElementById("bout")
valider.addEventListener("click", function() {
    const valeur = document.getElementById("nom").value;
    getUneReservation(valeur)
});

function arrondir(n) {
    return Math.round(n * 100) / 100;
}
//Pour arrondir à deux décimal