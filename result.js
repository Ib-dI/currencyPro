


// Fonction pour récupérer le taux de change
async function fetchExchangeRate(base, target) {
    const apiKey = '39d41333dc932cc45f07b10a';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('La réponse du réseau n\'était pas correcte');
        }
        const data = await response.json();
        if (data.conversion_rate) {
            return data.conversion_rate;
        } else {
            throw new Error('Le taux de conversion n\'est pas disponible');
        }
    } catch (error) {
        console.error('Il y a eu un problème avec l\'opération fetch:', error);
        throw error;
    }
}

// Ajoute un écouteur d'événement pour quand le DOM est complètement chargé

const url = new URL(document.location);
    const base = url.searchParams.get('base');
    const target = url.searchParams.get('target');

    // Vérifie si les paramètres 'base' et 'target' sont présents
    if (base && target) {
        try {

            // const rate = await fetchExchangeRate(base, target);
            const result = document.getElementById('result');
            if (result) {
                result.innerHTML = `${rate}`;
            } else {
                console.error("L'élément de résultat n'a pas été trouvé.");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du taux de change :", error);
        }
    } else {
        console.error("Les paramètres 'base' et 'target' ne sont pas présents dans l'URL.");
        const result = document.getElementById('result');
        if (result) {
            result.innerHTML = "Les paramètres 'base' et 'target' ne sont pas définis.";
        }
    }
// document.addEventListener('DOMContentLoaded', async () => {
//     const url = new URL(document.location);
//     const base = url.searchParams.get('base');
//     const target = url.searchParams.get('target');

//     // Vérifie si les paramètres 'base' et 'target' sont présents
//     if (base && target) {
//         try {
//             console.log(base, target)

//             const rate = await fetchExchangeRate(base, target);
//             const result = document.getElementById('result');
//             if (result) {
//                 result.innerHTML = `${rate}`;
//             } else {
//                 console.error("L'élément de résultat n'a pas été trouvé.");
//             }
//         } catch (error) {
//             console.error("Erreur lors de la récupération du taux de change :", error);
//         }
//     } else {
//         console.error("Les paramètres 'base' et 'target' ne sont pas présents dans l'URL.");
//         const result = document.getElementById('result');
//         if (result) {
//             result.innerHTML = "Les paramètres 'base' et 'target' ne sont pas définis.";
//         }
//     }
// });