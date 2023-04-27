import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  BottomNavigation,
  Appbar,
} from "react-native-paper";
import TodayPicture from "./screens/TodayPicture.js";
import PreviousPicture from "./screens/PreviousPictures.js";
import SearchPicture from "./screens/SearchPicture.js"
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


/**
 * The main entry point for the app.
 * It creates a navigator using the Stack Navigator and sets up two screens, HomeScreen and PreviousPicture,
 * which can be navigated between using the navigator.
 */

export default function App() {
  const [index, setIndex] = React.useState(0);



  const routes = [
    { key: "TodayPicture", title: "Today picture", icon: "message-image" },
    { key: "PreviousPicture", title: "Previous Pictures", icon: "image-multiple" },
    { key: "SearchPicture", title: "Search Pictures", icon: "image-search" },
  ];
  
  const renderScene = BottomNavigation.SceneMap({
    TodayPicture: TodayPicture,
    PreviousPicture: PreviousPicture,
    SearchPicture: SearchPicture,
  });
  
  const renderIcon = ({ route, color }) => {
    return <Icon name={route.icon} size={30} color={color} />;
  };
  
  const handleTabPress = (newIndex) => {
    setIndex(newIndex);
  };
  
  const accessibilityLabel = (route) => {
    return `Go to ${route.title}`;
  };
  
  const screenReaderOptions = {
    announceCurrentState: true,
    backgroundColor: "#F5F5F5",
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Appbar.Header>
          <Appbar.Content title= "Nasapp" />
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleTabPress}
          renderScene={renderScene}
          renderIcon={renderIcon}
          barStyle={{ backgroundColor: "#F5F5F5" }}
          shifting={true}
          labeled={false}
          accessibilityRole="tablist"
          accessibilityLabel="Navigation tabs"
          screenReaderOptions={screenReaderOptions}
          getAccessibilityLabel={accessibilityLabel}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
