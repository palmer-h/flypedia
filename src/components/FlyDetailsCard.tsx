import { StyleSheet, View, Share } from 'react-native';
import { Card, Text, Avatar, Chip, IconButton } from 'react-native-paper';
import { useReduxDispatch, useReduxSelector } from '~hooks/redux';
import { Fly } from '~redux/slices/fliesSlice';
import FavouriteToggleButton from '~components/FavouriteToggleButton';
import { toggleFlyIsFavourited } from '~redux/slices/userSlice';
import { showSnackbar } from '~redux/slices/uiSlice';

interface Props {
  fly: Fly;
  onShare: () => any;
  onToggleIsFavourited: () => any;
}

const FlyDetailsCard: React.FC<Props> = props => {
  const dispatch = useReduxDispatch();
  const isFavourited = useReduxSelector(state =>
    state.user.favouriteFlies.includes(props.fly.id),
  );

  const handleToggleIsFavourited = () => {
    const favourited = isFavourited;
    dispatch(toggleFlyIsFavourited(props.fly.id));
    dispatch(
      showSnackbar(`${!favourited ? 'Added to' : 'Removed from'} favourites`),
    );
  };

  const handleShare = async () => {
    await Share.share({
      message: `Check out this Fly on Flypedia: ${props.fly.name}`,
    });
  };

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
              <FavouriteToggleButton
                isFavourited={isFavourited}
                onPress={() => handleToggleIsFavourited()}
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
