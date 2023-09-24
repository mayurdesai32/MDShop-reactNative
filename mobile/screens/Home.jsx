import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { defaultStyle, colors } from '../styles/style';
import { Avatar, Button } from 'react-native-paper';
import Header from '../components/Header';
import { useState } from 'react';
import SearchModel from '../components/SearchModel';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import Heading from '../components/Heading';

const categories = [
  { category: 'nice1', _id: '1fdfdss' },
  { category: 'nice2', _id: '2fdfhgdss' },
  { category: 'nice3', _id: '3fdfhgdss' },
  { category: 'nice4', _id: '4fdfhdss' },
  { category: 'nice5', _id: '5fdfhgfdss' },
];

export const products = [
  {
    category: 'cothes',
    _id: '1ftrerggdfgdf',
    stock: 44,
    images: [
      {
        url: 'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
      },
    ],
    name: 'fbvcbcb',
    price: 545,
  },
  {
    category: 'cothes',
    _id: '121fggdfgdf',
    stock: 44,
    images: [
      {
        url: 'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
      },
    ],
    name: 'fbvcbcb',
    price: 545,
  },
  {
    category: 'cothes',
    _id: '111fgghghfgdfgdf',
    stock: 44,
    images: [
      {
        url: 'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
      },
    ],
    name: 'fbvcbcb',
    price: 545,
  },
  {
    category: 'cothes',
    _id: '1fggdfgdf',
    stock: 44,
    images: [
      {
        url: 'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
      },
    ],
    name: 'fbvcbcb',
    price: 545,
  },
  {
    category: 'cothes',
    _id: '2fggdfgdf',
    stock: 44,
    images: [
      {
        url: 'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
      },
    ],
    name: 'fbvcbcb',
    price: 545,
  },
  {
    category: 'cothes',
    _id: '3fggdfggfdgfgdf',
    stock: 44,
    images: [
      {
        url: 'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
      },
    ],
    name: 'fbvcbcb',
    price: 545,
  },
];
const Home = () => {
  const navigate = useNavigation();
  const [category, setCategory] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoryButtonHandler = (_id) => {
    setCategory(_id);
  };
  const addToCardHandler = () => {
    console.log('hello world');
  };
  // console.log(category);
  return (
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
                navigate={navigate}
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
