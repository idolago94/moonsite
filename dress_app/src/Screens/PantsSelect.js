import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class PantsSelect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>PantsSelect</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
