import { StackHeaderProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const CustomNavigationBar: React.FC<StackHeaderProps> = (
  props: StackHeaderProps,
) => {
  const theme = useTheme();

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }} elevated>
      {props.back ? (
        <Appbar.BackAction
          iconColor="white"
          onPress={props.navigation.goBack}
        />
      ) : null}
      <Appbar.Content
        title={props.options.title}
        titleStyle={styles.appbarTitle}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbarTitle: {
    color: 'white',
  },
});

export default CustomNavigationBar;
