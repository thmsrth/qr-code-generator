import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import Header from './components/Header';
import Main from './screens/Main';

import './App.css';

const theme = createMuiTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <main>
          <Main />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
