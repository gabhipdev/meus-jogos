import { createContext, useContext, useEffect, useState } from 'react';
import { jogosIniciais } from '../data/jogos';

// Cria o contexto
const JogosContext = createContext();

// O Provider é quem "abraça" o app e distribui os dados
export function JogosProvider({ children }) {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // O useEffect roda assim que o app abre. 
  // Ele simula um carregamento (como se fosse uma API) e usa o cleanup (clearTimeout)
  useEffect(() => {
    const timer = setTimeout(() => {
      setJogos(jogosIniciais);
      setCarregando(false);
    }, 800); // 800 milissegundos de delay

    // Função de limpeza (cleanup) exigida no trabalho!
    return () => clearTimeout(timer);
  }, []);

  // Função para adicionar um jogo novo. 
  // Usamos o spread (...novo) e o anterior para manter os antigos.
  const adicionarJogo = (novo) => {
    setJogos((anteriores) => [
      { ...novo, id: Date.now(), nota: 0 },
      ...anteriores,
    ]);
  };

  return (
    <JogosContext.Provider value={{ jogos, carregando, adicionarJogo }}>
      {children}
    </JogosContext.Provider>
  );
}

// Hook personalizado para facilitar o uso nas telas
export const useJogos = () => useContext(JogosContext);