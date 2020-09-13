import React from 'react';
import {
  Route, HashRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import routes from '@/router';
import Home from '@/web/home';
import Navigation from './components/navigation/index';
import './App.less';

function App() {
  return (
    <Router>
      <div className="web-wrap">
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Redirect from="/home" to="/" />
          {routes.map(route => <Route key={route.path} {...route} />)}
          <Redirect from="/*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
