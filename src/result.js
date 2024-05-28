const baseName = document.getElementById("base-name");
const targetName = document.getElementById("target-name");
const resultElement = document.getElementById("result");
const baseElmt = document.getElementById("base-result");
const baseIcon = document.getElementById("base-icon");
const baseDescription = document.querySelectorAll(".base-description");
const targetIcon = document.getElementById("target-icon");
const targetDescription = document.querySelectorAll(".target-description");
const swapButton = document.getElementById("swap-button");

const baseLink = document.getElementById("base-link");

const targetLink = document.getElementById("target-link");
// Ajoute un écouteur d'événement pour quand le DOM est complètement chargé

const url = new URL(document.location);
let base = url.searchParams.get("base");
let target = url.searchParams.get("target");

const refreshBtn = document.getElementById('refresh-btn');
const lastUpdatedTime = document.getElementById('last-updated-time');

let lastUpdate; // Déclarez lastUpdate ici


// Fonction pour afficher le temps écoulé depuis la dernière mise à jour
function updateLastUpdatedTime() {
    if (!lastUpdate) return;
    const now = new Date();
    const minutesAgo = Math.floor((now - lastUpdate) / 60000);
    lastUpdatedTime.innerText = `Last updated ${minutesAgo} minute${minutesAgo>1 ?"s":""} ago`;
}

// Fonction pour démarrer le minuteur de mise à jour
function startUpdateTimer() {
    updateLastUpdatedTime(); // Met à jour immédiatement
    setInterval(updateLastUpdatedTime, 60000); // Met à jour toutes les minutes
}
async function fetchAndDisplayExchangeRate() {
    if (base && target) {
        try {
            const baseInfo = getCurrencyInfo(base);
            const targetInfo = getCurrencyInfo(target);
            const rate = await fetchExchangeRate(base, target);

            baseElmt.innerHTML = `1.00 ${baseInfo.description}=`;
            resultElement.innerHTML = `${rate} ${targetInfo.description}`;
            lastUpdate = new Date(); // Met à jour l'heure de la dernière mise à jour
            updateLastUpdatedTime(); // Met à jour l'affichage de l'heure
            startUpdateTimer();
        } catch (error) {
            resultElement.innerHTML = "Error fetching exchange rate.";
        }
    } else {
        resultElement.innerHTML = "Invalid parameters.";
    }
}
// Fonction pour mettre à jour l'affichage des taux de change
async function updateExchangeRate() {
    fetchAndDisplayExchangeRate()
    lastUpdate = new Date(); // Met à jour l'heure de la dernière mise à jour
    updateLastUpdatedTime(); // Met à jour l'affichage de l'heure
    startUpdateTimer(); // Démarre le minuteur pour les mises à jour
}
// Événement de clic pour le bouton de rafraîchissement
refreshBtn.addEventListener('click', updateExchangeRate);

swapButton.addEventListener("click", () => {
    [base, target] = [target, base]; // Swap base and target
    updateCurrencyDisplay();
    fetchAndDisplayExchangeRate();
});

async function init() {
    updateCurrencyDisplay();
    await fetchAndDisplayExchangeRate();
}

init();
function updateCurrencyDisplay() {
    const baseInfo = getCurrencyInfo(base);
    const targetInfo = getCurrencyInfo(target);

    baseName.textContent = `${base}- `;
    targetName.textContent = `${target}- `;
    baseIcon.src = baseInfo.icon;
    baseDescription.forEach(
        (description) => (description.textContent = `${baseInfo.description}`),
    );
    targetIcon.src = targetInfo.icon;
    targetDescription.forEach(
        (det) => (det.textContent = targetInfo.description),
    );
    // Met à jour les liens vers les pages Wikipédia
    baseLink.href = baseInfo.wikipedia;
    targetLink.href = targetInfo.wikipedia;
}

function getCurrencyInfo(currency) {
    const currencies = {
        USD: {
            icon: "./img/flags/flag-united-states.png",
            description: "US Dollar",
            wikipedia: "https://en.wikipedia.org/wiki/United_States_dollar"
        },
        EUR: {
            icon: "./img/flags/flag-european-union.png",
            description: "Euro",
            wikipedia: "https://en.wikipedia.org/wiki/Euro"
        },
        CAD: {
            icon: "./img/flags/flag-canada.png",
            description: "Canadian Dollar",
            wikipedia: "https://en.wikipedia.org/wiki/Canadian_dollar"
        },
        // Ajoutez plus d'informations sur les devises ici
    };
    return (
        currencies[currency] || {
            icon: "./img/flags/default.png",
            description: "Unknown Currency",
            wikipedia: "https://en.wikipedia.org/wiki/Currency"
        }
    );
}

// Fonction pour récupérer le taux de change
async function fetchExchangeRate(base, target) {
    const apiKey = "39d41333dc932cc45f07b10a";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("La réponse du réseau n'était pas correcte");
        }
        const data = await response.json();
        if (data.conversion_rate) {
            return data.conversion_rate;
        } else {
            throw new Error("Le taux de conversion n'est pas disponible");
        }
    } catch (error) {
        console.error("Il y a eu un problème avec l'opération fetch:", error);
        throw error;
    }
}
