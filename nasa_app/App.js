import React, {useState} from "react";
//Navigation and Tabbar
import { NavigationContainer } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  BottomNavigation,
  Appbar,
} from "react-native-paper";
//Screens
import TodayPicture from "./screens/TodayPicture.js";
import PreviousPicture from "./screens/PreviousPictures.js";
import SearchPicture from "./screens/SearchPicture.js";
//For the app icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//Langage choice for the date dependence
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);


//The main entry point for the app.
//It creates the different routes for the app and render the Tabbar

export default function App() {
  // Initializing state for the current tab index
  const [index, setIndex] = useState(0);
  // Defining the routes for the Bottom Navigation Tabbar
  const routes = [
    { key: "TodayPicture", title: "Today picture", icon: "message-image" },
    { key: "PreviousPicture", title: "Previous Pictures", icon: "image-multiple"},
    { key: "SearchPicture", title: "Search Pictures", icon: "image-search" },
  ];
  // Mapping the screens to their respective keys in the Bottom Navigation Tabbar
  const renderScene = BottomNavigation.SceneMap({
    TodayPicture: TodayPicture,
    PreviousPicture: PreviousPicture,
    SearchPicture: SearchPicture,
  });
  // Rendering the icon for each tab
  const renderIcon = ({ route, color }) => {
    return <Icon name={route.icon} size={30} color={color} />;
  };
  // Handling tab press and updating the current index state
  const handleTabPress = (newIndex) => {
    setIndex(newIndex);
  };
  // Defining accessibility label for each tab
  const accessibilityLabel = (route) => {
    return `Go to ${route.title}`;
  };
  // Defining screen reader options
  const screenReaderOptions = {
    announceCurrentState: true,
    backgroundColor: "#F5F5F5",
  };
  // Rendering the app with PaperProvider, NavigationContainer and BottomNavigation
  return (
    <PaperProvider>
      <NavigationContainer>
        <Appbar.Header>
          <Appbar.Content title="Nasapp" />
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleTabPress}
          renderScene={renderScene}
          renderIcon={renderIcon}
          barStyle={{ backgroundColor: "#F5F5F5" }}
          labeled={true}
          accessibilityRole="tablist"
          accessibilityLabel="Navigation tabs"
          screenReaderOptions={screenReaderOptions}
          getAccessibilityLabel={accessibilityLabel}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
