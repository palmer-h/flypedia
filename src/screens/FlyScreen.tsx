import { NavigationProp, Route } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import { useReduxSelector } from '~hooks/redux';
import FlyDetailsCard from '~components/FlyDetailsCard';

interface Props {
  route: Route<any>; // Todo type properly!
  navigation: NavigationProp<any>;
}

const FlyScreen: React.FC<Props> = ({ route }) => {
  const fly = useReduxSelector(state =>
    state.flies.flies.find(x => x.id === route.params?.id),
  );

  return (
    <View style={styles.flyScreen}>
      <FlyDetailsCard fly={fly} />
      <Card mode="elevated" style={styles.imitateesCard}>
        <Card.Title title="Imitatees" titleStyle={styles.imitateesCardTitle} />
        <Card.Content>
          {fly.imitatees.length > 0 ? (
            <List.Section>
              {fly.imitatees.map(imitatee => (
                <List.Item
                  key={imitatee.id}
                  title={imitatee.name}
                  description={imitatee.description}
                  left={props => <List.Icon {...props} icon="bug" />}
                />
              ))}
            </List.Section>
          ) : (
            <Text>This Fly does not currently have any Imitatees</Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  imitateesCardTitle: {
    fontWeight: 'bold',
  },
  flyScreen: {
    padding: 12,
  },
  imitateesCard: {
    marginTop: 12,
  },
});

export default FlyScreen;
