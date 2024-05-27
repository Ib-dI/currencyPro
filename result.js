const baseName = document.getElementById('base-name')
const targetName = document.getElementById('target-name')
const resultElement = document.getElementById('result');
const baseElmt = document.getElementById('base-result');
const baseIcon = document.getElementById('base-icon');
const baseDescription = document.querySelectorAll('.base-description');
const targetIcon = document.getElementById('target-icon');
const targetDescription = document.querySelectorAll('.target-description');
const swapButton = document.getElementById('swap-button');


// Ajoute un écouteur d'événement pour quand le DOM est complètement chargé

const url = new URL(document.location);
let base = url.searchParams.get('base');
let target = url.searchParams.get('target');

// Vérifie si les paramètres 'base' et 'target' sont présents
// if (base && target) {
//     try {

//         // const rate = await fetchExchangeRate(base, target);
//         const result = document.getElementById('result');
//         if (result) {
//             result.innerHTML = `${rate}`;
//         } else {
//             console.error("L'élément de résultat n'a pas été trouvé.");
//         }
//     } catch (error) {
//         console.error("Erreur lors de la récupération du taux de change :", error);
//     }
// } else {
//     console.error("Les paramètres 'base' et 'target' ne sont pas présents dans l'URL.");
//     const result = document.getElementById('result');
//     if (result) {
//         result.innerHTML = "Les paramètres 'base' et 'target' ne sont pas définis.";
//     }
// }
async function fetchAndDisplayExchangeRate() {
    if (base && target) {
        try {
            const baseInfo = getCurrencyInfo(base);
            const targetInfo = getCurrencyInfo(target);
            const rate = await fetchExchangeRate(base, target);
            
            baseElmt.innerHTML = `1 ${baseInfo.description} =`
            resultElement.innerHTML = `${rate} ${targetInfo.description}`;
        } catch (error) {
            resultElement.innerHTML = "Error fetching exchange rate.";
        }
    } else {
        resultElement.innerHTML = "Invalid parameters.";
    }
}

swapButton.addEventListener('click', () => {
    [base, target] = [target, base]; // Swap base and target
    updateCurrencyDisplay();
    fetchAndDisplayExchangeRate();
});

updateCurrencyDisplay();
await fetchAndDisplayExchangeRate();
function updateCurrencyDisplay() {
    const baseInfo = getCurrencyInfo(base);
    const targetInfo = getCurrencyInfo(target);
    
    baseName.textContent = `${base}- `;
    targetName.textContent = `${target}- `;
    baseIcon.src = baseInfo.icon;
    baseDescription.forEach(description => description.textContent = `${baseInfo.description}`) ;
    targetIcon.src = targetInfo.icon;
    targetDescription.forEach(det => det.textContent = targetInfo.description) ;
}

function getCurrencyInfo(currency) {
    const currencies = {
        'USD': {
            name: 'USD',
            icon: 'img/flags/flag-united-states.png',
            description: 'US Dollar'
        },
        'EUR': {
            name: 'EUR',
            icon: 'img/flags/flag-european-union.png',
            description: 'Euro'
        },
        'CAD': {
            name: 'CAD',
            icon: 'img/flags/flag-canada.png',
            description: 'Canadian Dollar'
        }
        // Add more currency info here
    };
    return currencies[currency] || {
        name: 'Unknown',
        icon: 'img/flags/default.png',
        description: 'Unknown Currency'
    };
}

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