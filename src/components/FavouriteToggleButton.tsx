import { ToggleButton } from 'react-native-paper';

interface Props {
  isFavourited: boolean;
  onPress: () => any;
}

const FavouriteToggleButton: React.FC<Props> = props => {
  return (
    <ToggleButton
      icon={props.isFavourited ? 'heart' : 'heart-outline'}
      onPress={() => props.onPress()}
    />
  );
};

export default FavouriteToggleButton;
