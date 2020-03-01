import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ShirtSelect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>ShirtSelect</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
