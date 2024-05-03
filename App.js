import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'; 
import "firebase/auth";
import Bottnav from './scr/Navigations/BottomNav';
import Detailscr from './screen_dosen/detail';
import Bottnavstd from './scr/Navigations/BottomNavstd';
import LoginScreentes from './logintes';
import AdminRegistrationScreen from './regisadmin';
import Benfica from './screen_chat/chat';
import Manutd from './screen_chat/chats';
import Donasi from './screen_chat/contact';
import Chat_std from './screen_chatstd/chats_std';
import Chatstudent from './screen_chatstd/chatstd';
import Detailstd from './screen_std/detailstd';
import Userscreen from './screen_dosen/profilescreen';
import EditProfileScreen from './updateprofile';
import Favoritescreenstd from './screen_std/favoritescreenstd';
import ChangePasswordScreen from './changepass';
import adminhome from './screen_admin/adminhome';
import Uploadscreen from './screen_dosen/uploadscreen';
import ImageViewScreen from './imagerinci';
import EditScreen from './editing';
import Profilevisit from './profilevisit';
import Reviewstd from './screen_std/review';
import Reviewdosen from './reviewdosen';
import Studentscreenprofile from './profilevisit';
import Addstar from './addstart';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true}/>
          <Stack.Navigator initialRouteName="reminder" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="reminder" component={LoginScreentes}/>
            <Stack.Screen name="bawahstd" component={Bottnavstd}/>
            <Stack.Screen name="bawah" component={Bottnav}/>
            <Stack.Screen name="rinci" component={Detailscr}/>
            <Stack.Screen name="ass" component={AdminRegistrationScreen}/>
            <Stack.Screen name="bayern" component={Benfica}/>
            <Stack.Screen name="ryzen" component={Donasi}/>
            <Stack.Screen name="merah" component={Manutd}/>
            <Stack.Screen name="biru" component={Chat_std}/>
            <Stack.Screen name="studentpunya" component={Chatstudent}/>
            <Stack.Screen name="rincistd" component={Detailstd}/>
            <Stack.Screen name="profil" component={Userscreen}/>
            <Stack.Screen name="updating" component={EditProfileScreen}/>
            <Stack.Screen name="like" component={Favoritescreenstd}/>
            <Stack.Screen name="gantipass" component={ChangePasswordScreen}/>
            <Stack.Screen name="adminpunya" component={adminhome}/>
            <Stack.Screen name="postingan" component={Uploadscreen}/>
            <Stack.Screen name="ImageView" component={ImageViewScreen}/>
            <Stack.Screen name="milo" component={EditScreen}/>
            <Stack.Screen name="student" component={Studentscreenprofile}/>
            <Stack.Screen name="visitor" component={Profilevisit}/>
            <Stack.Screen name="reviewaja" component={Reviewstd}/>
            <Stack.Screen name="compare" component={Reviewdosen}/>
            <Stack.Screen name="bintang" component={Addstar}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider> 
  );
}

export default App;
