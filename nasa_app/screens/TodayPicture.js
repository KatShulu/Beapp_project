import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { fetchDailyPicture } from "../api/NasaApi";
import ZoomCard from "../components/ZoomCard";

const { width, height } = Dimensions.get("window");

export default function TodayPicture() {
  const [dailyPicture, setDailyPicture] = useState(null);
  const [showZoomCard, setShowZoomCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDailyPicture() {
      const data = await fetchDailyPicture();
      setDailyPicture(data);
      setIsLoading(false);
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
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <TouchableOpacity onPressIn={openZoomCard}>
            <Image source={{ uri: dailyPicture.url }} style={[styles.image]} />
          </TouchableOpacity>
          {showZoomCard && (
            <View style={styles.zoomCardContainer}>
              <ZoomCard
                title={dailyPicture?.title}
                credit={dailyPicture?.copyright}
                descriptionText={dailyPicture?.explanation}
                uri={dailyPicture?.url}
                closeZoomCard={closeZoomCard}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: height,
    alignSelf: "center",
  },
  zoomCardContainer: {
    position: "absolute",
  },
});
