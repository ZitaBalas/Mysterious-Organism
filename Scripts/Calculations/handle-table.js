import PaequorFactory from './factory.js';
import getListArray from './table.js';

const tbody = document.getElementsByClassName('tabcontent-body');
const allRows = document.getElementsByTagName('tr');
const selectedRows = document.getElementsByClassName('selected');
const btnDeselectAll = document.getElementById('btn-deselect-all');
let selectedArray = [];

class Selected extends PaequorFactory {
    constructor(specimenNum, dna) {
      super(specimenNum, dna);
      this.hasMutated = false;
      this.hasViability = false;
      this.hasComplement = false;
    }
  };

const showInTable = pAequor => {
    for (let i = 0; i < tbody.length; i++) {
        const temp = document.getElementById('temp-selected');
        const clon = temp.content.cloneNode(true);
        tbody[i].appendChild(clon);

        const row = tbody[i].rows[selectedArray.length];

        row.cells[0].innerHTML = '#' + pAequor.specimenNum;
        row.cells[1].innerHTML = pAequor.dna.join(' ');
    }
    const selected = new Selected(pAequor.specimenNum, pAequor.dna);
    selectedArray.push(selected);
};

const deleteFromTable = pAequor => {
    let index;
    selectedArray.filter(elem => {
        if (elem.specimenNum === pAequor.specimenNum) {
            index = selectedArray.indexOf(elem);
        }
    });

    for (let i = 0; i < tbody.length; i++) {
        tbody[i].deleteRow(index);
    }
    selectedArray.splice(index, 1);
};

const selectRow = rowId => {
    const row = document.getElementById(rowId);
    const input = row.cells[2].firstElementChild;
    const index = row.sectionRowIndex;
    const pAequor = getListArray()[index];

    if (selectedRows.length >= 10 && !row.className) {
        alert('Maximum 10 rows can be selected!');
        input.checked = false;
    }

    if (selectedRows.length < 10 && !row.className) {
        input.checked = true;
        row.classList.add('selected');
        showInTable(pAequor);
    } else if (row.className) {
        input.checked = false;
        row.classList.remove('selected');
        deleteFromTable(pAequor);
    }
};

export const resetTable = () => {
    selectedArray = [];
    for (let i = 0; i < tbody.length; i++) {
        tbody[i].innerHTML = '';
    }
};

const deselectAll = () => {
    resetTable();

    Array.prototype.filter.call(allRows, function (row) {
        if (row.className) {
            const input = row.cells[2].firstElementChild;
            input.checked = false;
            row.classList.remove('selected');
        }
    });
};

btnDeselectAll.addEventListener('click', deselectAll);

window.selectRow = selectRow;

const getSelectedArray = () => selectedArray;
export default getSelectedArray;