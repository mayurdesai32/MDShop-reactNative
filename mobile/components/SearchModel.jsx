import {
  View,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/style';
import { Headline, Searchbar } from 'react-native-paper';
import { useEffect } from 'react';

const SearchModel = ({
  searchQuery,
  setSearchQuery,
  setActiveSearch,
  products,
}) => {
  const navigate = useNavigation();

  const backAction = () => {
    setSearchQuery('');
    setActiveSearch(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 35,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView>
        <Searchbar
          placeholder='Search...'
          onChangeText={(e) => setSearchQuery(e)}
          value={searchQuery}
          style={{
            marginTop: 20,
          }}
        />

        <ScrollView>
          <View style={{ paddingHorizontal: 40, paddingVertical: 10 }}>
            {products.map((item) => (
              <SearchItem
                key={item._id}
                imgSrc={item.images[0]?.url}
                name={item.name}
                price={item.price}
                handler={() =>
                  navigate.navigate('productdetails', { id: item._id })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const SearchItem = ({ imgSrc, name, price, handler }) => {
  console.log(imgSrc);
  return (
    <TouchableOpacity onPress={handler}>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.color2,
          elevation: 5,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginVertical: 30,
        }}
      >
        <Image
          source={{ uri: imgSrc }}
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            resizeMode: 'contain',
            // top: -15,
            left: 10,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <View style={{ width: '80%', paddingHorizontal: 30 }}>
          <Text numberOfLines={1}>{name}</Text>
          <Headline numberOfLines={1} style={{ fontWeight: '900' }}>
            ₹{price}
          </Headline>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchModel;
