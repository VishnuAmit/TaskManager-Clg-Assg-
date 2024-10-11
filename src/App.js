import React from 'react';
import TaskBoard from './components/TaskBoard';
import GlobalStyle from './styles/GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <TaskBoard />
    </>
  );
};

export default App;
