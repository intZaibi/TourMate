const fetch = require('node-fetch');

// --- Configuration ---
const OPENVERSE_API_BASE_URL = 'https://api.openverse.engineering/v1'; // Or the current base URL from their docs
const APPLICATION_NAME = 'Your Website Name'; // Replace with your application's name
const APPLICATION_DESCRIPTION = 'Description of how my website uses Openverse images'; // Replace with your application's description
const CONTACT_EMAIL = 'your_email@example.com'; // Replace with your contact email

// --- Function to Register and Get Access Token ---
async function getOpenverseAccessToken() {
  try {
    // 1. Register your application (if you haven't already)
    const registrationEndpoint = `https://api.openverse.org/v1/auth_tokens/register/`;
    const registrationBody = {
      "name": "Tour Mate",
      "description": "a tour guide to suggest tour trip plans",
      "email": "shahzaibalisomroo@gmail.com"
    };

    const registrationResponse = await fetch(registrationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationBody),
    });

    if (!registrationResponse.ok) {
      const errorData = await registrationResponse.json();
      console.error('Error registering application:', errorData);
      return null;
    }

    const registrationData = await registrationResponse.json();
    const clientId = registrationData.client_id;
    const clientSecret = registrationData.client_secret;

    console.log('Application registered successfully.');
    console.log('Client ID:', clientId);
    console.log('Client Secret:', clientSecret);

    // 2. Get the access token using the client credentials
    const tokenEndpoint = `https://api.openverse.org/v1/auth_tokens/token/`;
    const tokenBody = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    };

    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenBody),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Error getting access token:', errorData);
      return null;
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in;

    console.log('Access token obtained successfully.');
    console.log('Access Token:', accessToken);
    console.log('Expires In (seconds):', expiresIn);

    return accessToken;

  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}

// --- Example Usage ---
async function main() {
  const accessToken = await getOpenverseAccessToken();
  if (accessToken)
    searchOpenverse('sobat');
}

main();



async function searchOpenverse(query) {
  const apiKey = 'blUHgsHVXW6UblGAySMCeWOjKMHHUI'; // Replace with your actual key
  const apiUrl = `https://api.openverse.engineering/v1/images/?q=${encodeURIComponent(query)}&license=cc0,by`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': apiKey ? apiKey : '' // Include API key if you have one
      }
    });
    const data = await response.json();
    console.log(data.results); // Array of image objects
  } catch (error) {
    console.error("Error fetching images from Openverse:", error);
  }
}

// searchOpenverse('sobat')