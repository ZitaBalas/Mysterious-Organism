import getListArray from './table.js';

const dropdown1 = document.getElementById('dropdown-1');
const dropdown2 = document.getElementById('dropdown-2');
const dnaCell1 = document.getElementById('specimen-1').cells[2];
const dnaCell2 = document.getElementById('specimen-2').cells[2];
const result = document.getElementById('result-compare');
const btnCompareTwo = document.getElementById('btn-compare-two');
const btnResetCompareTwo = document.getElementById('btn-reset-compare-two');

export const createOptions = () => {
  for (let i = 0; i < 2; i++) {
    const temp = document.getElementById('temp-default-option');
    const clon = temp.content.cloneNode(true);

    i === 0 ? dropdown1.appendChild(clon) : dropdown2.appendChild(clon);
  }

  getListArray().map(elem => {
    for (let i = 0; i < 2; i++) {
      let option = document.createElement('option');
      option.innerHTML = '#' + elem.specimenNum;
      option.setAttribute('value', elem.dna);

      i === 0 ? dropdown1.appendChild(option) : dropdown2.appendChild(option);
    }
  });
};

const resetContentCompare = () => {
  dnaCell1.innerHTML = '';
  dnaCell2.innerHTML = '';
  result.innerHTML = '';

  dropdown1.disabled = false;
  dropdown2.disabled = false;
  btnCompareTwo.disabled = false;
  btnResetCompareTwo.disabled = true;
};

export const resetOptions = () => {
  resetContentCompare();
  dropdown1.innerHTML = '';
  dropdown2.innerHTML = '';
};

const getCompared = () => {
  let pAequor1, pAequor2;
  const dna1 = dropdown1.value;
  const dna2 = dropdown2.value;

  if (dna1 === dna2 && dna1 && dna2) {
    alert('Cannot choose the same element to compare with!');
  } else if (!dna1 || !dna2) {
    alert('Please choose two specimens from the drop down lists!');
  } else {
    getListArray().filter(elem => {
      if (dna1 == elem.dna) {
        pAequor1 = elem;
      }
      if (dna2 == elem.dna) {
        pAequor2 = elem;
      }
    });

    dnaCell1.innerHTML = pAequor1.dna.join(' ');
    dnaCell2.innerHTML = pAequor2.dna.join(' ');
    const percentage = pAequor1.compareDNA(pAequor2);
    result.innerHTML = percentage + '%';

    dropdown1.disabled = true;
    dropdown2.disabled = true;
    btnCompareTwo.disabled = true;
    btnResetCompareTwo.disabled = false;
  }
};

btnCompareTwo.addEventListener('click', getCompared);

btnResetCompareTwo.addEventListener('click', () => {
  resetContentCompare();
  dropdown1.value = '';
  dropdown2.value = '';
});