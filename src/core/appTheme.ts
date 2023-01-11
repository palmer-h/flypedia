import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';

const appTheme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3D5656',
    primaryContainer: 'white',
    secondaryContainer: '#e8eaee',
/*  primary: '#303f2b',
    onPrimary: '#303f2b',
    primaryContainer: '#303f2b',
    onPrimaryContainer: '#303f2b',
    secondary: '#303f2b',
    onSecondary: '#303f2b',
    secondaryContainer: '#303f2b',
    onSecondaryContainer: '#dfedd5',
    tertiary: '#303f2b',
    onTertiary: '#303f2b',
    tertiaryContainer: '#303f2b',
    onTertiaryContainer: '#dfedd5',
    background: '#dfedd5',
    onBackground: '#dfedd5',
    surface: '#dfedd5',
    onSurface: '#dfedd5',
    surfaceVariant: '#dfedd5',
    onSurfaceVariant: '#dfedd5',
    surfaceDisabled: '#dfedd5',
    onSurfaceDisabled: '#dfedd5',
    outline: '#dfedd5', */
  },
};

export default appTheme;
