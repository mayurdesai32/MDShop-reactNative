import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { formStyles, defaultStyle, colors, defaultImg } from '../styles/style';
import { Avatar, Button } from 'react-native-paper';
import ButtonBox from '../components/ButtonBox';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { loadUser, logout } from '../stateManagement/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  useOtherMessageAndError,
  useUserMessageAndError,
} from '../utils/customhook';
import { useIsFocused } from '@react-navigation/native';
import mime from 'mime';
import { updatePic } from '../stateManagement/actions/otherAction';
// const user = { name: 'Mayur', email: 'msdesai32@gmail.com' };

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(defaultImg);

  const loading = useUserMessageAndError(navigation, dispatch, 'login');
  const loadingPic = useOtherMessageAndError(null, dispatch, null, loadUser);
  const logoutHandler = () => {
    dispatch(logout());
  };
  const navigateHandler = (text) => {
    switch (text) {
      case 'Admin':
        navigation.navigate('adminpanel');
        break;
      case 'Orders':
        navigation.navigate('orders');
        break;
      case 'Profile':
        navigation.navigate('updateprofile');
        break;
      case 'Password':
        navigation.navigate('changepassword');
        break;
      case 'Sign Out':
        logoutHandler();
        break;
      default:
      case 'Orders':
        navigation.navigate('orders');
        break;
    }
  };
  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
      const myForm = new FormData();

      myForm.append('file', {
        uri: route.params?.image,
        type: mime.getType(route.params?.image),
        name: route.params?.image.split('/').pop(),
      });

      dispatch(updatePic(myForm));
    }
    dispatch(loadUser());
  }, [route.params, dispatch, isFocused]);
  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar.url);
    }
  }, [user]);
  return (
    <>
      <View style={{ ...defaultStyle }}>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={formStyles.heading}>Profile</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                source={{ uri: avatar }}
                size={100}
                style={{ backgroundColor: colors.color1 }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('camera', { updateProfile: true })
                }
              >
                <Button
                  textColor={colors.color1}
                  labelStyle={{ fontSize: 17, fontWeight: '600' }}
                  style={{
                    marginTop: 10,
                    marginBottom: -10,
                  }}
                  disabled={loadingPic}
                  loading={loadingPic}
                >
                  Change Photo
                </Button>
              </TouchableOpacity>
              <Text style={{ ...styles.name, fontWeight: '600', fontSize: 20 }}>
                {user?.name}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  color: colors.color2,
                  fontSize: 17,
                }}
              >
                {user?.email}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent:
                    user?.role === 'admin' ? 'space-between' : 'space-evenly',
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={'Orders'}
                  icon={'format-list-bulleted-square'}
                />
                {user?.role === 'admin' && (
                  <ButtonBox
                    handler={navigateHandler}
                    text={'Admin'}
                    icon={'view-dashboard'}
                    reverse={true}
                  />
                )}
                <ButtonBox
                  handler={navigateHandler}
                  text={'Profile'}
                  icon={'pencil'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent: 'space-evenly',
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={'Password'}
                  icon={'pencil'}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={'Sign Out'}
                  icon={'exit-to-app'}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <Footer activeRoute={'profile'} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    color: colors.color2,
  },
});
export default Profile;
