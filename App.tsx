import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './Home';
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      <View style={{flex: 1}}>
        <Home />
      </View>
    </SafeAreaProvider>
  );
}
