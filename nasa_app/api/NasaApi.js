// Import the API key from environment variables
import { API_KEY } from "@env";

// Async function to fetch NASA's daily photo
export async function fetchDailyPicture() {
  // Create the API URL with the API key and send a GET request to the URL
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  const response = await fetch(url);

  // Wait for the response and convert it to a JSON object
  const data = await response.json();

  // Return the JSON data of the daily photo
  return data;
}

export async function fetchPicturesInRange(startDate, endDate) {
  // Create the API URL with the API key and start and end dates, and send a GET request to the URL
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  const response = await fetch(url);

  // Wait for the response and convert it to a JSON object
  const data = await response.json();

  // Return the data
  return data;
}

// Async function to fetch NASA's photo for a specific date
export async function fetchPictureForDate(date) {
  // Create the API URL with the API key and the given date, and send a GET request to the URL
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
  const response = await fetch(url);

  // Wait for the response and convert it to a JSON object
  const data = await response.json();

  // Return the JSON data of the photo for the given date
  return data;
}
