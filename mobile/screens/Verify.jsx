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
import { useOtherMessageAndError } from '../utils/customhook';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../stateManagement/actions/otherAction';

const Verify = ({ navigation }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const loading = useOtherMessageAndError(navigation, dispatch, 'login');

  const submitHandler = () => {
    dispatch(resetPassword(otp, password));
  };
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={formStyles.heading}>Reset Password</Text>
        </View>
        <View style={formStyles.container}>
          <TextInput
            {...inputOptions}
            placeholder='OTP'
            keyboardType='number-pad'
            value={otp}
            onChangeText={setOtp}
          />

          <TextInput
            {...inputOptions}
            placeholder='New Password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Button
            loading={loading} // for throding
            textColor={colors.color2}
            disabled={otp === '' || password === ''}
            style={formStyles.btn}
            onPress={submitHandler}
          >
            Reset
          </Button>
          <Text style={formStyles.or}>OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('forgotpassword')}
          >
            <Text style={formStyles.link}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer activeRoute='profile' />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: colors.color3,
    elevation: 10,
  },
  forgotText: {
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'flex-end',
    fontWeight: '100',
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
  },

  or: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '100',
    color: colors.color2,
  },
  link: {
    alignSelf: 'center',
    color: colors.color2,
    fontSize: 18,
    textTransform: 'uppercase',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default Verify;
