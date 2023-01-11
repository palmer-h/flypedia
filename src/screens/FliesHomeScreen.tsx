import { NavigationProp } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
interface Props {
  navigation: NavigationProp<any>;
}

const FliesHomeScreen: React.FC<Props> = ({ navigation }) => {
  const menuItems = [
    {
      id: 1,
      title: 'All Flies',
      icon: 'hook',
      route: 'All Flies',
    },
    {
      id: 2,
      title: 'Dry Flies',
      icon: 'hook',
      route: 'Fly Types',
    },
    // etc...
  ];

  return (
    <View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  menuTilesRow: {

  },
  menuTile: {

  },
});

export default FliesHomeScreen;
