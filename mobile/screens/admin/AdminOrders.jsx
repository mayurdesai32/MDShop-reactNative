import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { colors, defaultStyle, formStyles } from '../../styles/style';
import Header from '../../components/Header';
import { Headline } from 'react-native-paper';

import Loader from '../../components/Loader';

import OrderItem from '../../components/OrderItem';
import { useIsFocused } from '@react-navigation/native';
import { useGetOrders, useOtherMessageAndError } from '../../utils/customhook';
import { useDispatch } from 'react-redux';
import { processOrder } from '../../stateManagement/actions/otherAction';

const AdminOrders = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { loading, orders } = useGetOrders(isFocused, true);
  const processOrderLoading = useOtherMessageAndError(
    navigation,
    dispatch,
    'adminpanel'
  );
  const updateHandler = (id) => {
    dispatch(processOrder(id));
    console.log(id);
  };

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />
      <View style={{ marginTop: 80, marginBottom: 20 }}>
        <Text style={formStyles.heading}>All Orders</Text>
      </View>
      <Text>AdminOrders</Text>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ padding: 10, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  _id={item._id}
                  shippingInfo={item.shippingInfo}
                  createdAt={item.createdAt.split('T')[0]}
                  orderStatus={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  totalAmount={item.totalAmount}
                  index={index}
                  address={`${item.shippingInfo.address},${item.shippingInfo.city} ,${item.shippingInfo.country} ${item.shippingInfo.pincode}`}
                  admin={true}
                  loading={processOrderLoading}
                  updateHandler={updateHandler}
                />
              ))
            ) : (
              <Headline style={{ textAlign: 'center' }}>No Order Yet</Headline>
            )}
          </ScrollView>
          <Text>Orders</Text>
        </View>
      )}
    </View>
  );
};

export default AdminOrders;
