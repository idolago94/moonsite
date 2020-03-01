import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Routes from '../Routes/Routes';

export default class CompleteSet extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 100}}>Set</Text>
        <Text style={{fontSize: 100}}>Saved!</Text>
        <Button
          title="Back Home"
          onPress={() =>
            this.props.navigation.navigate(Routes.Screens.HOME.routeName)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
