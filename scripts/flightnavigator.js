// Replace YOUR_API_KEY with your actual Amadeus API key
const apiKey = '3JzRClcoXfTsnW3xLF63YmHfpzAA3cii';
const apiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

// Construct the API request URL with necessary parameters
const originLocationCode = '';
const destinationLocationCode = '';
const departureDate = '2024-12-01';

const requestUrl = `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}`;

// Make the API request using the Fetch API
fetch(requestUrl, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Process the JSON data as an array
        const flightOffers = data.data;

        // Now you can work with the flightOffers array
        console.log(flightOffers);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function searchFlights() {
    const originLocationCode = document.getElementById('originLocation').value;
    const destinationLocationCode = document.getElementById('destinationLocation').value;