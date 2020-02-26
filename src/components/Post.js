import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Style from '../helpers/style/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '../database';
import {connect} from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  follow() {
    console.log(JSON.stringify({f_user_id: this.props.data.user_id}));
    fetch(`${database.url}/follower/add-follower`, {
      method: 'POST',
      headers: {
        Authorization: this.props.userLogin.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({f_user_id: this.props.data.user_id}),
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
    })
  }

  stopFollow() {}

  onDelete() {
    fetch(`${database.url}/post/delete-post-by-id/${this.props.data.post_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.props.userLogin.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        if (response.res) {
          Alert.alert('Post deleted!');
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{this.props.data.title}</Text>
          {!this.props.data.is_my_post ? (
            this.props.follow == -1 ? (
              <TouchableHighlight
                style={{padding: 5}}
                onPress={this.follow.bind(this)}>
                <Icon name={'podcast'} color={Style.colors.text} size={25} />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={{padding: 5}}
                onPress={this.follow.bind(this)}>
                <Icon
                  name={'podcast'}
                  color={Style.colors.lightMain}
                  size={25}
                />
              </TouchableHighlight>
            )
          ) : null}
        </View>
        <Image source={{uri: this.props.data.image_url}} style={styles.image} />
        <Text style={styles.created}>{this.props.data.created_at}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {this.props.data.is_my_post ? (
            <TouchableHighlight
              style={{padding: 5}}
              onPress={() => this.onDelete()}>
              <Icon name={'trash-alt'} color={Style.colors.text} size={20} />
            </TouchableHighlight>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Style.colors.text,
    marginVertical: 3,
  },
  image: {
    width: Dimensions.get('window').width,
    aspectRatio: 1,
  },
  title: {
    color: Style.colors.text,
    fontSize: 16,
    padding: 3,
    fontWeight: 'bold',
  },
  created: {
    color: 'gray',
    fontSize: 12,
  },
});

const mapStateToProps = state => {
  return {
    userLogin: state.auth.userLogin,
  };
};

export default connect(mapStateToProps)(Post);
