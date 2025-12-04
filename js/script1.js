const getUneReservation = async () => {
try{
    const response = await
        fetch(`https://rickandmortyapi.com/api/character/${nb}`);
//Vérifier si la réponse est correcte
if(!response.ok) {
        throw new Error('Erreur de réseau !');
}
//Sinon Retourner le résultat au format JSON
const data = await response.json();
//Traiter les données récupérées
const ContainerReservations =
        document.getElementById('ContainerReservations');
let codeHTML = ` <p>Id: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Status: ${data.status}</p>
        <p>Species: ${data.species}</p>
        <img src="${data.image}" alt="${data.name}"> `;
    // Afficher le code HTML dans le container
    ContainerReservations.innerHTML = codeHTML;
} catch (error){ // Gérer les erreurs
    console.error('Une erreur est survenue :', error);
}
};
// Appeler la fonction pour récupérer et afficher le personnage
getUneReservation();

let valider = document.getElementById("bout")
const ContainerReservations = document.getElementById('ContainerReservations');
valider.addEventListener("click", function() {
    ContainerReservations.innerHTML = "<section class='page'><img id='Logo2' src='../img/CAN.png' alt='Logo'> <p class='factTitre'>Facture</p> <p class='fact'>Illkirch le 20/10/2025</p></section>";
});

/*Mettre un fondu au noir derrière la facture */
