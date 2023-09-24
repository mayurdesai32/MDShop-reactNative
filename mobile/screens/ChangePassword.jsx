import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  colors,
  defaultStyle,
  inputStyle,
  formStyles,
  inputOptions,
} from '../styles/style';
import { TextInput, Button } from 'react-native-paper';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const loading = false;
  const submitHandler = () => {
    alert('password change');
  };
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        <Header back={true} />
        <View style={{ marginTop: 80, marginBottom: 20 }}>
          <Text style={formStyles.heading}>Change Password</Text>
        </View>
        <View style={formStyles.container}>
          <TextInput
            {...inputOptions}
            placeholder='Old Password'
            secureTextEntry={true}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            {...inputOptions}
            placeholder='New Password'
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('forgotpassword')}
          >
            <Text style={formStyles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            loading={loading} // for throding
            textColor={colors.color2}
            disabled={oldPassword === '' || newPassword === ''}
            style={formStyles.btn}
            onPress={submitHandler}
          >
            Change Password
          </Button>
        </View>
      </View>
    </>
  );
};

export default ChangePassword;
