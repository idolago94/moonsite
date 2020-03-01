// Components
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';

import {inject, observer} from 'mobx-react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1, marginTop: 100}}>
        <TextInput
          style={{backgroundColor: 'gray'}}
          onChangeText={value => this.setState({text: value})}
        />
        <Button
          title={'ADD'}
          onPress={() => this.props.store.addItem(this.state.text)}
          disabled={!this.state.text}
        />
        <Button
            title={'ADD'}
            onPress={() => this.props.fav.addItem(this.state.text)}
            disabled={!this.state.text}
            color={'red'}
        />
        {this.props.store.list.map((item, i) => (
          <Text key={i} style={{fontSize: 20}}>
            {item}
          </Text>
        ))}
        {this.props.fav.list.map((item, i) => (
            <Text key={i} style={{fontSize: 20, color: 'red'}}>
              {item}
            </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default inject('store', 'fav')(observer(Main));
