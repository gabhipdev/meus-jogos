import { View, Text, StyleSheet } from 'react-native';

export default function Cabecalho({ titulo, subtitulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {/* Se o subtitulo existir, ele mostra. Se não, não mostra nada. */}
      {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#111827' 
  },
  subtitulo: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginTop: 4 
  },
});