import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class GlobalErrorBoundary extends React.Component<any, any> {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error: any) {
    return { error: true };
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Oops, something went wrong...</Text>
        <Text style={styles.message}>The app crashed unexpectedly!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 32,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  message: {
    fontSize: 16,
    marginVertical: 20,
    lineHeight: 23,
    fontWeight: '500',
  },
});

export default GlobalErrorBoundary;
