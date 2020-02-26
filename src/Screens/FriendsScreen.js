import React, {Component} from 'react';
// Navigation
// Components
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Style from '../helpers/style/style';
import {connect} from 'react-redux';

class FriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.users_container}>
          <View style={styles.following}>
            <Text style={styles.title}>
              Following
            </Text>
            {!this.props.following.users
              ? null
              : this.props.following.users.map(user => (
                  <Text style={styles.user}>{user.email}</Text>
                ))}
          </View>
          <View style={styles.followers}>
            <Text style={styles.title}>
              Followers
            </Text>
            {!this.props.followers.users
              ? null
              : this.props.followers.users.map(user => (
                  <Text style={styles.user}>{user.email}</Text>
                ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
      alignItems: 'center'
  },
  users_container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 5,
    color: Style.colors.text
  },
  user: {
    color: Style.colors.text
  }
});

const mapStateToProps = state => {
  return {
    following: state.following,
    followers: state.followers,
  };
};

export default connect(mapStateToProps)(FriendsScreen);
