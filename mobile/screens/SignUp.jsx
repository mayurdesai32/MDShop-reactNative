import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  colors,
  defaultStyle,
  inputStyle,
  formStyles,
  inputOptions,
  defaultImg,
} from '../styles/style';
import { TextInput, Button, Avatar } from 'react-native-paper';
import Footer from '../components/Footer';
import mime from 'mime';
import { useDispatch } from 'react-redux';
import { register } from '../stateManagement/actions/userAction';
import { useUserMessageAndError } from '../utils/customhook';

const SignUp = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');
  const dispatch = useDispatch();

  const loading = useUserMessageAndError(navigation, dispatch, 'profile');

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('address', address);
    myForm.append('city', city);
    myForm.append('pinCode', pinCode);
    myForm.append('country', country);

    if (avatar !== '') {
      myForm.append('file', {
        uri: avatar,
        type: mime.getType(avatar),
        name: avatar.split('/').pop(),
      });
    }
    dispatch(register(myForm));
  };
  const disableBtn =
    !name || !email || !password || !address || !city || !country || !pinCode;

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
    }
  }, [route.params]);
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={formStyles.heading}>Sign Up</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <View style={{ minHeight: 900 }}>
            <Avatar.Image
              style={{ alignSelf: 'center', backgroundColor: colors.color1 }}
              size={80}
              source={{ uri: avatar ? avatar : defaultImg }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('camera')}>
              <Button textColor={colors.color1}>Change Photo</Button>
            </TouchableOpacity>

            <TextInput
              {...inputOptions}
              placeholder='Name'
              value={name}
              onChangeText={setName}
            />

            <TextInput
              {...inputOptions}
              placeholder='Email'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              {...inputOptions}
              placeholder='Password'
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              {...inputOptions}
              placeholder='Address'
              value={address}
              onChangeText={setAddress}
            />

            <TextInput
              {...inputOptions}
              placeholder='City'
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              {...inputOptions}
              placeholder='Country'
              value={country}
              onChangeText={setCountry}
            />

            <TextInput
              {...inputOptions}
              placeholder='Pin Code'
              value={pinCode}
              keyboardType='number-pad'
              onChangeText={setPinCode}
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
              disabled={disableBtn}
              style={formStyles.btn}
              onPress={submitHandler}
            >
              Sign UP
            </Button>
            <Text style={formStyles.or}>OR</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('signup')}
            >
              <Text style={formStyles.link}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Footer activeRoute='profile' />
    </>
  );
};

export default SignUp;
