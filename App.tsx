import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from '~redux/store';
import MainBottomTabNavigator from '~navigators/MainBottomTabNavigator';
import GlobalErrorBoundary from '~components/GlobalErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import theme from '~core/appTheme';

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <StoreProvider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <MainBottomTabNavigator />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </GlobalErrorBoundary>
  );
};

export default App;
