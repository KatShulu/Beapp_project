// Import the API key from environment variables
import { API_KEY } from "@env";

// Async function to fetch NASA's daily photo
export async function fetchDailyPhoto() {
  // Create the API URL with the API key and send a GET request to the URL
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  const response = await fetch(url);

  // Wait for the response and convert it to a JSON object
  const data = await response.json();

  // Return the JSON data of the daily photo
  return data;
}

