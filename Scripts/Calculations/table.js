import resetTab from '../App/tab.js';
import PaequorFactory from './factory.js';
import { resetTable } from './handle-table.js';
import { createOptions } from './compare.js';
import { resetOptions } from './compare.js';
import resetMostRel from './most-related.js';

const tabList = document.getElementById('tab-list');
const table = document.getElementById('list-container');
const list = document.getElementById('list');
const generator = document.getElementById('generator');
const main = document.getElementById('main');
const btnNewList = document.getElementById('btn-new-list');
const btnClose = document.getElementById('close');

let listArray = [];
let numArr = [0, 1000];

const getRandNum = () => {
  numArr.shift();
  numArr.push(numArr[0] + 1);
  return numArr[0];
};

export const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)]
};

const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

const getList = () => {
  while (listArray.length < 100) {
    const pAequor = new PaequorFactory(getRandNum(), mockUpStrand());
    listArray.push(pAequor);
  }

  listArray.map(elem => {
    const temp = document.getElementById('temp-list');
    const clon = temp.content.cloneNode(true);
    list.appendChild(clon);
    
    const index = listArray.indexOf(elem);
    const row = list.rows[index];

    row.cells[0].innerHTML = '#' + elem.specimenNum;
    row.cells[1].innerHTML = elem.dna.join(' ');

    row.setAttribute('id', elem.specimenNum);
    row.setAttribute('onclick', `selectRow(${row.id})`);
  });
};

const linkTabList = () => {
  if (tabList) {
    tabList.classList.add('active');
    table.style.display = 'block';
  }
};

generator.addEventListener('click', () => {
  generator.style.visibility = 'hidden';
  main.style.display = 'block';
  getList();
  linkTabList();
  createOptions();
  location.hash = "main";
});

const resetAll = () => {
  numArr = [0, 1000];
  listArray = [];
  list.innerHTML = '';
  resetMostRel();
  resetTable();
  resetTab();
  resetOptions();
};

const getNewList = () => {
  if (confirm('Are you sure you want a new list? All data from the current list will be deleted!')) {
    resetAll();
    table.scrollTop;
    getList();
    linkTabList();
    createOptions();
  }
};

btnNewList.addEventListener('click', getNewList);
btnClose.addEventListener('click', () => {
  if (confirm('Do you want to exit?')) {
    main.style.display = 'none';
    location.hash = "#";
    generator.style.visibility = 'visible';
    resetAll();
  }
});

const getListArray = () => listArray;
export default getListArray;