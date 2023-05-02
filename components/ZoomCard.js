import React from "react";
import { ScrollView, Modal, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from "react-native-paper";
//Necessary for the resoc share
import { Share } from 'react-native';

//This component is on every screen and display a card with the picture info
//It takes a lot of props for it's display
//TODO : factorize the showcard/don't showcard
const ZoomCard = ({ credit, descriptionText, uri, title, closeZoomCard, showModal }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: title + ' ' + uri,
      });
      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.cardContainer}>
          <Card>
            <Card.Cover source={{ uri }} />
            <Card.Title title={title} subtitle={credit} />
            <Card.Content style={styles.CardContent}>
              {/*To be able to scroll on the text */}
              <ScrollView >
                <Text variant="bodyMedium">{descriptionText}</Text>
              </ScrollView>
            </Card.Content>

            <Card.Actions>
              <Button onPress={onShare} accessibilityLabel="Share this picture">Share</Button>
              <Button onPress={closeZoomCard} accessibilityLabel="Close zoom card">Close </Button>
            </Card.Actions>
          </Card>
        </View>
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
  cardContainer: {
    width: '85%',
    maxHeight : '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'scroll'
  },
  CardContent: {
    maxHeight: '49%',
  }
});

export default ZoomCard;
