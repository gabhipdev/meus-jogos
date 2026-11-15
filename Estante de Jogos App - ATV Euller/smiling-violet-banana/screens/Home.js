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
  
  // useState 1: Para a barra de busca
  const [busca, setBusca] = useState('');
  // useState 2: Para o filtro de plataforma
  const [plataforma, setPlataforma] = useState('Todos');

  // Filtra os jogos com base na busca e na plataforma selecionada
  const jogosFiltrados = jogos.filter((jogo) => {
    const porPlataforma = plataforma === 'Todos' || jogo.plataforma === plataforma;
    const porBusca = jogo.titulo.toLowerCase().includes(busca.toLowerCase());
    return porPlataforma && porBusca;
  });

  // Se estiver carregando (nosso useEffect do context), mostra o loading
  if (carregando) {
    return (
      <SafeAreaView style={styles.centro} edges={['left', 'right', 'bottom']}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.textoCarregando}>Carregando jogos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.conteudo}>
        <Cabecalho
          titulo="Meus Jogos"
          subtitulo={`${jogosFiltrados.length} jogo(s) encontrado(s)`}
        />

        <CampoTexto
          label="Buscar por título"
          valor={busca}
          aoMudar={setBusca}
          placeholder="Ex: Elden Ring"
        />

        {/* Filtros de plataforma */}
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

        {/* Se a lista estiver vazia, mostra um aviso (requisito de usabilidade) */}
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
                // Aqui está a passagem de parâmetro da navegação!
                aoPressionar={() => navigation.navigate('Detalhes', { jogo: item })}
              />
            )}
          />
        )}

        <View style={styles.botaoFixo}>
          <Botao texto="+ Adicionar jogo" aoPressionar={() => navigation.navigate('Formulario')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  conteudo: { flex: 1, padding: 16 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  textoCarregando: { marginTop: 12, color: '#6B7280' },
  textoVazio: { color: '#6B7280', fontSize: 15 },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  filtro: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  filtroAtivo: { backgroundColor: '#2563EB' },
  filtroTexto: { color: '#374151', fontSize: 13, fontWeight: '500' },
  filtroTextoAtivo: { color: '#FFF', fontWeight: 'bold' },
  botaoFixo: { position: 'absolute', left: 16, right: 16, bottom: 16 },
});