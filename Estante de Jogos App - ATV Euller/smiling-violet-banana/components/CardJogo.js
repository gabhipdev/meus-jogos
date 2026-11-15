import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// O componente recebe as props desestruturadas { titulo, plataforma, ano, nota, aoPressionar }
export default function CardJogo({ titulo, plataforma, ano, nota, aoPressionar }) {
  return (
    // O TouchableOpacity é um botão. Quando clicado, chama a função 'aoPressionar' que veio de fora.
    <TouchableOpacity style={styles.card} onPress={aoPressionar} activeOpacity={0.7}>
      
      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        {/* Template string para juntar plataforma e ano */}
        <Text style={styles.subtitulo}>{`${plataforma} • ${ano}`}</Text>
      </View>

      <View style={styles.notaBox}>
        <Text style={styles.nota}>{nota.toFixed(1)}</Text>
      </View>
      
    </TouchableOpacity>
  );
}

// StyleSheet.create é a forma correta e otimizada de criar estilos no React Native
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Coloca a info e a nota lado a lado
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    // Sombrinha para dar um visual mais bonito (elevation é para Android, shadow para iOS)
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  info: { 
    flex: 1, // Faz essa parte ocupar todo o espaço disponível
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#111827' 
  },
  subtitulo: { 
    fontSize: 13, 
    color: '#6B7280', 
    marginTop: 2 
  },
  notaBox: {
    backgroundColor: '#FBBF24', // Cor amarela
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  nota: { 
    fontWeight: 'bold', 
    color: '#78350F', // Cor de texto marrom escuro
    fontSize: 13 
  },
});