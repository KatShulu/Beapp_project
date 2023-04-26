import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  BottomNavigation,
  Appbar,
} from "react-native-paper";
import TodayPicture from "./screens/TodayPicture.js";
import PreviousPicture from "./screens/PreviousPictures.js";

/**
 * The main entry point for the app.
 * It creates a navigator using the Stack Navigator and sets up two screens, HomeScreen and PreviousPicture,
 * which can be navigated between using the navigator.
 */

export default function App() {
  const [index, setIndex] = React.useState(0);



  const routes = [
    { key: "TodayPicture", title: "Today picture", icon: "image" },
    { key: "PreviousPicture", title: "Previous Pictures", icon: "history" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    TodayPicture: TodayPicture,
    PreviousPicture: PreviousPicture,
  });

  const handleTabPress = (newIndex) => {
    setIndex(newIndex);
  };
  //Not sure if i want the title or the route
  //const currentRoute = routes[index];

  return (
    <PaperProvider>
      <NavigationContainer>
        <Appbar.Header>
          <Appbar.Content title= "Nasapp"/*currentRoute.title*/ />
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleTabPress}
          renderScene={renderScene}
          shifting={true}
          barStyle={{ backgroundColor: "#F5F5F5" }}
        ></BottomNavigation>
      </NavigationContainer>
    </PaperProvider>
  );
}
