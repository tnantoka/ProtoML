import React from 'react';
import { View } from 'react-native';

import Preview from './Preview';

export default class Player extends React.Component {
  render() {
    const { source } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Preview source={source} />
      </View>
    );
  }
}
