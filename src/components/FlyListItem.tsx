import { List, Avatar, ToggleButton } from 'react-native-paper';
import { Fly } from '~api/fly';

interface Props {
  fly: Fly;
  onPress: (id: number) => any;
}

const FlyListItem: React.FC<Props> = props => {
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
      right={() => <ToggleButton value={props.fly.isFavourited} icon="heart" />}
      onPress={() => props.onPress(props.fly.id)}
    />
  );
};

export default FlyListItem;
