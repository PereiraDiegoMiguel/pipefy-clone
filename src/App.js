import React from 'react';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Board from './components/Board';
function App() {
  return (
    <>
      <Header></Header>
      <Board></Board>
      <GlobalStyle />
    </>
  );
}

export default App; 