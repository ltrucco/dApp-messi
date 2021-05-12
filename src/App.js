import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages';
import SigninPage from './pages/signin';

const App = () => {
  return (
    <div >
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signin" component={SigninPage} exact />
        </Switch>
        
      </Router>
      
    </div>
  );
}

export default App;
