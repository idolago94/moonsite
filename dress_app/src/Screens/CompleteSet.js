import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class CompleteSet extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>CompleteSet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
