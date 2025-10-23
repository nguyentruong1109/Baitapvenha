import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EditorScreen from './editor';
import GalleryScreen from './gallery';
import HomeScreen from './index';

export type RootStackParamList = {
  Home: undefined;
  Editor: { uri: string };
  Gallery: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Chỉnh sửa hình ảnh' }} />
        <Stack.Screen name="Editor" component={EditorScreen} options={{ title: 'Trình chỉnh sửa' }} />
        <Stack.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Bộ sưu tập' }} />
      </Stack.Navigator>
  );
}
