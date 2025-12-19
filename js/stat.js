const art = document.getElementsByClassName("principal")[0]

const but = document.getElementsByClassName("affiche")[0]

but.addEventListener("click",Afficher)

function Afficher(){
    const art = document.getElementsByClassName("principal")[0]

    art.textContent = ""

    let sommeCaPass = 0

    for(let i = 1; i<5; i++){
        const getDonnees = async (art, i, sommeCaPass) => {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/liaison/${i}/chiffreAffaire`
            );

            console.log("status =", response.status);


            if (!response.ok) {
                throw new Error("Erreur réseau !");
            }

            const data = await response.json();

            sommeCaPass += data[passagers].chiffreAffaire
            art.innerHTML += `<p>Voici le chiffre d'affaire de la liaison n°${i}, est de : ${data[passagers].chiffreAffaire} pour ${data[passagers].nombre} passagers, Pour les véhicules est de : ${data[vehicules].chiffreAffaire} pour ${data[vehicules].nombre}</p>`


        } catch (error) {
            console.error("Une erreur est survenue :", error);
        }
    };

    getDonnees(art, i, sommeCaPass);
    }
    
}