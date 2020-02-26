import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Style from '../helpers/style/style';

export default function HandleError(props) {
  return (
    <View>
      {props.errors < 1 ? null : (
        <View style={styles.errorBox}>
          {props.errors.map(err => (
            <Text style={{color: Style.colors.text}}>*{err}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorBox: {
    borderRadius: Style.sizes.border_radius,
    borderWidth: 1,
    borderColor: Style.colors.errorBorder,
    width: '100%',
    padding: 10,
    backgroundColor: Style.colors.errorBackground,
  },
});
