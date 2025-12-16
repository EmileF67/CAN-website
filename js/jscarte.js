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
                            <p>Gare de départ :</p>
                        </section>
                        <section class="datas2">
                            <p class="car">Carte d'embarquement</p>
                            <section class="blanc">
                            </section>
                        </section>
                    </section>`

        ContainerReservations.innerHTML = codeHTML

        const LaDate = new Date();

    } catch (error){ // Gérer les erreurs
        console.error('Une erreur est survenue :', error)
        return
    }
};

let valider = document.getElementById("bout")
valider.addEventListener("click", function() {
    const valeur = document.getElementById("nom").value;
    getUneReservation(valeur)
});