import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function PhotoDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Détails de la photo {id}</Text>
    </View>
  );
}