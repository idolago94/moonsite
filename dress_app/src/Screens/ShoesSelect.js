import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ShoesSelect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>ShoesSelect</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
