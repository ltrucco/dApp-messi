import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages';
import SigninPage from './pages/signin';
import { StoreProvider } from "./Context/Store";

const App = () => {



  return (
    <div >
      <StoreProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signin" component={SigninPage} exact />
        </Switch>
        
      </Router>
      </StoreProvider>
      
    </div>
  );
}

export default App;
