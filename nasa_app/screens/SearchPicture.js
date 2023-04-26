import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fetchPictureForDate } from "../api/NasaApi.js";
import ZoomCard from "../components/ZoomCard";

export default function SearchPicture() {
  const [inputDate, setInputDate] = useState(undefined);
  const [pictureData, setPictureData] = useState(null);

  const handleSearch = async () => {
    // Check if input date is valid
    if (!inputDate) {
      console.log("Please enter a valid date.");
      return;
    }

    // Convert input date (+1 because of timezones) to string in YYYY-MM-DD format
    const date = new Date(inputDate.getTime() + 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().slice(0, 10);

    // Fetch picture for the input date
    try {
      const pictureData = await fetchPictureForDate(dateStr);
      setPictureData(pictureData);
    } catch (error) {
      console.log("Error fetching picture data:", error);
    }
  };

  const closeZoomCard = () => {
    setPictureData(null);
  };

  return (
    <SafeAreaProvider>
      <View>
        <View>
          <DatePickerInput
            locale="en-GB"
            label="Date to search"
            value={inputDate}
            onChange={(d) => setInputDate(d)}
            inputMode="start"
          />
          <Button title="Search" onPress={handleSearch} />
        </View>
        {pictureData && (
          <View>
            <ZoomCard
              credit={pictureData.credit}
              descriptionText={pictureData.description}
              uri={pictureData.url}
              title={pictureData.title}
              closeZoomCard={closeZoomCard}
            />
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}


