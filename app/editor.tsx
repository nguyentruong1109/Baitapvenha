import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';
import { RootStackParamList } from './_layout';

type EditorRouteProp = RouteProp<RootStackParamList, 'Editor'>;
type EditorNavProp = NativeStackNavigationProp<RootStackParamList, 'Editor'>;

export default function EditorScreen() {
  const route = useRoute<EditorRouteProp>();
  const navigation = useNavigation<EditorNavProp>();
  const { uri } = route.params;
  const [editedUri, setEditedUri] = useState(uri);

  const rotateImage = async () => {
    const result = await ImageManipulator.manipulateAsync(editedUri, [{ rotate: 90 }]);
    setEditedUri(result.uri);
  };

  const saveImage = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync(true);
    if (status !== 'granted') {
      Alert.alert('Lỗi', 'Không có quyền lưu ảnh.');
      return;
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(editedUri);
      await MediaLibrary.createAlbumAsync('MyAppImages', asset, false);
      Alert.alert('Thành công', 'Ảnh đã được lưu vào album MyAppImages!');
      navigation.navigate('Gallery');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Lỗi', 'Không thể lưu ảnh: ' + error.message);
      } else {
        Alert.alert('Lỗi', 'Không thể lưu ảnh');
      }
  };
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: editedUri }} style={styles.image} />
      <View style={styles.buttonRow}>
        <Button title="Xoay ảnh" onPress={rotateImage} />
        <Button title="Lưu ảnh" onPress={saveImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 300, height: 300, borderRadius: 10 },
  buttonRow: { flexDirection: 'row', marginTop: 20, gap: 10 },
});
