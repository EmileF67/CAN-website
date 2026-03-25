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

// --- Partie concernant toutes les statistiques à afficher ---
// Déclaration
const art = document.getElementsByClassName("artstats")[0];
const but = document.getElementsByClassName("affiche")[0];
// Bouton afficher les stats
but.addEventListener("click", Afficher);

// Fonction Afficher, qui attribuée au bouton afficher les stats va récupérer 
// les informations nécessaires pour ensuite les formatter et les afficher sur le site.
async function Afficher() {
    art.textContent = "";
    let sommeCaPass = 0;
    let sommeCaVoit = 0;
    let totalPass = 0;
    let totalVoit = 0;

    // Noms des colonnes du tableau
    art.innerHTML = `
        <h1 class="titrepage">Novembre 2025</h1>
        <table class="stats">
            <thead>
                <tr>
                    <th class="thstats">Liaison</th>
                    <th class="thstats">CA Passagers</th>
                    <th class="thstats">Nb passagers</th>
                    <th class="thstats">CA Véhicules</th>
                    <th class="thstats">Nb véhicules</th>
                </tr>
            </thead>
            <tbody id="donneetab"></tbody>
        </table>`

    const donneetab = document.getElementById("donneetab");

    // Pour chaque liaisons
    for (let i = 1; i <= 4; i++) {
        try {
            // Récupération d'information classique
            const response = await fetch(
                `/api/liaison/${i}/chiffreAffaire`
            );

            if (!response.ok) {
                throw new Error("Erreur réseau");
            }

            const data = await response.json();

            // Ajouter les chiffres aux totaux
            sommeCaPass += data.passagers.chiffreAffaire;
            sommeCaVoit += data.vehicules.chiffreAffaire;
            totalPass += data.passagers.nombre;
            totalVoit += data.vehicules.quantite;
            
            // Une ligne du tableau qui contient les infos de la liaison <i>
            donneetab.innerHTML += `
                <tr>
                    <td class="tdstats">Liaison ${i}</td>
                    <td class="tdstats">${arrondir(data.passagers.chiffreAffaire).toString().replace('.', ',')} €</td>
                    <td class="tdstats">${data.passagers.nombre}</td>
                    <td class="tdstats">${arrondir(data.vehicules.chiffreAffaire).toString().replace('.', ',')} €</td>
                    <td class="tdstats">${data.vehicules.quantite}</td>
                </tr>
            `
        } catch (error) {
            console.error("Erreur :", error);
        }
    }
    
    // La ligne du total du tableau
    donneetab.innerHTML += `
                <tr class="total">
                    <td class="tdstats"><strong>Total</strong></td>
                    <td class="tdstats"><strong>${arrondir(sommeCaPass).toString().replace('.', ',')} €</strong></td>
                    <td class="tdstats"><strong>${totalPass}</strong></td>
                    <td class="tdstats"><strong>${arrondir(sommeCaVoit).toString().replace('.', ',')} €</strong></td>
                    <td class="tdstats"><strong>${totalVoit}</strong></td>
                </tr>`
}

function arrondir(n) {
    return Math.round(n * 100) / 100;
}
//Pour arrondir à deux décimal

document.getElementById('Logo').addEventListener('click', () => {
    window.location.href = 'accueil.html';
});
