import React, { useEffect, useState } from 'react';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { FIREBASE_DB } from '../firebaseauth/firebaseConfig';
import { Button, Image, Text } from 'native-base';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

const Homescreenpunya = ({ id,title, deskripsi, address, enterDetail,uploaderUid, image}) => {
  

 
  return (
    <ListItem onPress={() => enterDetail(id, title, deskripsi, address, uploaderUid,  image)} bottomDivider>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
        }}
        alt="profile"
        w={24}
        h={24}
        resizeMode="cover"
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '900', fontSize: 25, color: 'black' }}>{title}</ListItem.Title>
        <ListItem.Subtitle style={{ fontWeight: '400', fontSize: 20, color: 'black' }}>Alamat: {address}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default Homescreenpunya;
