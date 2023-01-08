import { createStackNavigator } from '@react-navigation/stack';
import AppNavbar from '~components/AppNavbar';
import FliesHomeScreen from '~screens/FliesHomeScreen';
import FlyScreen from '~screens/FlyScreen';
import AllFliesScreen from '~screens/AllFliesScreen';

const Stack = createStackNavigator();

/* TODO: Integrate custom AppNavbar with correct screen title, & use fly/imitatee name as title for fly/imitatee screens */

const FliesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Flies Home">
      <Stack.Screen
        name="Flies Home"
        component={FliesHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="All Flies"
        component={AllFliesScreen}
        options={{ title: 'All Flies' }}
      />
      <Stack.Screen
        name="Fly"
        component={FlyScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default FliesStackNavigator;
