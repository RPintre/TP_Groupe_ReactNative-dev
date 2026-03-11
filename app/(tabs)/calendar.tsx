import { CustomCalendar } from '@/components/CustomCalendar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');

  // Simulation des jours avec photos
  const markedDates = {
    '2026-03-11': { marked: true, dotColor: 'red' },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendrier des photos</Text>
      <CustomCalendar 
        markedDates={markedDates}
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
      />
      {selectedDate && <Text style={styles.info}>Date sélectionnée : {selectedDate}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  info: { marginTop: 10, textAlign: 'center', color: '#666' }
});