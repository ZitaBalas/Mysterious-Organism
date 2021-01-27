import getListArray from './table.js';

const btnMostRelated = document.getElementById('btn-most-related');
const btnMostRelViable = document.getElementById('btn-most-rel-viable');

const getViableSpecimen = () => {
    let viableSpecimens = [];

    getListArray().filter(pAequor => {
        if (pAequor.willLikelySurvive() === true) {
            viableSpecimens.push(pAequor);
        }
    });
    return viableSpecimens;
};

const relRatesFactory = (percentage, pAequor1, pAequor2) => {
    return {
        _percentage: percentage,
        pAequor1,
        pAequor2,
        get percentage() {
            return this._percentage;
        },
        set percentage(percentage) {
            this._percentage = percentage;
        }
    }
};

const getRelatedDNA = arr => {
    const arrSpec = arr;
    let relRates = [];

    for (let i = 0; i < arrSpec.length; i++) {
        for (let j = 0; j < arrSpec.length; j++) {
            if (arrSpec[i] !== arrSpec[j]) {
                const percentage = arrSpec[i].compareDNA(arrSpec[j]);
                const pAequor1 = arrSpec[i];
                const pAequor2 = arrSpec[j];
                const relRateOf2 = relRatesFactory(percentage, pAequor1, pAequor2);
                relRates.push(relRateOf2);
            }
        }
    }
    return relRates;
};

const findMostRelDNA = (func, arr) => {
    const allRelRates = func(arr);
    let percentageArr = [];

    allRelRates.filter(obj => {
        percentageArr.push(obj.percentage);
    })

    percentageArr = percentageArr.map(num => Number(num));
    const maxPerc = percentageArr.reduce((a, b) => {
        return Math.max(a, b);
    });

    const indOfMaxPerc = percentageArr.indexOf(maxPerc);
    const mostRelDNA = allRelRates[indOfMaxPerc];
    return mostRelDNA;
};

const renderMostRel = (obj, field) => {
    const tbody = document.getElementById(field);
    const temp = document.getElementById('temp-most-related');
    const clon = temp.content.cloneNode(true);
    tbody.appendChild(clon);

    for (let i = 0; i < 2; i++) {
        const cell = tbody.rows[i].cells;
        cell[0].innerHTML = obj[`pAequor${i + 1}`].specimenNum;
        cell[1].innerHTML = obj[`pAequor${i + 1}`].dna.join(' ');
    }
    tbody.rows[0].cells[2].innerHTML = obj.percentage + '%';
    tbody.parentElement.style.display = 'table';
};

const resetMostRel = () => {
    const tbody = document.getElementsByClassName('table-related');

    for (let i = 0; i < tbody.length; i++) {
        tbody[i].parentElement.style.display = 'none';
        tbody[i].innerHTML = '';
    }

    btnMostRelated.disabled = false;
    btnMostRelViable.disabled = false;
};

btnMostRelated.addEventListener('click', () => {
    const result = findMostRelDNA(getRelatedDNA, getListArray());
    renderMostRel(result, 'list-most-related');
    btnMostRelated.disabled = true;
});

btnMostRelViable.addEventListener('click', () => {
    const viableArray = getViableSpecimen();
    const result = findMostRelDNA(getRelatedDNA, viableArray);
    renderMostRel(result, 'list-most-rel-viable');
    btnMostRelViable.disabled = true;
});

export default resetMostRel;