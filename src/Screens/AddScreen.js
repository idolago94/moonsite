import React, {Component} from 'react';
// Navigation
// Components
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
    Alert
} from 'react-native';
import Style from '../helpers/style/style';
import ImagePicker from 'react-native-image-picker';
import Btn from '../components/Btn';
import database from '../database';
import FormField from '../components/FormField';
import {connect} from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import Routes from '../Routes/Routes';
var RNFS = require('react-native-fs');

class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSelected: undefined,
      title: '',
    };
  }

  lunchGallery() {
    ImagePicker.launchImageLibrary({}, imageSelected => {
      if (imageSelected.didCancel) {
        console.log('User cancelled image picker');
      } else if (imageSelected.error) {
        console.log('ImagePicker Error: ', imageSelected.error);
      } else {
        let imageUri = `data:${imageSelected.type};base64,${
          imageSelected.data
        }`;
        if (imageSelected.width > 400 || imageSelected.height > 400) {
          ImageResizer.createResizedImage(
            imageUri,
            imageSelected.width > 400 ? 400 : imageSelected.width,
            imageSelected.hegiht > 400 ? 400 : imageSelected.height,
            'JPEG',
            100,
          ).then(async response => {
            let data = await RNFS.readFile(response.uri, 'base64').then(res => {
              return res;
            });
            this.setState({imageSelected: `data:image/jpeg;base64,${data}`});
          });
        }
      }
    });
  }

  onUpload() {
    fetch(`${database.url}/post/add-post`, {
      method: 'POST',
      headers: {
        Authorization: this.props.userLogin.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        image_url: this.state.imageSelected,
      }),
    })
      .then(res => res.json())
      .then(response => {
        if (response.res) {
          Alert.alert('Image uploaded!');
          this.props.navigation.navigate(Routes.Screens.DASHBOARD.routeName);
        } else if (response.err) {
          Alert.alert(response.message);
        }
      }).catch((err) => {
        console.log(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{fontSize: 40, paddingVertical: 20, color: Style.colors.text}}>
          Add Post
        </Text>
        <TouchableHighlight
          onPress={this.lunchGallery.bind(this)}
          style={{margin: 50}}>
          <View>
            <Image
              source={
                this.state.imageSelected
                  ? {
                      uri: this.state.imageSelected,
                    }
                  : null
              }
              style={{
                width: Dimensions.get('window').width * 0.5,
                aspectRatio: 1,
                backgroundColor: 'gray',
                borderRadius: 10,
              }}
            />
            {!this.state.imageSelected ? (
              <View style={styles.placeholder}>
                <Text style={{color: Style.colors.background}}>
                  Press to upload image
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableHighlight>
        {this.state.imageSelected ? (
          <View style={styles.uploadForm}>
            <FormField
              placeholder={'Title'}
              onChange={title => this.setState({title: title})}
            />
            <Btn value={'UPLOAD'} press={() => this.onUpload()} />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Style.colors.background,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadForm: {
    width: Dimensions.get('window').width * 0.5,
  },
});

const mapStateToProps = state => {
  return {
    userLogin: state.auth.userLogin,
  };
};

export default connect(mapStateToProps)(AddScreen);
