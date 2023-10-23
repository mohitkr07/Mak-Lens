import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, ScrollView, Text} from 'react-native';
import ImgCard from './cards/ImgCard';

import axios from 'axios';

const Feed = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    FetchData(page);
  }, [page]);
  

  const FetchData = async currPage => {
    try {
      const url = `https://api.unsplash.com/photos?page=${currPage}&client_id=56AdQzhmUDi3e4eJXdfKEUUfmW9lSpYzAampuJy0mRs`;

      const response = await axios.get(url);

      if (response.status === 200) {
        const resData = response.data;
        
        setData(resData);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleLoadMore = () => {
    console.log('load more clicked');
    setPage(page + 1);
  };
  const handlePrev = () => {
    console.log('load more clicked');
    setPage(page - 1);
  };

  return (
    <ScrollView>
      {data && (
        <View style={feedStyles.container}>
          {data.map((item, index) => {
            return <ImgCard key={index} URL={item.urls.regular} download={item.urls.full} name={item.slug} />;
          })}
        </View>
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {page > 1 && (
          <TouchableOpacity
            onPress={handlePrev}
            style={feedStyles.loadButton}>
            <Text style={{color: '#fff'}}>Prev</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleLoadMore}
          style={feedStyles.loadButton}>
          <Text style={{color: '#fff'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const feedStyles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  loadButton: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: 'center',
    // width: '85%',
    height: 50,
    width: 100,
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Feed;