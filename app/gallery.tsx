import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

interface ImageAsset {
  id: string;
  uri: string;
}

export default function GalleryScreen() {
  const [images, setImages] = useState<ImageAsset[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          sortBy: [['creationTime', false]],
        });
        setImages(media.assets);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: 110, height: 110, margin: 5, borderRadius: 10 },
});
