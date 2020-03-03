import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Favorites from './Favorites.js';
import About from './About.js';
import MainNav from './MainNav.js';


// import './bootstrap-reboot.min.css';
import './App.css';
import './style.css';

export default class App extends Component {
  state = {
    data: [],
    userName: '', 
    userToken: '',
    userId: '',
}

  render() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Artist Residencies Listings</h1>
          <MainNav></MainNav>
        </header>
        <Switch>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/favorites' component={Favorites}></Route>
          <Route exact path='/about' component={About}></Route>
          <Route path='/' component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}