// loops.js
myInfo = {
  name: "Brother T",
  photo: "images/photo.jpg",
  favoriteFoods: ["Fettucini", "Steak", "Chicken", "Shrimp", "Baked Potato"],
  hobbies: ["Reading", "Fishing", "Camping"],
  placesLived: [
    {
      place: "Rexburg, ID",
      length: "5 years",
    },
    {
      place: "Ammon, ID",
      length: "3 years",
    },
    {
      place: "Sandy, UT",
      length: "1 year",
    },
  ],
};

// with .forEach
const favoriteFoodsList = document.querySelector('#favorite-foods');
myInfo.favoriteFoods.forEach(food => {
  const listItem = document.createElement('li');
  listItem.textContent = food;
  favoriteFoodsList.appendChild(listItem);
});

// with .map
document.querySelector('#favorite-foods').innerHTML = myInfo.favoriteFoods.map((food) => `<li>${food}</li>`).join('');


const foodsElement = document.querySelector('#favorite-foods');
const placesElement = document.querySelector('#places-lived');

function createList(list, callbackTemplate) {
  const htmlList = list.map(callbackTemplate);
  return htmlList.join("");
}

function foodsTemplate(food) {
  return `<li>${food}</li>`;
}


function placesTemplate(place) {
  return `<dt>${place.place}</dt><dd>${place.length}</dd>`;
}

foodsElement.innerHTML = createList(myInfo.favoriteFoods, foodsTemplate);
placesElement.innerHTML = createList(myInfo.placesLived, placesTemplate);
