// const fetch = require('node-fetch');
import fetch from 'node-fetch'

// --- Configuration ---
// const OPENVERSE_API_BASE_URL = 'https://api.openverse.engineering/v1'; // Or the current base URL from their docs
// const APPLICATION_NAME = 'Your Website Name'; // Replace with your application's name
// const APPLICATION_DESCRIPTION = 'Description of how my website uses Openverse images'; // Replace with your application's description
// const CONTACT_EMAIL = 'your_email@example.com'; // Replace with your contact email

async function registerOpenVerse (registrationEndpoint, registrationBody){
  
  try {
    
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
    
    return {clientId, clientSecret}
  } catch (error) {
    console.log('Openverse Registration failed: ', error);
    return null
  }
}

async function getAccessToken(clientId, clientSecret) {

  const tokenEndpoint = `https://api.openverse.org/v1/auth_tokens/token/`;
  const tokenBody = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
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
    
    return accessToken;
  } catch (error) {
    console.log('Getting token failed: ', error)
    return null
  }

}

async function searchOpenverse(query, accessToken) {
  const apiKey = accessToken || 'eWFSVP3gAlSvclFKHpP4gXjJrOFjjA'; // Replace with your actual key
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
    return null
  }
}

// export default async function main(imageKeyword) {

//   // 1. Register your application (if you haven't already)
//   const registrationEndpoint = `https://api.openverse.org/v1/auth_tokens/register/`;
//   const registrationBody = {
//     "name": `Tour_Mate${OpenVerseRegNumber}`,
//     "description": "a tour guide to suggest tour trip plans",
//     "email": "shahzaibalisomroo@gmail.com"
//   };
//   const registrationDetails = await registerOpenVerse( registrationEndpoint, registrationBody )


//   // 2. Get the access token using the client credentials
//   if (registrationDetails) {
//     const accessToken = await getAccessToken(registrationDetails.clientId, registrationDetails.clientSecret)
    
//     if (accessToken)
//       searchOpenverse(, accessToken);
//   }

// }

// main(imageKeyword);

searchOpenverse('Dera Ismail Khan')