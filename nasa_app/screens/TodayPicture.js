
//This component displays the HomeScreen of the application.
//It fetches the daily Picture from the NASA API and displays it.

import React, { useState, useEffect } from "react";
import { View, Button, Image } from "react-native";
//Import of the fetch
import { fetchDailyPicture } from "../api/NasaApi";

export default function TodayImage({ navigation }) {
  // State to hold the daily Picture fetched from the API
  const [dailyPicture, setDailyPicture] = useState(null);

  // Fetch the daily Picture from the API on component mount
  useEffect(() => {
    async function getDailyPicture() {
      const data = await fetchDailyPicture();
      setDailyPicture(data);
    }
    getDailyPicture();
  }, []);

  return (
    <View>
      {/* Display the daily Picture if it has been fetched */}
      {dailyPicture && (
        <Image
          source={{ uri: dailyPicture.url }}
          style={{ width: 400, height: 500, alignSelf: "center" }}
        />
      )}

      {/* Button to navigate to the Old pictures screen */}
      <Button
        title="Old Pictures"
        onPress={() => navigation.navigate("Previous images")}
      />
    </View>
  );
}
