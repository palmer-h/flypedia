import { StyleSheet, View } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { Imitatee } from '~api/imitatee';

interface Props {
  imitatee: Imitatee;
}

const ImitateeDetailsCard: React.FC<Props> = props => {
  return (
    <View>
      <Card mode="elevated">
        <Card.Title
          title={props.imitatee.name}
          subtitleStyle={styles.imitateeCardSubtitle}
          left={(p: any) => (
            <Avatar.Text {...p} label={props.imitatee.acronym || 'I'} />
          )}
        />
        <Card.Content style={styles.imitateeCardContent}>
          <Text variant="bodyMedium">{props.imitatee.description}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  imitateeCardSubtitle: {
    fontWeight: 'bold',
  },
  imitateeCardContent: {
    marginTop: 8,
  },
});

export default ImitateeDetailsCard;
