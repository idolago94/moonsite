import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';

class PantsSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onColorPress(pantsData, colorSelected) {
    this.setState({
      name: pantsData.name,
      brand: pantsData.brand,
      color: colorSelected,
    });
  }

  onSizePress(size) {
    this.setState({size: size});
    Alert.alert('Add this item to the set?', null, [
      {
        text: 'Yes',
        onPress: () => {
          let pantsData = this.state;
          this.props.sets.setItemSet('pants', pantsData);
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
        <Text style={styles.title}>Pants Select</Text>
        <Text style={{fontWeight: 'bold'}}>
          Found {this.props.items.pants.length} items.
        </Text>
        <View style={styles.listBox}>
          {this.props.items.pants.map((pa, i) => (
            <View
              key={i}
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                borderBottomStyle: 'dotted',
              }}>
              <Text>
                {pa.name}({pa.brand}):
              </Text>
              <View style={styles.colorsBox}>
                {pa.colors.map((color, cI) => (
                  <Button
                    key={cI}
                    title={color}
                    color={color}
                    onPress={this.onColorPress.bind(this, pa, color)}
                  />
                ))}
              </View>
              {this.state.color &&
              this.state.name == pa.name &&
              this.state.brand == pa.brand ? (
                <View style={styles.sizesBox}>
                  {pa.sizes.map((size, sI) => (
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

export default inject('sets', 'items')(observer(PantsSelect));
