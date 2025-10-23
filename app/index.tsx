import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { RootStackParamList } from './_layout';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      navigation.navigate('Editor', { uri });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />
      <Button title="Xem ảnh đã chỉnh sửa" onPress={() => navigation.navigate('Gallery')} />
      {image && <Image source={{ uri: image }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  preview: { width: 200, height: 200, marginTop: 20, borderRadius: 10 },
});
