import { List, Avatar } from 'react-native-paper';
import { useReduxDispatch, useReduxSelector } from '~hooks/redux';
import { toggleFlyIsFavourited } from '~redux/slices/userSlice';
import { Fly } from '~redux/slices/fliesSlice';
import FavouriteToggleButton from '~components/FavouriteToggleButton';
import { showSnackbar } from '~redux/slices/uiSlice';

interface Props {
  fly: Fly;
  onPress: (id: number) => any;
}

const FlyListItem: React.FC<Props> = props => {
  const dispatch = useReduxDispatch();
  const isFavourited = useReduxSelector(state =>
    state.user.favouriteFlies.includes(props.fly.id),
  );

  const handleToggleIsFavourited = (): void => {
    const favourited = isFavourited;
    dispatch(toggleFlyIsFavourited(props.fly.id));
    dispatch(
      showSnackbar(`${!favourited ? 'Added to' : 'Removed from'} favourites`),
    );
  };

  return (
    <List.Item
      title={props.fly.name}
      description={props.fly.description}
      left={listItemProps => (
        <Avatar.Text
          style={listItemProps.style}
          label={props.fly.acronym}
          size={44}
        />
      )}
      right={() => (
        <FavouriteToggleButton
          isFavourited={isFavourited}
          onPress={() => handleToggleIsFavourited()}
        />
      )}
      onPress={() => props.onPress(props.fly.id)}
    />
  );
};

export default FlyListItem;
