import { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { MainComponent } from './components/Main';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors';

const Main = () => {
  const [x, setX] = useState(0);
  return (
    <MainComponent />
  );
};

// disable uppercase on
const theme = createTheme({
  // palette: {
  //   primary: green
  // },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
      </ThemeProvider>
    </Router>
  );
}
