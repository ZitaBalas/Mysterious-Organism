import showLess from './show-more.js';

let sublinks = document.getElementsByClassName('sublinks');

const resetSublinks = () => {
  for (let i = 0; i < sublinks.length; i++) {
    sublinks[i].style.display = 'none';
    sublinks[i].classList.remove('active');
  }
};

const resetTabcontent = () => {
  let tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  showLess();
};

const resetTabLinks = () => {
  let tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }
};

const resetTabList = () => {
  const tabList = document.getElementById('tab-list');
  const table = document.getElementById('list-container');
  const width = window.matchMedia("(max-width: 1570px)");

  if (width.matches) {
    tabList.classList.remove('active');
    table.style.display = 'none';
  }
};

const resetTab = () => {
  resetSublinks();
  resetTabcontent();
  resetTabLinks();
  resetTabList();
};

const openTab = (e, tabName) => {
  resetTab();

  document.getElementById(tabName).style.display = 'block';
  e.currentTarget.classList.add('active');
};

const openTabCompare = e => {
  resetTab();

  for (let i = 0; i < sublinks.length; i++) {
    sublinks[i].style.display = 'block';
  }
  e.currentTarget.classList.add('active');
};

const openSubTab = (e, tabName) => {
  resetTabcontent();
  resetSublinks();

  for (let i = 0; i < sublinks.length; i++) {
    sublinks[i].style.display = 'block';
    sublinks[i].classList.remove('active');
  }

  document.getElementById(tabName).style.display = 'block';
  e.currentTarget.classList.add('active');
};

window.onresize = function () {
  const tabList = document.getElementById('tab-list');
  const table = document.getElementById('list-container');
  const width = window.matchMedia("(max-width: 1570px)");

  if (width.matches) {
    if (!tabList.classList.contains('active')) {
      table.style.display = 'none';
    }
  } else {
    table.style.display = 'block';
  }
};

window.openTab = openTab;
window.openTabCompare = openTabCompare;
window.openSubTab = openSubTab;
export default resetTab;