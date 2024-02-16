
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

// Function to make the API request
async function makeApiRequest() {
    try {
        // get access token
        const accessToken = await getAccessToken();


        // Define the API endpoint
        const apiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers?access_token=' + accessToken;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);
    } catch (error) {
        console.error('Error making API request:', error);
    }
}

// Call the function when you want to make the API request
makeApiRequest();

// Function to display API response on the webpage
function displayApiResponse(responseData) {
    const resultsContainer = document.querySelector('.results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Create a pre element to display formatted JSON
    const jsonPre = document.createElement('pre');
    jsonPre.textContent = JSON.stringify(responseData, null, 2);

    // Append the pre element to the results container
    resultsContainer.appendChild(jsonPre);
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

        displayApiResponse(responseData);
    } catch (error) {
        console.error('Error making API request:', error);
    }
}

