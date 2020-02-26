import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Style from '../helpers/style/style';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Btn(props) {
  return (
    <TouchableHighlight onPress={() => props.press()} style={styles.button}>
      <Text style={styles.value}>{props.value}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Style.colors.text,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 70,
    paddingVertical: 10,
    margin: 3
  },
  value: {
    color: Style.colors.text,
  },
});
