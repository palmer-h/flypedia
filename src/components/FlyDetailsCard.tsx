import { StyleSheet, View } from 'react-native';
import { Card, Text, Avatar, Chip, IconButton } from 'react-native-paper';
import { Fly } from '~api/fly';

interface Props {
  fly: Fly;
  onShare: () => any;
  onFavourite: () => any;
}

const FlyDetailsCard: React.FC<Props> = props => {
  return (
    <View>
      <Card mode="elevated">
        <Card.Title
          title={props.fly.name}
          titleStyle={styles.flyCardTitle}
          left={(p: any) => (
            <Avatar.Text {...p} label={props.fly.acronym || 'F'} />
          )}
          right={(p: any) => (
            <View style={styles.flyCardRightButtonsRow}>
              <IconButton
                {...p}
                mode="contained"
                icon="heart"
                onPress={() => props.onFavourite()}
              />
              <IconButton
                {...p}
                mode="contained"
                icon="share-variant-outline"
                onPress={() => props.onShare()}
              />
            </View>
          )}
        />
        <Card.Content style={styles.flyCardContent}>
          <View style={styles.flyTypeChipRow}>
            {props.fly.types.map(type => (
              <Chip key={type.id} style={styles.flyTypeChip} compact elevated>
                {type.name}
              </Chip>
            ))}
          </View>
          <Text variant="bodyMedium">{props.fly.description}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  flyCardTitle: {
    fontWeight: 'bold',
  },
  flyCardRightButtonsRow: {
    flexDirection: 'row',
    marginRight: 12,
  },
  flyTypeChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  flyTypeChip: {
    marginRight: 8,
  },
  flyCardContent: {
    marginTop: 4,
  },
});

export default FlyDetailsCard;
