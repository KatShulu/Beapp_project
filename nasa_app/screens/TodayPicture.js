import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Text } from "react-native";
import { fetchDailyPicture } from "../api/NasaApi";
import ZoomCard from "../components/ZoomCard";

const { width, height } = Dimensions.get("window");

export default function TodayPicture() {
  const [dailyPicture, setDailyPicture] = useState(null);
  const [showZoomCard, setShowZoomCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getDailyPicture() {
      try {
        const data = await fetchDailyPicture();
        setDailyPicture(data);
      } catch (error) {
        console.log("Error fetching daily picture", error);
      } finally {
        setLoading(false);
      }
    }
    getDailyPicture();
  }, []);

  const openZoomCard = () => {
    setShowZoomCard(true);
  };

  const closeZoomCard = () => {
    setShowZoomCard(false);
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <TouchableOpacity onPressIn={openZoomCard} accessibilityLabel="View daily picture">
          <Image source={{ uri: dailyPicture.url }} style={styles.image} />
        </TouchableOpacity>
      )}

      {showZoomCard && (
        <View style={styles.zoomCardContainer}>
          <ZoomCard
            title={dailyPicture.title}
            credit={dailyPicture.credit}
            descriptionText={dailyPicture.explanation}
            uri={dailyPicture.url}
            closeZoomCard={closeZoomCard}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
    alignSelf: "center",
  },

  zoomCardContainer: {
    position: "absolute",
  },
});
