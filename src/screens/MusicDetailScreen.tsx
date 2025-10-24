import React from 'react';
import { Song } from '../api/data'; 
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';


const MusicDetailScreen = ({ route }: any) => {
  const { song } = route.params;

  const extractYouTubeId = (eId: string) => {
    if (!eId) return null;
    const parts = eId.split('/');
    return parts.length > 2 ? parts[2] : null;
  };

  const videoId = extractYouTubeId(song.eId);

  return (
    <ScrollView style={styles.container}>
      {song.img && <Image source={{ uri: song.img }} style={styles.image} />}
      <Text style={styles.title}>{song.name}</Text>
      <Text style={styles.artist}>Artist: {song.uNm}</Text>

      {videoId ? (
        <View style={styles.playerContainer}>
          <YoutubePlayer height={220} play={false} videoId={videoId} />
        </View>
      ) : (
        <Text style={{ color: '#888', marginTop: 10 }}>🎧 No playable source</Text>
      )}

      {/* Card Song Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoHeader}>Song Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Title:</Text>
          <Text style={styles.infoValue}>{song.name || 'Unknown'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Artist:</Text>
          <Text style={styles.infoValue}>{song.uNm || 'Unknown'}</Text>
        </View>
        {song.playlist && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Playlist:</Text>
            <Text style={styles.infoValue}>{song.playlist}</Text>
          </View>
        )}
        {song.score !== undefined && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Score:</Text>
            <Text style={styles.infoValue}>{song.score}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MusicDetailScreen;

const SongInfoCard = ({ song }: { song: Song }) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoHeader}>Song Information</Text>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Title:</Text>
      <Text style={styles.infoValue}>{song.title || 'Unknown'}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Artist:</Text>
      <Text style={styles.infoValue}>{song.artist || 'Unknown'}</Text>
    </View>
    {song.playlist && (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Playlist:</Text>
        <Text style={styles.infoValue}>{song.playlist}</Text>
      </View>
    )}
    {song.score && (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Score:</Text>
        <Text style={styles.infoValue}>{song.score}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  artist: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 16 },
  playerContainer: { width: '100%', marginBottom: 20 },
  infoCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  infoHeader: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  infoRow: { flexDirection: 'row', marginBottom: 6 },
  infoLabel: { fontWeight: '600', width: 80 },
  infoValue: { flex: 1, color: '#444' },
});