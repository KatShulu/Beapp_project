import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fetchPictureForDate } from "../api/NasaApi.js";
import ZoomCard from "../components/ZoomCard";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SearchPicture = () => {
  const [inputDate, setInputDate] = useState(undefined);
  const [pictureData, setPictureData] = useState(null);

  const fetchPictureForInputDate = async () => {
    // Check if input date is valid
    if (!inputDate) {
      console.log("Please enter a valid date.");
      return;
    }

    // Check if input date is within the valid range
    const startDate = new Date("1995-06-16");
    const endDate = new Date();
    if (inputDate < startDate || inputDate > endDate) {
      console.log("Please enter a date between Jun 16, 1995 and today date.");

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

  const handleInputDateChange = (d) => {
    setInputDate(d);
  };

  const closeZoomCard = () => {
    setPictureData(null);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Icon name={"telescope"} size={50} color={"black"}/>
        <Text style={styles.title}>   Search for a Picture</Text>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Enter a date to search:</Text>
        <DatePickerInput
          label="Date"
          accessibilityLabel="Date picker"
          locale="en-GB"
          value={inputDate}
          onChange={handleInputDateChange}
          inputMode="start"
        />
        <Button title="Search" onPress={fetchPictureForInputDate} />
        {!inputDate && <Text style={styles.error}>Please select a date.</Text>}
      </View>
      {pictureData && (
        <ZoomCard
          credit={pictureData.credit}
          descriptionText={pictureData.description}
          uri={pictureData.url}
          title={pictureData.title}
          closeZoomCard={closeZoomCard}
        />
      )}
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    searchContainer: {
      alignContent: "center",
      margin: "10%",
      padding: "8%",
      backgroundColor: "#f2f2f2",
    },
    searchText: {
      fontSize: 20,
      marginBottom: 10,
    },
  });

  export default SearchPicture;
