import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
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
import Header from '../components/Header';

const UpdateProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');

  const loading = false;
  const submitHandler = () => {
    alert('profile updated');
  };

  const disableBtn =
    !name || !email || !address || !city || !country || !pinCode;
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        <Header back={true} />
        <View style={{ marginTop: 80, marginBottom: 20 }}>
          <Text style={formStyles.heading}>Edit Profile</Text>
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
          <View>
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
              Update
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default UpdateProfile;
