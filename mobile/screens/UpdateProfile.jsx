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
  formStyles,
  inputOptions,
} from '../styles/style';
import { TextInput, Button, Avatar } from 'react-native-paper';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../stateManagement/actions/otherAction';
import { useOtherMessageAndError } from '../utils/customhook';

const UpdateProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());
  const dispatch = useDispatch();
  const loading = useOtherMessageAndError(navigation, dispatch, 'profile');
  const submitHandler = () => {
    dispatch(updateProfile(name, email, address, city, country, pinCode));
  };

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
