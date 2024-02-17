
async function getAccessToken() {
    const apiUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const clientId = '3JzRClcoXfTsnW3xLF63YmHfpzAA3cii';
    const clientSecret = 'QnOG38WHK80RczeL';

    const requestBody = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Access Token Response:', data);
        return data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        throw error;
    }
}

async function makeApiRequest() {
    try {
        // get access token
        const accessToken = await getAccessToken();
        const originLocationCode = document.querySelector('#originLocation').value;
        const destinationLocationCode = document.querySelector('#destinationLocation').value;
        const departureDate = document.querySelector('#departureDate').value;
        const cabinClass = document.querySelector('#cabin').value;

        // Validate user input (add your own validation logic as needed)
        if (!originLocationCode || !destinationLocationCode) {
            console.error('Please fill in all required fields.');
            return;
        }

        // Construct the JSON data for the API call
        const requestData = {
            currencyCode: 'USD',
            originDestinations: [
                {
                    id: '1',
                    originLocationCode: originLocationCode,
                    destinationLocationCode: destinationLocationCode,
                    departureDateTimeRange: {
                        date: departureDate,
                        time: '10:00:00',
                    },
                },
                // {
                //     id: '2',
                //     originLocationCode: 'BKK',
                //     destinationLocationCode: 'SYD',
                //     departureDateTimeRange: {
                //         date: '2024-04-22',
                //         time: '17:00:00',
                //     },
                // },
            ],
            travelers: [
                {
                    id: '1',
                    travelerType: 'ADULT',
                    fareOptions: ['STANDARD'],
                },
                // {
                //     id: '2',
                //     travelerType: 'CHILD',
                //     fareOptions: ['STANDARD'],
                // },
            ],
            sources: ['GDS'],
            searchCriteria: {
                maxFlightOffers: 50,
                flightFilters: {
                    cabinRestrictions: [
                        {
                            cabin: cabinClass,
                            coverage: 'ALL_SEGMENTS',
                            originDestinationIds: ['1'],
                        },
                    ],
                    carrierRestrictions: {
                        // excludedCarrierCodes: ['AA', 'TP', 'AZ'],
                        includedCarrierCodes: ['AA', 'DL', 'UA', 'BA', 'LH', 'AF', 'SQ', 'EK', 'QF', 'CX', 'LX', 'AS', 'TN', 'TP', 'AZ'],
                    },
                },
            },
        };



        // Define the API endpoint
        const apiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Format the flight offer data
        // const formattedData = formatFlightOffer(responseData.data[0]);

        // Display the parsed information on the webpage
        // displayParsedData(formattedData);
        // when not commented out JSON displays on webpage
        ///////////////////////////////////////////////
        displayApiResponse(responseData);
    } catch (error) {
        console.error('Error making API request:', error);
    }
}
document.querySelector('#searchFlightsBtn').addEventListener('click', makeApiRequest);

// function displayApiResponse(responseData) {
//     const resultsContainer = document.querySelector('.resultsList');

// Clear previous results
// resultsContainer.innerHTML = '';

// Create a pre element for displaying JSON
// const preElement = document.createElement('pre');
// preElement.textContent = JSON.stringify(responseData, null, 2); // 2 spaces for indentation

// Append the JSON string to the results container
//     resultsContainer.appendChild(preElement);
// }

// Using the getNestedKeys method to get a value for a key
// const departureIataCode = data[0].itineraries[0].segments[0].departure.iataCode;
// const arrivalIataCode = data[0].itineraries[0].segments[0].arrival.iataCode;
// const departureDateAndTime = data[0].itineraries[0].segments[0].departure.at;
// const arrivalDateAndTime = data[0].itineraries[0].segments[0].arrival.at;
// const departureIataCode2 = data[0].itineraries[0].segments[1].departure.iataCode;
// const arrivalIataCode2 = data[0].itineraries[0].segments[1].arrival.iataCode;
// console.log("Departure IATA Code: ", departureIataCode);
// console.log("Arrival IATA Code: ", arrivalIataCode);
// console.log("Departure IATA Code: ", departureIataCode2);
// console.log("Arrival IATA Code: ", arrivalIataCode2);
// console.log("Departure Date and Time: ", departureDateAndTime);
// console.log("Arrival Date and Time: ", arrivalDateAndTime);

