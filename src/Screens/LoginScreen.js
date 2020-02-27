import React, {Component} from 'react';
// Components
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import Style from '../helpers/style/style';
import FormField from '../components/FormField';
import Btn from '../components/Btn';
import Routes from '../Routes/Routes';
import {login, autoLogin} from '../store/auth/authActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HandleError from '../components/HandleError';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
    };
  }

  validForm() {
    let errors = [];
    if (this.state.email == '' || this.state.password == '') {
      errors.push('All fields required.');
    }
    if (this.state.email.search('@') == -1) {
      errors.push('Email not valid.');
    }
    return errors;
  }

  onLogin() {
    let valid = this.validForm();
    if (valid.length > 0) {
      this.setState({errors: valid});
    } else {
      this.props.login(this.state.email, this.state.password);
    }
  }

  async componentDidMount() {
    let loginData = JSON.parse(await AsyncStorage.getItem('auth'));
    if (loginData) {
      this.props.autoLogin(loginData);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.auth.fetching &&
      this.props.auth.fetched &&
      this.props.auth.userLogin.user_id
    ) {
      if (!this.props.auth.auto) {
        await AsyncStorage.setItem(
          'auth',
          JSON.stringify(this.props.auth.userLogin),
        );
      }
      this.props.navigation.navigate(Routes.Navigators.TABS.routeName);
    }
    if (prevProps.auth.fetching && this.props.auth.error) {
      this.setState({errors: [this.props.auth.error.msg]});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>MOONSITE</Text>
        <View style={styles.form}>
          <HandleError errors={this.state.errors} />
          <FormField
            placeholder={'email'}
            onChange={email => this.setState({email: email})}
          />

          <FormField
            type={'password'}
            placeholder={'password'}
            onChange={password => this.setState({password: password})}
          />
        </View>
        <Btn value={'Login'} press={this.onLogin.bind(this)} />
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate(Routes.Screens.REGISTER.routeName)
          }>
          <Text style={{color: 'gray', fontSize: 12}}>Create New User</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
    alignItems: 'center',
  },
  appName: {
    fontSize: 60,
    color: 'gray',
    padding: 20,
    letterSpacing: 2,
  },
  form: {
    width: Dimensions.get('window').width * 0.8,
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      autoLogin,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
