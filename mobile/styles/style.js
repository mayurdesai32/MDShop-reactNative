import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

export const colors = {
  color1: '#c70049',
  color1_light: 'rgb(227,25,99)',
  color1_light2: 'rgba(197,0,73,0.8)',
  color2: 'white',
  color3: 'rgb(45,45,45)',
  color4: 'transparent',
  color5: '#f2f2f2',
  color6: '#f7f7f7',
};

export const defaultStyle = StyleSheet.create({
  paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  flex: 1,
  padding: 35,
  backgroundColor: colors.color2,
});

export const inputStyle = StyleSheet.create({
  height: 50,
  marginVertical: 10,
  marginHorizontal: 20,
  backgroundColor: colors.color2,
  paddingLeft: 10,
});

// export const formHeading = {
//   fontSize: 25,
//   fontWeight: '500',
//   textAlign: 'center',
//   backgroundColor: colors.color3,
//   color: colors.color2,
//   padding: 5,
//   borderRadius: 5,
// };

export const inputOptions = {
  // style: {
  //   height: 50,
  //   marginVertical: 10,
  //   marginHorizonal: 20,
  //   backgroundColor: colors.color2,
  // paddingLeft: 10
  // },
  style: inputStyle,
  mode: 'outlined',
  activeOutlineColor: colors.color1,
};
export const formStyles = StyleSheet.create({
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
    backgroundColor: colors.color3,
    borderRadius: 10,
    justifyContent: 'center',
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

export const defaultImg =
  'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png';
