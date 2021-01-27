import getSelectedArray from './handle-table.js';

const btnMutated = document.getElementById('btn-mutated');
const btnViability = document.getElementById('btn-viability');
const btnComplement = document.getElementById('btn-complement');

const renderResult = (field, elem) => { 
  const index = getSelectedArray().indexOf(elem);
  const row = document.getElementById(field).rows[index];

  const cell2 = row.insertCell(2);
  const output = document.createElement('output');
  return cell2.appendChild(output);
};

btnMutated.addEventListener('click', () => {
  getSelectedArray().filter(pAequor => {
    if (!pAequor.hasMutated) {
      const output = renderResult('list-mutated', pAequor);
      const colorMutated = document.createElement('span');
      colorMutated.style.color = 'red';

      const result = pAequor.mutate();
      const dna = result.mutatedDNA;
      const index = result.randomIndex;

      output.innerHTML = dna.slice(0, index).join(' ');
      output.appendChild(colorMutated);
      colorMutated.innerHTML = ' ' + dna[index] + ' ';
      output.innerHTML += dna.slice(index + 1, dna.length).join(' ');
      
      pAequor.hasMutated = true;
    }
  });
});

btnViability.addEventListener('click', () => {
  getSelectedArray().filter(pAequor => {
    if (!pAequor.hasViability) {
      const output = renderResult('list-viability', pAequor);
      pAequor.willLikelySurvive() ? output.innerHTML = 'Yes' : output.innerHTML = 'No';
      pAequor.hasViability = true;
    }
  });
});

btnComplement.addEventListener('click', () => {
  getSelectedArray().filter(pAequor => {
    if (!pAequor.hasComplement) {
      const output = renderResult('list-complement', pAequor);
      output.innerHTML = pAequor.complementStrand().join(' ');
      pAequor.hasComplement = true;
    }
  });
});