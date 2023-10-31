import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { defaultStyle, colors } from '../styles/style';
import { Avatar, Button } from 'react-native-paper';
import Header from '../components/Header';
import { useState } from 'react';
import SearchModel from '../components/SearchModel';
import ProductCard from '../components/ProductCard';
import { useIsFocused } from '@react-navigation/native';
import Footer from '../components/Footer';
import Heading from '../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../stateManagement/actions/productAction';
import { useSetCategory } from '../utils/customhook';
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoryButtonHandler = (_id) => {
    setCategory(_id);
  };
  const { loading, products } = useSelector((state) => state.product);

  const addToCardHandler = (id, name, price, image, stock) => {
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'out Of Stock',
      });
    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });
    Toast.show({
      type: 'success',
      text1: 'Added To Cart',
    });
  };

  useSetCategory(setCategories, isFocused);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProduct(searchQuery, category));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  return products && products.length === 0 ? (
    <Loader />
  ) : (
    <>
      {activeSearch && (
        <SearchModel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={defaultStyle}>
        <Header />
        <View
          style={{
            paddingTop: 90,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Heading text1='Our' text2='Products' />

          <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
            <Avatar.Icon
              icon={'magnify'}
              size={50}
              style={{ backgroundColor: colors.color2, elevation: 12 }}
              color={'gray'}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', height: 80 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color2 : 'gray',
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                image={item.images[0]?.url}
                price={item.price}
                addToCardHandler={addToCardHandler}
                id={item._id}
                key={item._id}
                i={index}
                Navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Footer activeRoute={'home'} />
    </>
  );
};

export default Home;
