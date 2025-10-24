import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type MusicScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MusicDetail'
>;

export default function MusicScreen() {
  const navigation = useNavigation<MusicScreenNavigationProp>();
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = 'https://openwhyd.org/hot/electro?format=json';
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const result = await response.json();

        // 🔧 kadang result.contents diawali teks aneh, kita bersihkan dulu
        const clean = result.contents.replace(/^[^{\[]+/, '');
        const data = JSON.parse(clean);

        if (Array.isArray(data)) {
          setSongs(data);
        } else if (Array.isArray(data.tracks)) {
          setSongs(data.tracks);
        } else {
          setSongs([]);
        }
      } catch (err) {
        console.error('Error fetching music:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading music...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {songs.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>
          Tidak ada data musik 😢
        </Text>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('MusicDetail', { song: item })
              }
            >
              <Image
                source={{
                  uri: item.img || 'https://via.placeholder.com/100',
                }}
                style={styles.cover}
              />
              <View style={styles.info}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.name || 'Unknown title'}
                </Text>
                <Text style={styles.artist}>
                  {item.uNm || 'Unknown artist'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 8,
    elevation: 2,
  },
  cover: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  artist: { color: '#666', marginTop: 3 },
  separator: { height: 8 },
});
