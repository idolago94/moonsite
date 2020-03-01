import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';

class ShoesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onColorPress(shoesData, colorSelected) {
    this.setState({
      name: shoesData.name,
      brand: shoesData.brand,
      color: colorSelected,
    });
  }

  onSizePress(size) {
    this.setState({size: size});
    Alert.alert('Add this item to the set?', null, [
      {
        text: 'Yes',
        onPress: () => {
          let shoesData = this.state;
          this.props.sets.setItemSet('shoes', shoesData);
          this.props.navigation.navigate(Routes.Screens.HOME.routeName);
        },
      },
      {
        text: 'No',
        onPress: () =>
          this.setState({
            name: null,
            brand: null,
            color: null,
            size: null,
          }),
      },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Shirt Select</Text>
        <Text style={{fontWeight: 'bold'}}>
          Found {this.props.items.shoes.length} items.
        </Text>
        <View style={styles.listBox}>
          {this.props.items.shoes.map((sh, i) => (
            <View
              key={i}
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                borderBottomStyle: 'dotted',
              }}>
              <Text>
                {sh.name}({sh.brand}):
              </Text>
              <View style={styles.colorsBox}>
                {sh.colors.map((color, cI) => (
                  <Button
                    key={cI}
                    title={color}
                    color={color}
                    onPress={this.onColorPress.bind(this, sh, color)}
                  />
                ))}
              </View>
              {this.state.color &&
              this.state.name == sh.name &&
              this.state.brand == sh.brand ? (
                <View style={styles.sizesBox}>
                  {sh.sizes.map((size, sI) => (
                    <Button
                      key={sI}
                      style={{
                        borderRadius: 999,
                        backgroundColor: 'gray',
                        padding: 3,
                        margin: 3,
                      }}
                      title={size.toString()}
                      color={'black'}
                      onPress={this.onSizePress.bind(this, size)}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    padding: 20,
    alignSelf: 'center',
  },
  listBox: {
    margin: 20,
  },
  colorsBox: {
    flexDirection: 'row',
  },
  sizesBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default inject('sets', 'items')(observer(ShoesSelect));
