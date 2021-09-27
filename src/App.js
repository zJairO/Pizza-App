import React, { Component } from 'react';
import './App.css';
import pizza from './pizza.svg';
import  MainForm  from './components/MainForm';
import 'semantic-ui-css/semantic.min.css';
import { Header, Image } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header as='h2'>
          <Image circular src={pizza} /> Pizza Store
          <Header.Subheader>
            Doing pizza since 1990
          </Header.Subheader>
        </Header>
        <MainForm/>
      </div>
    );
  }
}

export default App;
