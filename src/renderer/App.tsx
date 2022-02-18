import { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { MainComponent } from './components/Main';

const Main = () => {
  const [x, setX] = useState(0);
  return (
    <MainComponent />
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
