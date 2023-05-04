import React from "react";
import {
  ScrollView,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
//Necessary for the resoc share
import { Share } from "react-native";

//This component is on every screen and display a card with the picture info
//It takes a lot of props for it's display
const ZoomCard = ({
  credit,
  descriptionText,
  uri,
  title,
  closeZoomCard,
  showModal,
}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: title + " " + uri,
      });
      if (result.action === Share.sharedAction) {
        console.log("Shared successfully");
      } else if (result.action === Share.dismissedAction) {
        console.log("Sharing dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>

      <Card style ={styles.cardContainer}>
        <Card.Cover source={{ uri }} style={styles.cardPicture}/>
        <Card.Title title={title} subtitle={credit}style={styles.cardTitle} titleStyle={{ fontWeight: "bold"}} />
        <Card.Content style={styles.cardContent}>
          {/*To be able to scroll on the text */}
          <ScrollView>
            <Text variant="bodyLarge">{descriptionText}</Text>
          </ScrollView>
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <Button onPress={onShare} accessibilityLabel="Share this picture">
            Share
          </Button>
          <Button onPress={closeZoomCard} accessibilityLabel="Close zoom card">
            Close{" "}
          </Button>
        </Card.Actions>
      </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'

  },
  cardContainer :{
    flexDirection : "column",
    justifyContent : "space-between",
    width: '90%',
    height : '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow : 'scroll',
  },
  cardPicture: {
    flex : 3,
  },
  cardTitle: {
    flex: 2,
    fontWeight : "bold"

  },  
  cardContent: {
    flex: 2,
    maxHeight : "30%",

  },
  cardAction: {
    flex: 1,
  }
});

export default ZoomCard;
