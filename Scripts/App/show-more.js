const showMore = (e) => {
    if (e.currentTarget.open) {
        e.currentTarget.parentElement.style.borderBottomLeftRadius = '16px';
        e.currentTarget.firstElementChild.innerHTML = 'Show less';
    } else {
        e.currentTarget.parentElement.style.borderBottomLeftRadius = '0';
        e.currentTarget.firstElementChild.innerHTML = 'Show more';
    }
};

const showLess = () => {
    const details = document.getElementsByTagName('details');
    const summary = document.getElementsByTagName('summary');

    for (let i = 0; i < details.length; i++) {
        details[i].removeAttribute('open');
        details[i].parentElement.style.borderBottomLeftRadius = '0';
        summary[i].innerHTML = 'Show more';
    }
};

window.showMore = showMore;
export default showLess;