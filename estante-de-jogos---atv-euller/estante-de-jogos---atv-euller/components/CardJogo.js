import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardJogo({ titulo, plataforma, ano, nota, aoPressionar }) {
  return (
    <TouchableOpacity style={styles.card} onPress={aoPressionar} activeOpacity={0.7}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>{`${plataforma} • ${ano}`}</Text>
      </View>
      <View style={styles.notaBox}>
        <Text style={styles.nota}>
          {typeof nota === 'number' && !isNaN(nota) ? nota.toFixed(1) : '0.0'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A24',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A3A', 
  },
  info: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  subtitulo: { fontSize: 13, color: '#00F0FF', marginTop: 4, fontWeight: '600' },
  notaBox: {
    backgroundColor: '#00F0FF', 
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  nota: { fontWeight: '900', color: '#000', fontSize: 14 },
});