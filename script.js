let options = ["Meeting starts 5 minutes late", "Think outside the box", "Competitive makret", "Excellent question!", "Client focus", "Natural growth", "FREE SPACE", "Innovation", "Next level", "Empover", "Market leader", "Somebody forgots to unmute their microphone", "Can you hear me?", "Random background noise can be heard", "Game changer", "Added value", "Strong performance", "Leverage", "We can't hear you", "Cutting edge", "Restructuring", "Circular economy", "Go to market", "Core competency", "Digital transformation"];
const ROW_COUNT = 5;
const COLUMN_COUNT = 5;
const SELECTED_CLASS = "selected";
const WIN_DIALOG_EL = document.getElementById("winDialog");
const CONTAINER_EL = document.getElementById("optionTable");
const CELL_PREFIX = "cell";

function closeDialog() {
    WIN_DIALOG_EL.close();
}

// The Fisher-Yates shuffling algorithm
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isRowFull(rowId) {
    for (let i = 0; i < COLUMN_COUNT; i++) {
        let tdElement = document.getElementById(`${CELL_PREFIX}${rowId}${i}`);
        if (!tdElement.classList.contains(SELECTED_CLASS)) {
            return false;
        }
    }
    return true;
}

function isColumnFull(columnId) {
    for (let i = 0; i < ROW_COUNT; i++) {
        let tdElement = document.getElementById(`${CELL_PREFIX}${i}${columnId}`);
        if (!tdElement.classList.contains(SELECTED_CLASS)) {
            return false;
        }
    }
    return true;
}

function onCellClick(cellElement) {
    if (cellElement.classList.contains(SELECTED_CLASS)) {
        cellElement.classList.remove(SELECTED_CLASS);
    } else {
        cellElement.classList.add(SELECTED_CLASS);
        let win = isRowFull(cellElement.dataset.row);
        if (win === true) {
            WIN_DIALOG_EL.showModal();
            return;
        }
        win = isColumnFull(cellElement.dataset.column);
        if (win === true) {
            WIN_DIALOG_EL.showModal();
        }
    }
}
function main (options) {
    shuffleArray(options);
    let innerHtml = "";
    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < COLUMN_COUNT; j++) {
            innerHtml += `<div onClick="onCellClick(this)" id="${CELL_PREFIX}${i}${j}" data-row="${i}" data-column="${j}"><span>${options[i * COLUMN_COUNT + j]}</span></div>`
        }
    }
    CONTAINER_EL.innerHTML = innerHtml;
}
main(options);