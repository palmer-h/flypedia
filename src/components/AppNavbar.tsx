import { NavigationProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

interface Props {
  navigation: NavigationProp<any>;
  back: boolean;
  title: string;
}

const CustomNavigationBar: React.FC<Props> = ({ navigation, back, title }) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
