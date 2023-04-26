import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { Share } from 'react-native';


const ZoomCard = ({ credit, descriptionText, uri, title, closeZoomCard }) => {
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
    <Card>
      <Card.Cover source={{ uri }} />
      <Card.Title title={title} subtitle={credit} />
      <Card.Content>
        <Text variant="bodyMedium">{descriptionText}</Text>
      </Card.Content>

      <Card.Actions>
        <Button onPress={onShare}>Share</Button>
        <Button onPress={closeZoomCard}>Close</Button>
      </Card.Actions>
    </Card>
  );
};

export default ZoomCard;
