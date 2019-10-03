import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//importa as paginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

//cria o componente Routes
//em Route, define o path/url e o componente que serah renderizado
//exact define o path exato
export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={New} />
      </Switch>
    </BrowserRouter>
  );
}
