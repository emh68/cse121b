
// Gets an access token
async function getAccessToken() {
    const apiUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const clientId = '3JzRClcoXfTsnW3xLF63YmHfpzAA3cii';
    const clientSecret = 'QnOG38WHK80RczeL';

    const requestBody = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    // If there is an error getting access token displays details
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
        // Uses access token to authenticate for the api call
        const accessToken = await getAccessToken();
        const originLocationCode = document.querySelector('#originLocation').value;
        const destinationLocationCode = document.querySelector('#destinationLocation').value;
        const departureDate = document.querySelector('#departureDate').value;
        const cabinClass = document.querySelector('#cabin').value;

        // Validate user input
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



        // API endpoint
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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);

        displayApiResponse(responseData);
    } catch (error) {
        console.error('Error making API request:', error);
    }
}
// Event listener for search button
document.querySelector('#searchFlightsBtn').addEventListener('click', makeApiRequest);


function displayApiResponse(responseData) {
    const resultsContainer = document.querySelector('.resultsList');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Iterate through each flight data object in the response
    responseData.data.forEach((flight, offerIndex) => {

        // Iterate through each leg (itinerary) of the flight
        flight.itineraries.forEach((itinerary, legIndex) => {
            const listItem = document.createElement('li');

            listItem.innerHTML = `
                <strong>Flight Offer ${offerIndex + 1}</strong><br>
            `;

            // Iterate through each segment of the leg
            itinerary.segments.forEach((segment, segmentIndex) => {

                // Format departure and arrival date and time for each segment
                const departureDateTime = new Date(segment.departure.at);
                const arrivalDateTime = new Date(segment.arrival.at);

                const formattedDeparture = `${departureDateTime.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })} ${departureDateTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                })}`;

                const formattedArrival = `${arrivalDateTime.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })} ${arrivalDateTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                })}`;

                listItem.innerHTML += `
                    Segment ${segmentIndex + 1}<br>
                    Departure: ${segment.departure.iataCode}<br>
                    Arrival: ${segment.arrival.iataCode}<br>
                    Departure Date and Time: ${formattedDeparture}<br>
                    Arrival Date and Time: ${formattedArrival}<br><br>
                `;
            });

            listItem.innerHTML += `
                Grand Total: $${flight.price.grandTotal}<br>
                ------------------------------<br>
            `;

            resultsContainer.appendChild(listItem);
        });
    });
}
