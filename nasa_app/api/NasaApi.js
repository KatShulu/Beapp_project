// Import the API key from environment variables
import { API_KEY } from "@env";
// Async function to fetch NASA's daily photo
export async function fetchDailyPicture() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching daily photo:', error);
      throw error;
    }
  }
  
  // Async function to fetch NASA's photo for a specific date
  export async function fetchPictureForDate(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching photo for date ${date}:`, error);
      throw error;
    }
  }
  
  export async function fetchPicturesInRange(startDate, endDate) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching photos for date range ${startDate} to ${endDate}:`, error);
      throw error;
    }
  }
  