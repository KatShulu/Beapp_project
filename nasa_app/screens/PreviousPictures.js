// Importing necessary components from React Native and the API function for fetching pictures
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchPicturesInRange } from "../api/NasaApi";



// The main component that will display the NASA pictures
export default function NasaPictures() {
  const nbToShow = 7
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const yesterDay = today.getDate() - 1;
  const yesterdayMinus5 = today.getDate() - (nbToShow+1);

  const yesterdayDate = `${year}-${month.toString().padStart(2, '0')}-${yesterDay.toString().padStart(2, '0')}`;
  const yesterdayDateMinus5 = `${year}-${month.toString().padStart(2, '0')}-${yesterdayMinus5.toString().padStart(2, '0')}`;
  
  // Declare three state variables for the pictures, loading indicator and page number
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(yesterdayDateMinus5);
  const [endDate, setEndDate] = useState(yesterdayDate);

  
  // useEffect hook is used to fetch pictures from the API when the component mounts
  useEffect(() => {
    async function loadPictures() {
      // Call the API function to get a certain number of pictures based on the page number

      const newPictures = await fetchPicturesInRange(startDate, endDate);
      // Update the pictures state with the new pictures fetched from the API
      setPictures([...pictures, ...newPictures]);
      // Set isLoading to false since the pictures have been fetched
      setIsLoading(false);
    }

    // Call the loadPictures function defined above
    loadPictures();
  }, [startDate, endDate]);

  // A function that updates change the dates to fetch when the user scrolls to the bottom of the list
  const handleLoadMore = () => {
    /*
    const tempDate = new Date(endDate)
    tempDate.setDate(tempDate.getDate() - (nbToShow +1));
    tempDate = tempDate.toISOString().slice(0, 10);
    setEndDate(startDate)
    setStartDate(tempDate);*/

  };

  // A function that renders the pictures and wraps them in a container
  const renderPicture = ({ item }) => {
    return (
      <View style={styles.pictureContainer}>
        <Image source={{ uri: item.url }} style={styles.picture} />
      </View>
    );
  };

  // A function that renders the loading indicator when the pictures are being fetched from the API
  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  // The main component returns a FlatList component that displays the pictures
  return (
    <FlatList
      style={styles.container}
      data={pictures}
      renderItem={renderPicture}
      keyExtractor={(item) => item.date}
      numColumns={2}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
}

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pictureContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  picture: {
    flex: 1,
    resizeMode: "cover",
  },
});
