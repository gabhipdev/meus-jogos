import { createContext, useContext, useEffect, useState } from 'react';
import { jogosIniciais } from '../data/jogos';

const JogosContext = createContext();

export function JogosProvider({ children }) {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setJogos(jogosIniciais);
      setCarregando(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const adicionarJogo = (novo) => {
    setJogos((anteriores) => [
      { ...novo, id: Date.now() }, 
      ...anteriores,
    ]);
  };

 
  const removerJogo = (id) => {
    setJogos((anteriores) => anteriores.filter((jogo) => jogo.id !== id));
  };

  return (
    <JogosContext.Provider value={{ jogos, carregando, adicionarJogo, removerJogo }}>
      {children}
    </JogosContext.Provider>
  );
}

export const useJogos = () => useContext(JogosContext);