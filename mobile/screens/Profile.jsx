import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { formStyles, defaultStyle, colors } from '../styles/style';
import { Avatar, Button } from 'react-native-paper';
import ButtonBox from '../components/ButtonBox';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
const user = { name: 'Mayur', email: 'msdesai32@gmail.com' };
const loading = false;
const Profile = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const logoutHandler = () => {
    console.log('Sign Out');
  };
  const navigateHandler = (text) => {
    console.log(text);
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
                <Button textColor={colors.color1}>Change Photo</Button>
              </TouchableOpacity>
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={{ fontWeight: '300', color: colors.color2 }}>
                {user?.email}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent: 'space-between',
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={'Orders'}
                  icon={'format-list-bulleted-square'}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={'Admin'}
                  icon={'view-dashboard'}
                  reverse={true}
                />
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
