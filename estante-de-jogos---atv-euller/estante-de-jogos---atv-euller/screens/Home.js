import { useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from '../components/Cabecalho';
import CardJogo from '../components/CardJogo';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';
import { useJogos } from '../context/JogosContext';

const PLATAFORMAS = ['Todos', 'PC', 'PlayStation', 'Xbox', 'Nintendo'];

export default function Home({ navigation }) {
  const { jogos, carregando } = useJogos();
  const [busca, setBusca] = useState('');
  const [plataforma, setPlataforma] = useState('Todos');

  const jogosFiltrados = jogos.filter((jogo) => {
    const porPlataforma = plataforma === 'Todos' || jogo.plataforma === plataforma;
    const porBusca = jogo.titulo.toLowerCase().includes(busca.toLowerCase());
    return porPlataforma && porBusca;
  });

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro} edges={['left', 'right', 'bottom']}>
        <ActivityIndicator size="large" color="#00F0FF" />
        <Text style={styles.textoCarregando}>CARREGANDO...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.conteudo}>
        <Cabecalho
          titulo="BIBLIOTECA"
          subtitulo={`${jogosFiltrados.length} jogo(s) encontrado(s)`}
        />

        <CampoTexto
          label="Buscar por título"
          valor={busca}
          aoMudar={setBusca}
          placeholder="Ex: Elden Ring"
        />

        <View style={styles.filtros}>
          {PLATAFORMAS.map((plat) => (
            <TouchableOpacity
              key={plat}
              onPress={() => setPlataforma(plat)}
              style={[styles.filtro, plataforma === plat && styles.filtroAtivo]}
            >
              <Text style={[styles.filtroTexto, plataforma === plat && styles.filtroTextoAtivo]}>
                {plat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {jogosFiltrados.length === 0 ? (
          <View style={styles.centro}>
            <Text style={styles.textoVazio}>Nenhum jogo encontrado 🎮</Text>
          </View>
        ) : (
          <FlatList
            data={jogosFiltrados}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <CardJogo
                titulo={item.titulo}
                plataforma={item.plataforma}
                ano={item.ano}
                nota={item.nota}
                aoPressionar={() => navigation.navigate('Detalhes', { jogo: item })}
              />
            )}
          />
        )}

        <View style={styles.botaoFixo}>
          <Botao texto="+ Adicionar Jogo" aoPressionar={() => navigation.navigate('Formulario')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121218' }, 
  conteudo: { flex: 1, padding: 16 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  textoCarregando: { marginTop: 12, color: '#00F0FF', fontFamily: 'monospace', fontWeight: 'bold' },
  textoVazio: { color: '#A0A0B0', fontSize: 15 },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  filtro: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1A1A24',
    borderWidth: 1,
    borderColor: '#2A2A3A'
  },
  filtroAtivo: { backgroundColor: '#00F0FF', borderColor: '#00F0FF' },
  filtroTexto: { color: '#A0A0B0', fontSize: 13, fontWeight: 'bold' },
  filtroTextoAtivo: { color: '#000', fontWeight: '900' },
  botaoFixo: { position: 'absolute', left: 16, right: 16, bottom: 16 },
});