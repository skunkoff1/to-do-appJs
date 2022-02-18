// Tableau pour sauvegarder mes items 
// (son HTML, son statut, sont contenu texte, son index dans le tableau)
let itemArray = [];
// Récupération de l'input
let input = document.querySelector('.text');
input.addEventListener('keypress', addItem);
input.value = null;

// Récupération des boutons de sélection 
let allButton = document.getElementById('all');
let activeButton = document.getElementById('act');
let completedButton = document.getElementById('com');
let allButtonMobile = document.getElementById('allM');
let activeButtonMobile = document.getElementById('actM');
let completedButtonMobile = document.getElementById('comM');
let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);

//Récupération du bouton dark/lignt
let displayMode = document.querySelector('.mode');
displayMode.addEventListener('click', changeDisplay);
// Mode Dark par défaut
let displayModeSelected = "dark";
// Récupération des icones dark / light
let sunIcon = document.getElementById('sun');
let moonIcon = document.getElementById('moon');

// Fonction sauvegarde en local Storage
window.addEventListener("change", updateStorage, false);

// CLass Item
class Item {
    status; // Statut
    textContent; // contenu texte
    arrayIndex; // index dans le tableau
    itemDiv; // Div principale (c'est un li^^)
    textDiv;
    textElmt;
    doneDiv;
    doneElmt;
    tick;
    crossDiv;
    cross;

    constructor(textContent, status) {
        this.status = status;
        this.textContent = textContent;
        this.arrayIndex = itemArray.length + 1;
        // Création des éléments constituant l'item
        this.itemDiv = document.createElement('li');
        this.doneDiv = document.createElement('div');
        this.textDiv = document.createElement('div');
        this.doneElmt = document.createElement('div');
        this.tick = document.createElement('div');
        this.crossDiv = document.createElement('div');
        this.cross = document.createElement('div');
        this.textElmt = document.createElement('p');
        // Attribution des classes 
        if (displayModeSelected == "dark") {
            this.itemDiv.id = "dark";
        } else {
            this.itemDiv.id = "light";
        }
        this.itemDiv.className = "active";
        this.doneDiv.className = "checkDiv";
        this.textDiv.className = "textDiv";
        this.crossDiv.className = "crossDiv";
        this.doneElmt.className = "check";
        this.tick.className = "tick";
        this.textElmt.className = "itemText";
        this.cross.className = "cross";
        // Attribution du texte
        this.textElmt.innerHTML = textContent;
        this.tick.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>';
        this.cross.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>';
        // Création de la structure de l'item
        this.itemDiv.appendChild(this.doneDiv);
        this.itemDiv.appendChild(this.textDiv);
        this.itemDiv.appendChild(this.crossDiv);
        this.doneDiv.appendChild(this.doneElmt);
        this.doneElmt.appendChild(this.tick);
        this.textDiv.appendChild(this.textElmt);
        this.crossDiv.appendChild(this.cross);
        // Changement du statut si nécessaire
        this.checkItem();
        // Apparition dans le DOM 
        let main = document.getElementById('itemList');
        main.appendChild(this.itemDiv);
        // Remplissage du tableau d'items avec ses propriétés
        itemArray.push([this.itemDiv, this.status, this.textContent, this.arrayIndex]);
        // Mise à jour du compteur en bas de liste
        let countDisplay = document.getElementById('itemLeft');
        if (itemArray.length < 2) {
            countDisplay.innerHTML = itemArray.length + " item left";
        } else {
            countDisplay.innerHTML = itemArray.length + " items left";
        }
        // Récupération du list footer 
        document.getElementById('listFooter').style.display = "flex";
        // Ajout des écouteurs d'évènements
        this.doneDiv.addEventListener('click', this.checkItem.bind(this));
        this.doneDiv.addEventListener('touch', this.checkItem.bind(this));
        this.crossDiv.addEventListener('click', this.clearItem.bind(this));
        this.crossDiv.addEventListener('touch', this.clearItem.bind(this));
    }

    // Fonction changeant le statut et l'affichage selon le statut
    checkItem() {
        if (this.status == "false") {
            this.status = "true";
            this.tick.style.display = "block";
            this.doneElmt.className = "check checked";
            this.textElmt.className = "itemTextComplete";
            this.itemDiv.className = "completed";
        } else {
            this.status = "false";
            this.tick.style.display = "none";
            this.doneElmt.className = "check";
            this.textElmt.className = "itemText";
            this.itemDiv.className = "active";
        }
        // Mis à jour du statut dans le tableau
        for (const elmt of itemArray) {
            if (elmt[0] == this.itemDiv) {
                elmt[1] = this.status;
            }
        }
    }

    clearItem() {
        for (let i = 0; i < itemArray.length; i++) {
            if (itemArray[i][0] == this.itemDiv) {
                itemArray.splice(i, 1);
            }
        }
        this.itemDiv.remove();
        let countDisplay = document.getElementById('itemLeft');
        if (itemArray.length < 2) {
            countDisplay.innerHTML = itemArray.length + " item left";
        } else {
            countDisplay.innerHTML = itemArray.length + " items left";
        }
    }

}

