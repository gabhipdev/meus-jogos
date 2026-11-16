# Meus Jogos

## Descrição
Aplicativo de catálogo pessoal de jogos com tema visual "Gamer": permite buscar, filtrar por plataforma, ver detalhes, adicionar novos títulos com nota e excluir jogos da lista.

## Aluno
Gabriela Hipólito Costa Moreira - Análise e Desenvolvimento de Sistemas

## Telas
- **Home**: lista de jogos (FlatList), busca por título, filtro por plataforma e indicador de carregamento.
- **Detalhes**: exibe as informações do jogo recebido por parâmetro de navegação e permite excluir o jogo.
- **Formulario**: cadastro de novo jogo com nota e validação em tempo real.

## Fonte de dados
Dados locais — array de objetos em `data/jogos.js`.

## Onde estão os requisitos
- **Componentes**: `components/CardJogo.js`, `Botao.js`, `Cabecalho.js`, `CampoTexto.js` (4 componentes; `Botao`, `Cabecalho` e `CampoTexto` são reutilizados nas 3 telas; `CardJogo` é reutilizado na lista).
- **Props com callback**: `CardJogo` recebe `aoPressionar`; `Botao` recebe `aoPressionar`; `CampoTexto` recebe `aoMudar`.
- **useState**: `busca` e `plataforma` em `Home.js`; `titulo`, `plataforma`, `ano`, `nota`, `descricao` e `mensagem` em `Formulario.js`; `jogos` e `carregando` em `context/JogosContext.js` (com atualização imutável via spread para adicionar e excluir).
- **useEffect**: `context/JogosContext.js` (simula carregamento com cleanup `clearTimeout`); `screens/Formulario.js` (validação com debounce e cleanup).
- **Navegação com parâmetros**: passagem via `navigation.navigate('Detalhes', { jogo: item })` em `Home.js` e leitura via `route.params.jogo` em `Detalhes.js`. Header dinâmico configurado em `App.js`.

## Vídeo de demonstração
[Assista ao vídeo de demonstração aqui](https://youtu.be/Y9psNICv1YM)

## Como executar
npm install
npx expo start