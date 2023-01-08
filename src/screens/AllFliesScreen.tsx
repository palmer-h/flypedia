import { NavigationProp } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { List, Button, ActivityIndicator } from 'react-native-paper';
import { useReduxDispatch, useReduxSelector } from '~hooks/redux';
import FlyListItem from '~components/FlyListItem';
import { useCallback, useState } from 'react';
import { fetchPageOfFlies } from '~redux/slices/fliesSlice';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  navigation: NavigationProp<any>;
}

const AllFliesScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useReduxDispatch();
  const flies = useReduxSelector(state => state.flies.flies);
  const metadata = useReduxSelector(state => state.flies.metadata);

  const [isFetchingPage, setIsFetchingPage] = useState(false);

  const fetchPage = useCallback(async () => {
    setIsFetchingPage(true);
    dispatch(fetchPageOfFlies()).finally(() => setIsFetchingPage(false));
  }, [dispatch]);

  return (
    <ScrollView style={styles.allFliesScreen}>
      <List.Section>
        {flies.map(fly => (
          <FlyListItem
            fly={fly}
            key={fly.id}
            onPress={() =>
              navigation.navigate('Fly', { id: fly.id, name: fly.name })
            }
          />
        ))}
      </List.Section>
      {isFetchingPage ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : null}
      {metadata.pageNumber <= metadata.totalPages && !isFetchingPage ? (
        <Button
          mode="outlined"
          loading={isFetchingPage}
          onPress={() => fetchPage()}
          style={styles.loadMoreButton}>
          Load More
        </Button>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  allFliesScreen: {
    padding: 12,
  },
  loadMoreButton: {
    marginTop: 12,
    marginBottom: 24,
  },
  activityIndicator: {
    marginTop: 12,
    marginBottom: 24,
  },
});

export default AllFliesScreen;
