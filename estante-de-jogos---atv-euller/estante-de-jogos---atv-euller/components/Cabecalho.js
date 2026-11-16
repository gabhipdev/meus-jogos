import { View, Text, StyleSheet } from 'react-native';

export default function Cabecalho({ titulo, subtitulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  titulo: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: '#FFFFFF',
    fontFamily: 'monospace', 
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  subtitulo: { fontSize: 14, color: '#A0A0B0', marginTop: 4 },
});