import React from 'react';
import { View, Text } from 'react-native';

import YAMLParser from '../utils/YAMLParser.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

export default class Preview extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { source } = nextProps;
    if (prevState.parser.source !== source) {
      prevState.parser.setSource(source);
      const { screens } = prevState.parser;
      const currentScreen = screens[prevState.currentScreen]
        ? prevState.currentScreen
        : prevState.parser.root;
      return {
        screens,
        currentScreen,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const parser = new YAMLParser(this.handleChangeScreen);
    parser.setSource(props.source);
    const currentScreen = parser.root;
    this.state = {
      parser,
      currentScreen,
    };
  }

  handleChangeScreen = currentScreen => {
    this.setState({ currentScreen });
  };

  render() {
    const { renderAllScreens } = this.props;
    if (renderAllScreens) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Object.keys(this.state.parser.screens).map(screen => (
            <View
              key={screen}
              style={{
                margin: 10,
                height: 420,
                width: 236,
                borderWidth: 1,
                borderColor: 'lightgrey',
              }}>
              {this.state.parser.screens[screen]}
            </View>
          ))}
        </View>
      );
    }
    if (this.state.parser.error) {
      return (
        <Text style={{ color: 'red' }}>{ this.state.parser.error.toString() }</Text>
      )
    }
    return (
      <ErrorBoundary>{this.state.parser.screens[this.state.currentScreen]}</ErrorBoundary>
    );
  }
}
