import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  Alert,
  useColorScheme,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ItalyScreen from './screens/ItalyScreen';
import LithuaniaScreen from './screens/LithuaniaScreen';
import FirstScreen from './screens/FirstScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import RecentScreen from './screens/RecentScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import WordsContextProvider from './store/words-context';
import ManageScreen from './screens/ManageScreen';
import { Event } from 'ionicons/dist/types/stencil-public-runtime';
import { EventRegister } from 'react-native-event-listeners';
import { StatusBar } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FavLtScreen from './screens/FavLtScreen';
import FavItScreen from './screens/FavItScreen';

const firstPage = 'Home';
const ItalyPage = 'Italy';
const LithuaniaPage = 'Lithuania';
const FavoritesPage = 'Favorites';
const RecentPage = 'Recent';

export type RootStackParamList = {
  Home: undefined;
  ManageScreen: { wordId: number };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function WordsOverview() {
  return (
    <Tab.Navigator
      initialRouteName={firstPage}
      // screenOptions={({ route, navigation }) => ({})}
    >
      <Tab.Screen
        name={firstPage}
        component={FirstScreen}
        options={{
          title: 'Home Page',
          tabBarIcon: () => (
            <View>
              <Image source={require('./assets/icons8-home-38.png')} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ItalyPage}
        component={ItalyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/icons8-italy-48.png')} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={LithuaniaPage}
        component={LithuaniaScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/icons8-lithuania-48.png')} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={RecentPage}
        component={RecentScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <Image source={require('./assets/icons8-most-recent-35.png')} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={FavoritesPage}
        component={FavoriteScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <Image source={require('./assets/icons8-star-38.png')} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [darkApp, setDarkApp] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeThemeEvent',
      (data) => {
        setDarkApp(data);
      }
    );
    return () => {
      EventRegister.removeEventListener('changeThemeEvent');
    };
  }, []);

  const appTheme = darkApp ? DarkTheme : DefaultTheme;
  return (
    <WordsContextProvider>
      {darkApp ? (
        <StatusBar style='light' translucent />
      ) : (
        <StatusBar translucent />
      )}
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        >
          <Stack.Screen
            name='WordsOverview'
            component={WordsOverview}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: 'red' },
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='ManageScreen'
            component={ManageScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen name='FavLtScreen' component={FavLtScreen} />
          <Stack.Screen name='FavItScreen' component={FavItScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WordsContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    color: 'white',
  },
});
