import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { photoDatabase } from '../../services/database';
import { Photo } from '../../services/photo';

export default function PhotoDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (id) {
      const all = photoDatabase.getAllPhotos();
      const found = all.find(p => p.id.toString() === id);
      if (found) setPhoto(found);
    }
  }, [id]);

  if (!photo) return <View style={styles.center}><Text>Chargement...</Text></View>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
      
      <Image source={{ uri: photo.uri }} style={styles.fullImage} resizeMode="contain" />
      
      <View style={styles.infoBox}>
        <Text style={styles.title}>Souvenir du {photo.takenAt}</Text>
        <Text style={styles.coords}>📍 Latitude: {photo.latitude.toFixed(4)}</Text>
        <Text style={styles.coords}>📍 Longitude: {photo.longitude.toFixed(4)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  back: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 25 },
  fullImage: { flex: 1 },
  infoBox: { backgroundColor: '#FFF', padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  coords: { fontSize: 16, color: '#666', marginBottom: 5 }
});