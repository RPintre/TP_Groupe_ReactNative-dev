<<<<<<< HEAD
﻿import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Tes composants et services (Vérifie bien les chemins)
import { CustomCalendar } from '../../components/CustomCalendar';
import { PhotoCard } from '../../components/PhotoCard';
import { photoDatabase } from '../../services/database';
import { Photo } from '../../services/photo';

export default function CalendarScreen() {
  const [selected, setSelected] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [marks, setMarks] = useState<Record<string, any>>({});
  const router = useRouter();

  // 1. Charger les dates marquées au focus 
  useEffect(() => {
    setMarks(photoDatabase.getMarkedDates());
  }, []);

  // 2. Action au clic sur un jour
  const onDayPress = (day: any) => {
    setSelected(day.dateString);
    setPhotos(photoDatabase.getPhotosByDate(day.dateString));
  };

  // 3. Calculer les marques avec useMemo 
  const calendarMarks = useMemo(() => ({
    ...marks,
    [selected]: { 
      ...(marks[selected] || {}), 
      selected: true, 
      selectedColor: '#007AFF' 
    }
  }), [marks, selected]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Calendrier stylisé dans une carte */}
      <View style={styles.calendarCard}>
        <CustomCalendar onDayPress={onDayPress} markedDates={calendarMarks} />
      </View>

      {/* Liste des souvenirs du jour */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>
          {selected ? `Photos du ${selected}` : "Choisissez une date"}
        </Text>

        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PhotoCard 
              item={item} 
              onPress={(p) => router.push({ pathname: '/photo-detail', params: { id: p.id } })} 
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            selected ? <Text style={styles.empty}>🏜️ Aucun souvenir enregistré.</Text> : null
          }
        />
      </View>
    </SafeAreaView>
=======
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="calendar" size={80} color="#007AFF" />
      <Text style={styles.title}>Calendrier</Text>
      <Text style={styles.subtitle}>Écran du calendrier</Text>
    </View>
>>>>>>> 9b56997c (fix: install navigation, and create tabs with expo-router and drawer for profil)
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  calendarCard: {
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: 20,
    paddingBottom: 10,
    elevation: 4, // Ombre Android
    shadowColor: '#000', // Ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  listContainer: { flex: 1, paddingHorizontal: 15, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1C1C1E' },
  empty: { textAlign: 'center', marginTop: 40, color: '#8E8E93' }
=======
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
>>>>>>> 9b56997c (fix: install navigation, and create tabs with expo-router and drawer for profil)
});
