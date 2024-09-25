const baseButtons = document.querySelectorAll(".currency-btn"),
targetButtons = document.querySelectorAll(".target-btn")
const menuElementsToToggle = document.querySelectorAll(".toggle-menu");
const iconeToggle = document.querySelector(".icone-toggle");

const toggleMenu = () => {
    menuElementsToToggle.forEach(menu => {
        menu.classList.toggle("hidden");
    });
}

iconeToggle.addEventListener("click", toggleMenu);


let selectedBaseCurrency = null;
let selectedTargetCurrency = null;

const exchangeRateBtn = document.getElementById('exchange-rate-btn'); // Assurez-vous que cette classe est correcte


document.addEventListener("DOMContentLoaded", () => {
    // Désactive tous les boutons de devise cible au chargement de la page
    targetButtons.forEach(button => {
        button.disabled = true;
    });
    
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
    updateButtonStates();
    checkSelection();
};

function updateButtonStates() {
    // Activer les boutons de la devise cible uniquement si une devise de base est sélectionnée
    targetButtons.forEach(button => {
        button.disabled = !selectedBaseCurrency;
    });

    // Désactiver le bouton de la devise de base correspondant à la devise cible sélectionnée
    baseButtons.forEach(button => {
        button.disabled = button.dataset.currency === selectedTargetCurrency;
        button.classList.toggle('selected', button.dataset.currency === selectedBaseCurrency);
    });

    // Désactiver le bouton de la devise cible correspondant à la devise de base sélectionnée
    targetButtons.forEach(button => {
        button.disabled = button.dataset.currency === selectedBaseCurrency || !selectedBaseCurrency;
        button.classList.toggle('selected', button.dataset.currency === selectedTargetCurrency);
    });

    // Activer le bouton d'échange si les deux devises (base et cible) sont sélectionnées
    exchangeRateBtn.disabled = !(selectedBaseCurrency && selectedTargetCurrency);
}