import { returnRandBase } from './table.js';

class PaequorFactory {
  constructor(specimenNum, dna) {
    this._specimenNum = specimenNum;
    this._dna = dna;
  }
  get specimenNum() {
    return this._specimenNum;
  }
  set specimenNum(specimenNum) {
    this._specimenNum = specimenNum;
  }
  get dna() {
    return this._dna;
  }
  set dna(dna) {
    this._dna = dna;
  }

  mutate() {
    let mutatedBase = '';
    let mutatedDNA = [];
    const randomIndex = Math.floor(Math.random() * 15)
    const origBase = this.dna[randomIndex];

    this.dna.forEach(base => mutatedDNA.push(base));

    do {
      mutatedBase = returnRandBase();
    } while (origBase === mutatedBase)

    mutatedDNA[randomIndex] = mutatedBase;
    return {
      mutatedDNA,
      randomIndex,
    };
  }

  compareDNA(obj) {
    let percentage = 0;

    for (let i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === obj.dna[i]) {
        percentage += 100 / this.dna.length;
      }
    }
    percentage = percentage.toFixed(2);
    return percentage;
  }

  willLikelySurvive() {
    let survivalRate = 0;

    this.dna.forEach(base => {
      if (base === 'C' || base === 'G') {
        survivalRate += 100 / this.dna.length;
      }
    });

    if (survivalRate >= 60) {
      return true;
    } else {
      return false;
    }
  }

  complementStrand() {
    const complementDNA = this.dna.map(base => {
      switch (base) {
        case 'A':
          return base = 'T';
          break;
        case 'T':
          return base = 'A';
          break;
        case 'C':
          return base = 'G';
          break;
        case 'G':
          return base = 'C';
          break;
        default:
          alert('Unable to create a complement.');
      };
    });
    return complementDNA;
  }
};

export default PaequorFactory;