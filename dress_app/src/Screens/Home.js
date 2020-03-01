import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import Set from '../components/Set';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';

class Home extends Component {
  componentDidMount(): void {
    this.props.items.fetchItems();
  }

  onSaveSet() {
    this.props.sets.addSet();
    this.props.navigation.navigate(Routes.Screens.COMPLETE_SET);
  }

  render() {
    let itemsCompleted = Object.keys(this.props.sets.newSet);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dress App</Text>
        {itemsCompleted < 1 ? (
          <Button
            title={'New Set'}
            onPress={() =>
              this.props.navigation.navigate(
                Routes.Screens.SHIRT_SELECT.routeName,
              )
            }
          />
        ) : (
          <View
            style={{
              padding: 10,
              margin: 15,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'red',
            }}>
            <Text>
              You have set not completed(
              {itemsCompleted.length}/3)
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                title={'shirt'}
                onPress={() =>
                  this.props.navigation.navigate(
                    Routes.Screens.SHIRT_SELECT.routeName,
                  )
                }
                disabled={itemsCompleted.find(item => item == 'shirt')}
              />
              <Button
                title={'pants'}
                onPress={() =>
                  this.props.navigation.navigate(
                    Routes.Screens.PANTS_SELECT.routeName,
                  )
                }
                disabled={itemsCompleted.find(item => item == 'pants')}
              />
              <Button
                title={'shoes'}
                onPress={() =>
                  this.props.navigation.navigate(
                    Routes.Screens.SHOES_SELECT.routeName,
                  )
                }
                disabled={itemsCompleted.find(item => item == 'shoes')}
              />
            </View>
            <Button
              title={'SAVE'}
              onPress={() => this.onSaveSet()}
              disabled={itemsCompleted.length < 3}
            />
          </View>
        )}
        <FlatList
          style={{flex: 1}}
          keyExtractor={item => item.index}
          data={this.props.sets.setList}
          renderItem={({item, index}) => <Set data={item} index={index} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 70,
    padding: 20,
  },
});

export default inject('sets', 'items')(observer(Home));
