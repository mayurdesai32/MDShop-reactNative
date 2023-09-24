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
import ForgotPassword from './screens/ForgotPassword';
import Verify from './screens/Verify';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import UpdateProfile from './screens/UpdateProfile';
import ChangePassword from './screens/ChangePassword';
import Orders from './screens/Orders';
import AdminPanel from './screens/admin/AdminPanel';
import Categories from './screens/admin/Categories';
import AdminOrders from './screens/admin/AdminOrders';
import UpdateProduct from './screens/admin/UpdateProduct';
import NewProduct from './screens/admin/NewProduct';
import ProductImages from './screens/admin/ProductImages';
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
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='forgotpassword' component={ForgotPassword} />
          <Stack.Screen name='verify' component={Verify} />
          <Stack.Screen name='signup' component={SignUp} />
          <Stack.Screen name='profile' component={Profile} />
          <Stack.Screen name='updateprofile' component={UpdateProfile} />
          <Stack.Screen name='changepassword' component={ChangePassword} />
          <Stack.Screen name='orders' component={Orders} />
          {/* admin  */}
          <Stack.Screen name='adminpanel' component={AdminPanel} />
          <Stack.Screen name='categories' component={Categories} />
          <Stack.Screen name='adminorders' component={AdminOrders} />
          <Stack.Screen name='updateproduct' component={UpdateProduct} />
          <Stack.Screen name='newproduct' component={NewProduct} />
          <Stack.Screen name='productimages' component={ProductImages} />
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
