/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector('#temples');
let templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
    temples.forEach((temple) => {
        let article = document.createElement('article');
        let h3 = document.createElement('h3')
        h3.textContent = temple.templeName;
        let img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = 'location';
        article.appendChild(h3);
        article.appendChild(img);
        templesElement.appendChild(article);

    });
}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    if (response.ok) {
        templeList = await response.json();
    }
    displayTemples(templeList);
}

/* reset Function */
const reset = () => {
    templesElement.innerHTML = '';
    getTemples();
}

/* filterTemples Function */
const filterTemples = (temples) => {
    reset();
    let filter = document.querySelector('#filtered');
    switch (filter) {
        case 'utah':
            temples.filter(temple => temple.location.toLowerCase().includes('utah'));
            break;

        case 'notutah':
            temples.filter(temple => !temple.location.toLowerCase().includes('utah'));
            break;

        case 'older':
            temples.filter(temple => temple.dedicated < new Date(1950, 0, 1));
            break;

        default:
            temples;
    }
}

getTemples();

/* Event Listener */
document.querySelector('#filtered').addEventListener('change', () => { filterTemples(templeList) });