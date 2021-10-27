import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import Spectacles from "./pages/Spectacles";
import AddSpectacleForm from "./pages/AddSpectacle";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import SpectacleForm from './components/spectacleForm';

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/spectacles/new" component={AddSpectacleForm} />
              <Route exact path="/login" component={Login} />
              <Route path="/resigter" component={Register} />
              <Route path="/spectacles" exact component={Spectacles} />

              <Redirect exact from="/" to="/spectacles" />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;