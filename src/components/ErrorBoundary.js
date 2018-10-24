import React from 'react';
import { View, Text } from 'react-native';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text style={{ color: 'red' }}>{this.state.error}</Text>
          <Text style={{ color: 'red' }}>{this.state.info}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
