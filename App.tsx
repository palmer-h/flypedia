import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '~redux/store';
import MainBottomTabNavigator from '~navigators/MainBottomTabNavigator';
import GlobalErrorBoundary from '~components/GlobalErrorBoundary';
import theme from '~core/appTheme'; // TODO: integrate theme
import GlobalSnackbar from '~components/GlobalSnackbar';

const persistor = persistStore(store);

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <MainBottomTabNavigator />
              <GlobalSnackbar />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </GlobalErrorBoundary>
  );
};

export default App;
