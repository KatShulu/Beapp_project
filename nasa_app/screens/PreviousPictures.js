import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { fetchPicturesInRange } from "../api/NasaApi";
import ZoomCard from "../components/ZoomCard";



export default function NasaPictures() {
  // Declare state variables for the pictures, loading indicator, selected picture, and showZoomCard flag
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("2023-04-01");
  const [endDate, setEndDate] = useState("2023-04-25");
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [showZoomCard, setShowZoomCard] = useState(false);

  // Fetch pictures from the API when the component mounts
  useEffect(() => {
    async function loadPictures() {
      const newPictures = await fetchPicturesInRange(startDate, endDate);
      setPictures([...pictures, ...newPictures]);
      setIsLoading(false);
    }
    loadPictures();
  }, [startDate, endDate]);

  // A function to handle the press event on an image
  const openZoomCard = (item) => {
    setSelectedPicture(item);
    setShowZoomCard(true);
  };
  const closeZoomCard = () => {
    setShowZoomCard(false);
  };

  // A function that renders the image and wraps it in a TouchableOpacity
  const renderPicture = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.pictureContainer}
        onPress={() => openZoomCard(item)}
      >
        <Image source={{ uri: item.url }} style={styles.picture} />
      </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <FlatList
        data={pictures}
        renderItem={renderPicture}
        keyExtractor={(item) => item.date}
        numColumns={2}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
      />
      {/* Show the ZoomCard component only when selectedPicture is not null */}
      {showZoomCard && (
        <ZoomCard
          title={selectedPicture?.title}
          credit={selectedPicture?.copyright}
          descriptionText={selectedPicture?.explanation}
          uri={selectedPicture?.url}
          closeZoomCard={closeZoomCard}
        />
      )}
    </View>
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