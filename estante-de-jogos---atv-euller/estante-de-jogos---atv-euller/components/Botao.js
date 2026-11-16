import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Botao({ texto, aoPressionar, tipo = 'primario' }) {
  const secundario = tipo === 'secundario';
  const perigo = tipo === 'perigo';

  return (
    <TouchableOpacity
      style={[styles.botao, secundario && styles.secundario, perigo && styles.perigo]}
      onPress={aoPressionar}
      activeOpacity={0.8}
    >
      <Text style={[styles.texto, secundario && styles.textoSecundario, perigo && styles.textoPerigo]}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#00F0FF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secundario: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#00F0FF' },
  perigo: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FF4D4D' },
  texto: { color: '#000', fontSize: 16, fontWeight: '900', textTransform: 'uppercase' },
  textoSecundario: { color: '#00F0FF' },
  textoPerigo: { color: '#FF4D4D' },
});