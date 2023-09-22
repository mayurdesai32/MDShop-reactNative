import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
const Stack = createNativeStackNavigator();
import Toast from 'react-native-toast-message';
import Cart from './screens/Cart';
import ConfirmOrder from './screens/ConfirmOrder';
import Payment from './screens/Payment';
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='home'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name='productdetails' component={ProductDetails} />
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='cart' component={Cart} />
          <Stack.Screen name='confirmorder' component={ConfirmOrder} />
          <Stack.Screen name='payment' component={Payment} />
        </Stack.Group>
      </Stack.Navigator>
      <Toast position='top' />
    </NavigationContainer>
    // <View
    //   style={{
    //     paddingVertical:
    //       Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //   }}
    // >
    //   <SafeAreaView>
    //     <Text>Main</Text>
    //   </SafeAreaView>
    // </View>
  );
};

export default Main;