/*=============================================================================*/
/*=========================== GESTION DRAG AND DROP ===========================*/
/*=============================================================================*/

$(function () {
    $("#itemList").sortable();
    $("#itemList").disableSelection();
});


/*=============================================================================*/
/*============================== AJOUTER UN ITEM ==============================*/
/*=============================================================================*/

function addItem(e) {
    if (e.key === 'Enter') {
        let text = input.value;
        new Item(text);
        input.value = null;
    }
}

/*=============================================================================*/
/*================ GESTION AFFICHAGE DES ITEMS SELON STATUT ===================*/
/*=============================================================================*/

function display(mode) {
    let items = document.getElementsByTagName('li');
    if (mode == 'all') {
        allButton.style.color = "hsl(220,98%,61%)";
        activeButton.style.color = "hsl(233,14%,35%)";
        completedButton.style.color = "hsl(233,14%,35%)";
        allButtonMobile.style.color = "hsl(220,98%,61%)";
        activeButtonMobile.style.color = "hsl(233,14%,35%)";
        completedButtonMobile.style.color = "hsl(233,14%,35%)";
        for (const elmt of items) {
            elmt.style.display = "flex";
        }
    }
    if (mode == 'act') {
        activeButton.style.color = "hsl(220,98%,61%)";
        allButton.style.color = "hsl(233,14%,35%)";
        completedButton.style.color = "hsl(233,14%,35%)";
        activeButtonMobile.style.color = "hsl(220,98%,61%)";
        allButtonMobile.style.color = "hsl(233,14%,35%)";
        completedButtonMobile.style.color = "hsl(233,14%,35%)";
        for (const elmt of items) {
            if (elmt.className.includes("active")) {
                elmt.style.display = "flex";
            } else {
                elmt.style.display = "none";
            }
        }
    }
    if (mode == 'com') {
        completedButton.style.color = "hsl(220,98%,61%)";
        allButton.style.color = "hsl(233,14%,35%)";
        activeButton.style.color = "hsl(233,14%,35%)";
        completedButtonMobile.style.color = "hsl(220,98%,61%)";
        allButtonMobile.style.color = "hsl(233,14%,35%)";
        activeButtonMobile.style.color = "hsl(233,14%,35%)";
        for (const elmt of items) {
            if (elmt.className.includes("completed")) {
                elmt.style.display = "flex";
            } else {
                elmt.style.display = "none";
            }
        }
    }
}


/*=============================================================================*/
/*==================== FONCTION EFFACER ITEM COMPLETED ========================*/
/*=============================================================================*/

function clear() {
    let items = document.getElementsByTagName('li');
    console.log(items)
    for (const elmt of items) {
        if (elmt.className.includes("completed")) {
            elmt.remove();
        }
    }
    itemArray = itemArray.filter(elmt => elmt[0].className.includes("active"));
}

/*=============================================================================*/
/*======================= FONCTION TRIER LE TABLEAU ===========================*/
/*=============================================================================*/

function sortArray() {
    itemArray.sort(function (a, b) {
        if (a[3] === b[3]) {
            return 0;
        } else {
            return (a[3] < b[3]) ? -1 : 1;
        }
    })
}

/*=============================================================================*/
/*================= FONCTION GESTION AFFICHAGE LIGHT / DARK ===================*/
/*=============================================================================*/

function changeDisplay() {
    let body = document.getElementById('body');
    let inputHeader = document.getElementById('inputHeader');
    let listFooter = document.getElementById('listFooter');
    let items = document.getElementsByTagName('li');
    let message = document.getElementById('message');
    let listFooterMobile = document.getElementById('listFooterMobile');
    if (displayModeSelected == "dark") {
        displayModeSelected = "light";
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        body.className = "light";
        inputHeader.className = "inputLight";
        listFooter.className = "listFooterLight";
        listFooterMobile.className = "listFooterMobileLight";
        message.className = "messageLight";
        for (const elmt of items) {
            elmt.id = "light"
        }

    } else {
        displayModeSelected = "dark";
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
        body.className = "dark";
        inputHeader.className = "inputDark";
        listFooter.className = "listFooterDark";
        listFooterMobile.className = "listFooterMobileDark";
        message.className = "messageDark";
        for (const elmt of items) {
            elmt.id = "dark"
        }

    }
}

/*=============================================================================*/
/*==================== GESTION SAUVEGARDE LOCAL STORAGE========================*/
/*=============================================================================*/

function updateStorage() {
    let items = document.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < itemArray.length; j++) {
            if (items[i] == itemArray[j][0]) {
                itemArray[j][3] = i;
            }
        }
    }
    sortArray();
    let item = 0;
    localStorage.clear();
    if (itemArray.length != 0) {
        for (const elmt of itemArray) {
            item++;
            localStorage.setItem(item, elmt[1] + "*" + elmt[2]);
        }
    }
}

function loadStorage() {
    for (let i = 1; i <= localStorage.length; i++) {
        let params = localStorage.getItem(i);
        params = params.split("*");
        if (params[0] == "true") {
            params[0] = "false";
        } else {
            params[0] = "true";
        }
        new Item(params[1], params[0]);
    }
}

setInterval(() => {
    updateStorage();
}, 3000);