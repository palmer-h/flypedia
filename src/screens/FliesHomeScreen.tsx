import { NavigationProp } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useReduxDispatch, useReduxSelector } from '~hooks/redux';
import FlyListItem from '~components/FlyListItem';
import { useEffect } from 'react';
import { fetchPageOfFlies } from '~redux/slices/fliesSlice';

interface Props {
  navigation: NavigationProp<any>;
}

const FliesHomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useReduxDispatch();
  const flies = useReduxSelector(state => state.flies.flies);

  useEffect(() => {
    dispatch(fetchPageOfFlies());
  }, [dispatch]);

  return (
    <ScrollView style={styles.fliesHomeScreen}>
      <List.Section title="Recently added Flies">
        {flies.slice(0, 5).map(fly => (
          <FlyListItem
            fly={fly}
            key={fly.id}
            onPress={() =>
              navigation.navigate('Fly', { id: fly.id, name: fly.name })
            }
          />
        ))}
        <Button
          mode="outlined"
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('All Flies')}>
          See all Flies
        </Button>
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fliesHomeScreen: {
    padding: 12,
  },
  seeAllButton: {
    marginTop: 12,
  },
});

export default FliesHomeScreen;
