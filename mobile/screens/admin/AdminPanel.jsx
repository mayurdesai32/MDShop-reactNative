import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { colors, defaultStyle, formStyles } from '../../styles/style';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
import { products } from '../Home';
import ProductListItem from './ProductListItem';
import Chart from '../../components/Chart';

const loading = false;

const deleteProductHandler = (id) => {
  console.log('product deleted');
};
const AdminPanel = ({ navigation }) => {
  const navigationHandler = (text) => {
    switch (text) {
      case 'Category':
        navigation.navigate('categories');
        break;
      case 'All Orders':
        navigation.navigate('adminorders');
        break;
      case 'Product':
        navigation.navigate('newproduct');
        break;
      default:
        navigation.navigate('adminorders');
        break;
    }
  };
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ marginTop: 80, marginBottom: 20 }}>
        <Text style={formStyles.heading}>Admin Panel</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: 'center',
            }}
          >
            <Chart inStock={12} outOfStock={2} />
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
                icon={'plus'}
                text={'Product'}
                handler={navigationHandler}
              />
              <ButtonBox
                icon={'format-list-bulleted-square'}
                text={'All Orders'}
                handler={navigationHandler}
                reverse={true}
              />
              <ButtonBox
                icon={'plus'}
                text={'Category'}
                handler={navigationHandler}
              />
            </View>
          </View>
          <ProductListHeading />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {products.map((item, index) => (
                <ProductListItem
                  deleteHandler={deleteProductHandler}
                  navigate={navigation}
                  key={item._id}
                  index={index}
                  id={item._id}
                  price={item.price}
                  stock={item.stock}
                  name={item.name}
                  category={item.category}
                  imgSrc={item.images[0].url}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;
