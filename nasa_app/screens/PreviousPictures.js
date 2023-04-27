import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchPicturesInRange } from "../api/NasaApi";
import ZoomCard from "../components/ZoomCard";

//This screens fetch the data of 8 pictures, display it and 
//fetch again the nexts items if the user scroll

export default function PreviousPictures() {
  //Number of item to fetch at the same time
  const NbToLoad = 8;
  // Declare state variables for the pictures, loading indicator, selected picture, and showZoomCard
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [showZoomCard, setShowZoomCard] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  // Fetch pictures from the API when the component mounts
  useEffect(() => {
    async function loadPictures() {
      try {
        setIsLoading(true);
        const newPictures = await fetchPicturesInRange(
          getDateString(pageIndex),
          getDateString(pageIndex - NbToLoad)
        );
        // Concatenate the new pictures with the existing pictures in state, and reverse the order
        // to display the most recent picture first
        setPictures([...pictures, ...newPictures.reverse()]);
        setIsLoading(false);
      } catch (error) {
        console.log(`Failed to fetch pictures: ${error}`);
      }
    }

    loadPictures();
    //rerender if pageIndez move
  }, [pageIndex]);

  //To handle the press event on an image
  const openZoomCard = (item) => {
    setSelectedPicture(item);
    setShowZoomCard(true);
  };
  const closeZoomCard = () => {
    setShowZoomCard(false);
  };

  //Renders the image and wraps it in a TouchableOpacity
  const renderPicture = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.pictureContainer}
        onPress={() => openZoomCard(item)}
        accessibilityLabel={`View picture: ${item.title}`}
      >
        {item.url && (
          <Image
            source={{ uri: item.url }}
            style={styles.picture}
            accessibilityLabel={item.title}
            accessibilityRole="image"
            onError={() =>
              console.log(`Failed to load image with url: ${item.url}`)
            }
          />
        )}
      </TouchableOpacity>
    );
  };

  //Renders the loading indicator when the pictures are being fetched from the API
  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  //Returns a date string for the given index
  const getDateString = (index) => {
    const date = new Date();
    date.setDate(date.getDate() - (index));
    return date.toISOString().slice(0, 10);
  };

  // A function that handles the onEndReached event
  const handleEndReached = () => {
    setPageIndex(pageIndex + NbToLoad);
  };

  return (
    <View style={styles.container}>
      {/*return FlatList wich call renderPicture on each item*/}
      <FlatList
        data={pictures}
        renderItem={renderPicture}
        keyExtractor={(item) => item.url}
        numColumns={2}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        accessibilityLabel="List of previous NASA pictures"
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
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});
