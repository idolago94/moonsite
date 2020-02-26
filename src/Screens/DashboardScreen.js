import React, {Component} from 'react';
// Components
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import database from '../database';
import Post from '../components/Post';
import Style from '../helpers/style/style';
import {bindActionCreators} from 'redux';
import {getFollowing} from '../store/following/followingActions';
import {getFollowers} from '../store/followers/followersActions';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount(): void {
    console.log('Dashboard Screen');
    fetch(`${database.url}/post/get-all-posts`, {
      headers: {
        Authorization: this.props.userLogin.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        this.setState({posts: response.data});
        this.props.getFollowing(this.props.userLogin.token);
        this.props.getFollowers(this.props.userLogin.token);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (!this.props.following.fetched && !this.props.following.users) {
      return null;
    }
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.post_id}
          data={this.state.posts}
          renderItem={({item}) => (
            <Post
              data={item}
              follow={this.props.following.users.find(
                user => user.f_user_id == item.user_id,
              )}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
  },
});

const mapStateToProps = state => {
  return {
    userLogin: state.auth.userLogin,
    following: state.following,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFollowing,
      getFollowers,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardScreen);
