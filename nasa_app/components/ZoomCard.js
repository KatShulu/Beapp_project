import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const ZoomCard = ({ credit, descriptionText, uri, title, closeZoomCard}) => (
  <Card>
    <Card.Cover source={{ uri }} />
    <Card.Title title={title} subtitle={credit}  />
    <Card.Content>
      <Text variant="bodyMedium">{descriptionText}</Text>
    </Card.Content>

    <Card.Actions>
      <Button onPress={closeZoomCard}>Close</Button>

    </Card.Actions>
  </Card>
);

export default ZoomCard;
