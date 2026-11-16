import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from '../components/Cabecalho';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import { useJogos } from '../context/JogosContext';

export default function Formulario({ navigation }) {
  const { adicionarJogo } = useJogos();
  const [titulo, setTitulo] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [ano, setAno] = useState('');
  const [nota, setNota] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (!titulo && !plataforma && !ano && !nota) {
      setMensagem('');
      return;
    }
    setMensagem('Verificando dados...');
    const timer = setTimeout(() => {
      const anoNum = Number(ano);
      const notaNum = Number(String(nota).replace(',', '.'));
      
      const valido = 
        titulo.trim().length >= 2 && 
        plataforma.trim().length >= 2 && 
        anoNum >= 1900 &&
        String(nota).trim() !== '' &&
        !isNaN(notaNum) && notaNum >= 0 && notaNum <= 10;
      
      setMensagem(valido ? '✓ Pronto para adicionar' : 'Preencha os campos corretamente (Nota de 0 a 10)');
    }, 500);
    return () => clearTimeout(timer);
  }, [titulo, plataforma, ano, nota]);

  const salvar = () => {
    const anoNum = Number(ano);
    const notaNum = Number(String(nota).replace(',', '.'));

    if (titulo.trim().length < 2 || plataforma.trim().length < 2 || anoNum < 1900) {
      const msg = 'Preencha título, plataforma e ano corretamente.';
      if (Platform.OS === 'web') window.alert(msg);
      else Alert.alert('Atenção', msg);
      return;
    }
    if (String(nota).trim() === '' || isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
      const msg = 'A nota deve ser um número entre 0 e 10.';
      if (Platform.OS === 'web') window.alert(msg);
      else Alert.alert('Atenção', msg);
      return;
    }
    
    adicionarJogo({ 
      titulo, 
      plataforma, 
      ano: anoNum, 
      nota: notaNum, 
      descricao 
    });
    
    navigation.goBack();
    
    const msgSucesso = `Jogo "${titulo}" adicionado!`;
    if (Platform.OS === 'web') window.alert(msgSucesso);
    else Alert.alert('Sucesso', msgSucesso);
  };

  const sucesso = mensagem.startsWith('✓');

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Cabecalho titulo="Cadastrar" subtitulo="Adicione um novo jogo à sua lista" />

        <CampoTexto label="Título" valor={titulo} aoMudar={setTitulo} placeholder="Ex: The Last of Us" />
        <CampoTexto label="Plataforma" valor={plataforma} aoMudar={setPlataforma} placeholder="Ex: PlayStation" />
        <CampoTexto label="Ano" valor={ano} aoMudar={setAno} placeholder="Ex: 2013" keyboardType="numeric" />
        <CampoTexto label="Nota (0 a 10)" valor={nota} aoMudar={setNota} placeholder="Ex: 9.5" keyboardType="numeric" />
        <CampoTexto label="Descrição" valor={descricao} aoMudar={setDescricao} placeholder="Breve resumo" />

        {mensagem ? (
          <Text style={[styles.mensagem, sucesso && styles.ok]}>{mensagem}</Text>
        ) : null}

        <View style={{ marginTop: 8 }}>
          <Botao texto="Salvar Jogo" aoPressionar={salvar} />
        </View>
        <View style={{ marginTop: 12 }}>
          <Botao texto="Cancelar" tipo="secundario" aoPressionar={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121218' },
  conteudo: { padding: 16 },
  mensagem: { color: '#FFB300', fontSize: 13, marginBottom: 8, fontStyle: 'italic' },
  ok: { color: '#00F0FF', fontWeight: 'bold' },
});