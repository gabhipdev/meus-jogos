import { View, Text, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';
import { useJogos } from '../context/JogosContext';

export default function Detalhes({ route, navigation }) {
  const { jogo } = route.params;
  const { removerJogo } = useJogos();

  const confirmarExclusao = () => {
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(`Tem certeza que deseja apagar "${jogo.titulo}"?`);
      if (confirmou) {
        removerJogo(jogo.id);
        navigation.goBack();
      }
      return;
    }

    Alert.alert(
      'Excluir Jogo',
      `Tem certeza que deseja apagar "${jogo.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            removerJogo(jogo.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Cabecalho titulo={jogo.titulo} subtitulo={`${jogo.plataforma} • ${jogo.ano}`} />

        <View style={styles.notaBox}>
          <Text style={styles.notaLabel}>NOTA FINAL</Text>
          <Text style={styles.notaValor}>
            {typeof jogo.nota === 'number' && !isNaN(jogo.nota) ? jogo.nota.toFixed(1) : '0.0'}
          </Text>
        </View>

        <Text style={styles.secao}>SINOPSE</Text>
        <Text style={styles.descricao}>{jogo.descricao}</Text>

        <View style={{ marginTop: 24 }}>
          <Botao texto="Voltar" tipo="secundario" aoPressionar={() => navigation.goBack()} />
          <Botao texto="Excluir Jogo" tipo="perigo" aoPressionar={confirmarExclusao} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121218' },
  conteudo: { padding: 16 },
  notaBox: {
    backgroundColor: '#00F0FF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#00F0FF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  notaLabel: { color: '#000', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  notaValor: { color: '#000', fontSize: 42, fontWeight: '900', fontFamily: 'monospace' },
  secao: { fontSize: 16, fontWeight: '900', color: '#FFF', marginBottom: 8, fontFamily: 'monospace' },
  descricao: { fontSize: 15, color: '#A0A0B0', lineHeight: 24 },
});