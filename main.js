const baseButtons = document.querySelectorAll(".currency-btn"),
targetButtons = document.querySelectorAll(".target-btn")


let selectedBaseCurrency = null;
let selectedTargetCurrency = null;

const exchangeRateBtn = document.getElementById('exchange-rate-btn'); // Assurez-vous que cette classe est correcte
// console.log(exchangeRateBtn)

document.addEventListener("DOMContentLoaded", () => {
    baseButtons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button, true));
    });

    targetButtons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button, false));
    });
});
// Active le bouton de taux de change seulement si les deux devises (base et target) sont sélectionnées
function checkSelection() {
    const isSelectionComplete = selectedBaseCurrency && selectedTargetCurrency;
        exchangeRateBtn.disabled = !isSelectionComplete;
    const linkHTML = exchangeRateBtn.querySelector("a")
        // Si les deux devises sont sélectionnées, met à jour le lien du bouton
        if (isSelectionComplete) {
            linkHTML.setAttribute('href', `results.html?base=${selectedBaseCurrency}&target=${selectedTargetCurrency}`);
        } else {
            // Si une des devises n'est pas sélectionnée, enlève le lien
            linkHTML.removeAttribute('href');
        }
}
function handleButtonClick(button, isBase) {
    const currency = button.dataset.currency;
    console.log(currency)
    if (isBase) {
        selectedBaseCurrency = currency; // Met à jour la devise de base sélectionnée
        baseButtons.forEach(btn => {
            btn.classList.toggle('selected', btn === button);
            btn.disabled = false; // Réactive tous les boutons de base
        });
        targetButtons.forEach(btn => {
            btn.disabled = btn.dataset.currency === currency; // Désactive le bouton de devise cible correspondant à la devise de base sélectionnée
        });
    } else {
        selectedTargetCurrency = currency;
        targetButtons.forEach(btn => {
            btn.classList.toggle('selected', btn === button);
        });
        // Aucun changement d'état des boutons base ici
    }
    
    checkSelection();
};

// // Récupère l'URL actuelle
// const url = new URL(document.location);

// // Extrait les paramètres 'base' et 'target' de l'URL
// const base = url.searchParams.get('base');
// const target = url.searchParams.get('target');

// Sélectionne le bouton pour obtenir le taux de change
// const exchangeRateBtn = document.getElementById('exchange-rate-btn'); // Assurez-vous que cette classe est correcte

// Vérifie si le bouton existe
// if (exchangeRateBtn) {
//     // Ajoute un écouteur d'événement de clic au bouton
//     exchangeRateBtn.addEventListener("click", async () => {
//         try {
//             // Appelle la fonction fetchExchangeRate et attend le résultat
//             const rate = await fetchExchangeRate(base, target);
//             // Sélectionne l'élément où afficher le résultat
//             const result = document.getElementById('result');
//             // Vérifie si l'élément résultat existe
//             if (result) {
//                 // Affiche le taux de conversion dans l'élément résultat
//                 result.innerHTML = `${rate} Euros`;
//             } else {
//                 console.error("L'élément de résultat n'a pas été trouvé.");
//             }
//         } catch (error) {
//             console.error("Erreur lors de la récupération du taux de change :", error);
//         }
//     });
// } else {
//     console.error("Le bouton de taux de change n'a pas été trouvé.");
// }

// Fonction pour récupérer le taux de change
async function fetchExchangeRate(base, target) {
    const apiKey = '39d41333dc932cc45f07b10a';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`;

    try {
        // Fait une requête à l'API pour obtenir le taux de change
        const response = await fetch(url);
        // Vérifie si la réponse est correcte
        if (!response.ok) {
            throw new Error('La réponse du réseau n\'était pas correcte');
        }
        // Convertit la réponse en JSON
        const data = await response.json();
        // Vérifie si le taux de conversion est présent dans les données
        if (data.conversion_rate) {
            return data.conversion_rate; // Retourne le taux de conversion
        } else {
            throw new Error('Le taux de conversion n\'est pas disponible');
        }
    } catch (error) {
        console.error('Il y a eu un problème avec l\'opération fetch:', error);
        throw error; // Relance l'erreur pour qu'elle soit capturée dans l'écouteur d'événement
    }
}


// fetchExchangeRate('USD', 'EUR')