// const departureDateTimeString = departureDateAndTime;
// const arrivalDateTimeString = arrivalDateAndTime;

// const [date, time] = departureDateTimeString.split('T');
// console.log('Date', date);
// console.log('Time', time);
// const time24hr = time;

// const time12hr = convertTo12hrFormat(time);
// function convertTo12hrFormat(time) {
//     const [hours, minutes] = time.split(':');
//     let period = 'AM';
//     let hours12hr = parseInt(hours, 10);
//     if (hours12hr >= 12) {
//         period = 'PM';
//         if (hours12hr > 12) {
//             hours12hr -= 12;
//         }
//     }

//     console.log(`${hours12hr}:${minutes} ${period}`);
// }

// responseData.data.forEach((flight) => {
//     // Iterate through each leg (itinerary) of the flight
//     flight.itineraries.forEach((itinerary, legIndex) => {
//         console.log(`Leg ${legIndex + 1}:`);

//         // Iterate through each segment of the leg
//         itinerary.segments.forEach((segment, segmentIndex) => {
//             console.log(`  Segment ${segmentIndex + 1}:`);
//             console.log(`    Departure IATA Code: ${segment.departure.iataCode}`);
//             console.log(`    Arrival IATA Code: ${segment.arrival.iataCode}`);
//             console.log(`    Departure Date and Time: ${segment.departure.at}`);
//             console.log(`    Arrival Date and Time: ${segment.arrival.at}`);
//             // ... other segment properties
//         });
//     });
// });

function displayApiResponse(responseData) {
    const resultsContainer = document.querySelector('.resultsList');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Iterate through each flight data object in the response
    responseData.data.forEach((flight) => {
        // Iterate through each leg (itinerary) of the flight
        flight.itineraries.forEach((itinerary, legIndex) => {
            const listItem = document.createElement('li');

            // Check if 'price' property exists in the 'itinerary' object
            const totalPrice = itinerary.price && itinerary.price.grandTotal ? `$${itinerary.price.grandTotal}` : 'N/A';

            listItem.innerHTML = `
                <strong>Leg ${legIndex + 1}</strong><br>
                Departure: ${itinerary.segments[0].departure.iataCode}<br>
                Arrival: ${itinerary.segments[0].arrival.iataCode}<br>
                Departure Date and Time: ${itinerary.segments[0].departure.at}<br>
                Arrival Date and Time: ${itinerary.segments[0].arrival.at}<br><br><br>
                <strong>Leg ${legIndex + 2}</strong><br>
                Departure: ${itinerary.segments[1].departure.iataCode}<br>
                Arrival: ${itinerary.segments[1].arrival.iataCode}<br>
                Departure Date and Time: ${itinerary.segments[1].departure.at}<br>
                Arrival Date and Time: ${itinerary.segments[1].arrival.at}<br>
                
                ------------------------------
            `;
            resultsContainer.appendChild(listItem);
        });

    });
}

// ... (rest of the code)

// function displayApiResponse(responseData) {
//     const resultsContainer = document.querySelector('.resultsList');

//     // Clear previous results
//     resultsContainer.innerHTML = '';

//     // Iterate through each flight data object in the response
//     responseData.data.forEach((flight) => {
//         // Iterate through each leg (itinerary) of the flight
//         flight.itineraries.forEach((itinerary, legIndex) => {
//             const listItem = document.createElement('li');

//             listItem.innerHTML = `
//                 <strong>Leg ${legIndex + 1}</strong><br>
//                 Departure: ${itinerary.segments[0].departure.iataCode}<br>
//                 Arrival: ${itinerary.segments[0].arrival.iataCode}<br>
//                 Departure Date and Time: ${itinerary.segments[0].departure.at}<br>
//                 Arrival Date and Time: ${itinerary.segments[0].arrival.at}<br><br><br>
//                 <strong>Leg ${legIndex + 2}</strong><br>
//                 Departure: ${itinerary.segments[1].departure.iataCode}<br>
//                 Arrival: ${itinerary.segments[1].arrival.iataCode}<br>
//                 Departure Date and Time: ${itinerary.segments[1].departure.at}<br>
//                 Arrival Date and Time: ${itinerary.segments[1].arrival.at}<br>
//                 Total: $${price.grandTotal}
//                 ------------------------------
//             `;
//             resultsContainer.appendChild(listItem);
//         });
//     });
// }

