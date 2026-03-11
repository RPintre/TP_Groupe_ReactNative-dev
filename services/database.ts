import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { Photo } from './photo';

const db = Platform.OS !== 'web' ? SQLite.openDatabaseSync('travel_journal.db') : null;

export const photoDatabase = {
  setup: () => {
    db?.execSync(`
      CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uri TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        takenAt TEXT NOT NULL
      );
    `);
  },

  addPhoto: (uri: string, lat: number, lon: number, date: string) => {
    return db?.runSync(
      'INSERT INTO photos (uri, latitude, longitude, takenAt) VALUES (?, ?, ?, ?)',
      [uri, lat, lon, date]
    );
  },

  getAllPhotos: (): Photo[] => {
    if (!db) return [];
    const results = db.getAllSync<Photo>('SELECT * FROM photos ORDER BY id DESC');
    return Array.isArray(results) ? results : [];
  },

  getPhotosByDate: (date: string): Photo[] => {
    if (!db) return [];
    const results = db.getAllSync<Photo>('SELECT * FROM photos WHERE takenAt = ?', [date]);
    return Array.isArray(results) ? results : [];
  },

  getMarkedDates: () => {
    if (!db) return {};
    const rows = db.getAllSync<{ takenAt: string }>('SELECT DISTINCT takenAt FROM photos') || [];
    const marks: Record<string, any> = {};
    rows.forEach(row => {
      marks[row.takenAt] = { marked: true, dotColor: '#FF3B30' };
    });
    return marks;
  }
};
