import React from 'react';
import yaml, { DEFAULT_SAFE_SCHEMA } from 'js-yaml';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import _ from 'lodash';

const Alert = {
  alert(title, message, buttons) {
    switch (buttons.length) {
      case 1:
        alert(title);
        break;
      case 2:
        // eslint-disable-next-line no-restricted-globals
        if (confirm(title)) {
          buttons[1]();
        }
        break;
      default:
    }
  },
};

function parseComponent(key, doc, onChangeScreen) {
  const { text, icon, children, onPress, input } = doc;
  const props = _.omit(doc, ['text', 'icon', 'children', 'onPress', 'input']);
  if (onPress) {
    if (onPress.linkTo) {
      props.onPress = () => onChangeScreen(onPress.linkTo);
    } else if (onPress.alert) {
      Alert.alert(onPress.alert, null, [{ text: 'OK', onPress: () => {} }]);
    } else if (onPress.confirm) {
      Alert.alert(onPress.confirm.title, null, [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => onChangeScreen(onPress.confirm.linkTo) },
      ]);
    }
  }
  if (icon) {
    return <Icon key={key} {...icon} />;
  }
  if (text) {
    const { content } = text;
    return (
      <Text key={key} {..._.omit(text, ['content'])} onPress={props.onPress}>
        {content}
      </Text>
    );
  }
  if (input) {
    const { value } = input;
    return <TextInput key={key} {..._.omit(input, ['value'])} defaultValue={value} />;
  }
  const Tag = onPress ? TouchableOpacity : View;
  return (
    <Tag key={key} {...props}>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          width: 10,
          height: 10,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
      {!!children && children.map((child, i) => parseComponent(i, child, onChangeScreen))}
    </Tag>
  );
}

function parseScreens(doc, onChangeScreen) {
  const screens = {};
  for (const key in doc) {
    if (/^_/.test(key)) {
      continue;
    }
    let { children } = doc[key];
    children = children || [];
    const props = _.omit(doc[key], ['children']);
    if (!props.style) {
      props.style = {};
    }
    props.style = { flex: 1, position: 'relative', ...props.style };
    screens[key] = (
      <View {...props}>{children.map((child, i) => parseComponent(`${key}-${i}`, child, onChangeScreen))}</View>
    );
  }
  return screens;
}

export default class YAMLParser {
  constructor(onChangeScreen) {
    this.onChangeScreen = onChangeScreen;
  }

  setSource(source) {
    this.source = source;
    this.error = null;

    let doc;
    try {
      doc = yaml.load(source, { schema: DEFAULT_SAFE_SCHEMA });
    } catch (e) {
      this.error = e;
      console.error(e);
    }
    doc = doc || { home: <View /> };

    this.screens = parseScreens(doc, this.onChangeScreen);
    this.root = Object.keys(doc).find(key => doc[key].root);
  }
}
