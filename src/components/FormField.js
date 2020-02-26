import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Style from '../helpers/style/style';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FormField(props) {
  const [securePassword, setSecure] = useState(true);

  if (props.type == 'password') {
    return (
      <View>
        <View style={styles.field}>
          <TextInput
            secureTextEntry={securePassword}
            onChangeText={value => props.onChange(value)}
            placeholderTextColor={Style.colors.text}
            style={styles.input}
            placeholder={props.placeholder}
          />
          <TouchableHighlight
            onPress={() => setSecure(!securePassword)}>
            <Icon
              name={securePassword ? 'eye-slash' : 'eye'}
              size={15}
              color={Style.colors.text}
            />
          </TouchableHighlight>
        </View>
        {!props.confirm ? null : (
          <View style={styles.field}>
            <TextInput
              secureTextEntry={securePassword}
              onChangeText={confirmPassword => props.confirm(confirmPassword)}
              placeholderTextColor={Style.colors.text}
              style={styles.input}
              placeholder="Password Confirm"
            />
          </View>
        )}
      </View>
    );
  }
  return (
    <View style={styles.field}>
      <TextInput
        onChangeText={value => props.onChange(value)}
        placeholderTextColor={Style.colors.text}
        style={styles.input}
        placeholder={props.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
    backgroundColor: Style.colors.formField,
    marginVertical: 10,
    borderRadius: Style.sizes.border_radius,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    color: Style.colors.text,
    flexGrow: 1,
  },
});
