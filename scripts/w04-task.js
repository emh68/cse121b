/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Eli Hansen",
    photo: "images/profilepicoriginal.jpg",
    favoriteFoods: ['Fettucine Alfredo', 'Pizza', 'Fajitas', 'Ice Cream', 'Caramel Pie'],
    hobbies: ['Travel', 'Tennis', 'Baseball', 'Water Sports', 'Hiking', 'Guitar', 'Singing', 'Music', 'Electronics'],
    placesLived: []

};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
        place: 'Kuna, ID',
        length: '1 year',
    },
    {
        place: 'West Lafayette, IN',
        length: '6 years',
    },
    {
        place: 'Rexburg, ID',
        length: '15 years',
    },
    {
        place: 'Denver, CO',
        length: '1 year',
    },
    {
        place: 'Colorado, Springs, CO',
        length: '1 year',
    },
    {
        place: 'Bastogne, BE',
        length: '4 months',
    },
    {
        place: 'Gennevilliers-Asnieres, FR',
        length: '8 months',
    },
    {
        place: 'Provo, UT',
        length: '7 years',
    },
    {
        place: 'Ketchikan, AK',
        length: '4 months',
    },
    {
        place: 'Draper, UT',
        length: '3 years',
    },
    {
        place: 'Bluffdale, UT',
        length: '5 years',
    },
    {
        place: 'Lehi, UT',
        length: '1 year',
    }
);


/* DOM Manipulation - Output */

/* Name */
document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */
document.querySelector('#photo').src = myProfile.photo;
document.querySelector('#photo').alt = myProfile.name;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});

/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    let li = document.createElement('li');
    li.textContent = hobby;
    document.querySelector('#hobbies').appendChild(li);
});

/* Places Lived DataList */
const placesElement = document.querySelector('#places-lived');

function createList(list, callbackTemplate) {
    const htmlList = list.map(callbackTemplate);
    return htmlList.join("");
}

function placesTemplate(place) {
    return `<dt>${place.place}</dt><dd>${place.length}</dd>`;
}

placesElement.innerHTML = createList(myProfile.placesLived, placesTemplate);
