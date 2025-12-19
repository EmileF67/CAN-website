const art = document.getElementsByClassName("principal")[0];
const but = document.getElementsByClassName("affiche")[0];

but.addEventListener("click", Afficher);

async function Afficher() {
    art.textContent = "";
    let sommeCaPass = 0;
    let sommeCaVoit = 0;

    for (let i = 1; i <= 4; i++) {
        try {
            const response = await fetch(
                `https://can.iutrs.unistra.fr/api/liaison/${i}/chiffreAffaire`
            );

            if (!response.ok) {
                throw new Error("Erreur réseau");
            }

            const data = await response.json();

            sommeCaPass += data.passagers.chiffreAffaire;
            sommeCaVoit += data.vehicules.chiffreAffaire;

            art.innerHTML += `
                <p>
                    Liaison n°${i} :<br>
                    Passagers : ${data.passagers.chiffreAffaire} €
                    (${data.passagers.nombre} passagers)<br>
                    Véhicules : ${data.vehicules.chiffreAffaire} €
                    (${data.vehicules.quantite} véhicules)
                </p>
            `;
        } catch (error) {
            console.error("Erreur :", error);
        }
    }

    art.innerHTML += `<p>Total chiffre d'affaire passagers : ${sommeCaPass} €, Pour les véhicules le chiffre d'affaire est de : ${sommeCaVoit} €</p>`;
}
