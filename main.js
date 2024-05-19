const baseButtons = document.querySelectorAll(".currency-btn"),
targetButtons = document.querySelectorAll(".target-btn"),
exchangeRateBtn = document.getElementById('exchange-rate-btn');

let selectedBaseCurrency = null;
let selectedTargetCurrency = null;



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
        console.log(linkHTML.href)
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