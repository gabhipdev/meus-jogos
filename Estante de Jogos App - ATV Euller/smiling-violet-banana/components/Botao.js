import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Botao({ texto, aoPressionar, tipo = 'primario' }) {
  // Se o tipo for 'secundario', a variável vira true
  const secundario = tipo === 'secundario';

  return (
    <TouchableOpacity
      // O array de estilos permite aplicar o estilo base e o condicional juntos
      style={[styles.botao, secundario && styles.secundario]}
      onPress={aoPressionar}
      activeOpacity={0.8}
    >
      <Text style={[styles.texto, secundario && styles.textoSecundario]}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#2563EB', // Azul principal
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secundario: { 
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderColor: '#2563EB' 
  },
  texto: { 
    color: '#FFF', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  textoSecundario: { 
    color: '#2563EB' 
  },
});