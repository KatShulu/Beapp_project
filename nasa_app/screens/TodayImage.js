
//This component displays the HomeScreen of the application.
//It fetches the daily photo from the NASA API and displays it.

import React, { useState, useEffect } from "react";
import { View, Button, Image } from "react-native";
//Import of the fetch
import { fetchDailyPhoto } from "../api/NasaApi";

export default function TodayImage({ navigation }) {
  // State to hold the daily photo fetched from the API
  const [dailyPhoto, setDailyPhoto] = useState(null);

  // Fetch the daily photo from the API on component mount
  useEffect(() => {
    async function getDailyPhoto() {
      const data = await fetchDailyPhoto();
      setDailyPhoto(data);
    }
    getDailyPhoto();
  }, []);

  return (
    <View>
      {/* Display the daily photo if it has been fetched */}
      {dailyPhoto && (
        <Image
          source={{ uri: dailyPhoto.url }}
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
