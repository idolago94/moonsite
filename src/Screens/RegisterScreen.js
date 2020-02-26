import React, {Component} from 'react';
// Navigation
// Components
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import FormField from '../components/FormField';
import Btn from '../components/Btn';
import Style from '../helpers/style/style';
import Routes from '../Routes/Routes';
import {bindActionCreators} from 'redux';
import {register} from '../store/auth/authActions';
import {connect} from 'react-redux';
import HandleError from '../components/HandleError';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
    };
  }

  onRegister() {
    let valid = this.validForm();
    if (valid.length > 0) {
      this.setState({errors: valid});
    } else {
      this.props.register(this.state.email, this.state.password);
    }
  }

  validForm() {
    let errors = [];
    if (
      this.state.email == '' ||
      this.state.password == '' ||
      this.state.confirmPassword == ''
    ) {
      errors.push('All fields required.');
    }
    if (this.state.email.search('@') == -1) {
      errors.push('Email not valid.');
    }
    if (this.state.password != this.state.confirmPassword) {
      errors.push('Your password not match.');
    }
    return errors;
  }

  async componentDidUpdate() {
    if (this.props.auth.fetched && this.props.auth.userLogin.user_id) {
      await AsyncStorage.setItem(
        'auth',
        JSON.stringify(this.props.auth.userLogin),
      );
      this.props.navigation.navigate(Routes.Navigators.TABS.routeName);
    }
    if (this.props.auth.error) {
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
            confirm={confirmPassword =>
              this.setState({confirmPassword: confirmPassword})
            }
            onChange={password => this.setState({password: password})}
          />
        </View>
        <Btn value={'Register'} press={this.onRegister.bind(this)} />
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate(Routes.Screens.LOGIN.routeName)
          }>
          <Text style={{color: 'gray', fontSize: 12}}>
            Login To Existing User
          </Text>
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
      register,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen);
