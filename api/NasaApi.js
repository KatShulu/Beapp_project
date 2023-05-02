//Import the key from the environement variables
import { API_KEY } from "@env";

//This file is where all the fetch are made, It's in two step, decide which url is called then made the fetch with it
//Currently the code is alowed to fetch 2 times

async function fetchWithRetry(url, maxRetries = 2) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s before retrying
    }
  }

  throw new Error(`Failed to fetch ${url} after ${maxRetries} retries`);
}

//Fetch today picture for the TodayPicture screen
export async function fetchDailyPicture() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  return fetchWithRetry(url);
}
//Fetch THIS date picture for the SearchPicture screen
export async function fetchPictureForDate(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
  return fetchWithRetry(url);
}
//Fetch from yyyy-mm-dd to yyyy-mm-dd picture for the PreviousPicture screen
export async function fetchPicturesInRange(startDate, endDate) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  return fetchWithRetry(url);
}
