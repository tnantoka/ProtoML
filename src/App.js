import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LZString from 'lz-string';
// eslint-disable-next-line no-unused-vars
import { FontAwesome } from 'expo-web';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import Editor from './components/Editor';
import Player from './components/Player';
import Screens from './components/Screens';
import Examples from './components/Examples';

function decompress(props) {
  let source;
  try {
    const data = props.match.params.data;
    source = LZString.decompressFromEncodedURIComponent(data);
  } catch (e) {
    console.error(e);
  }
  return source;
}

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ flex: 1, display: 'flex' }}>
          <Route exact path="/" component={Editor} />
          <Route path="/edit/:data" render={props => <Editor source={decompress(props)} />} />
          <Route path="/play/:data" render={props => <Player source={decompress(props)} />} />
          <Route path="/screens/:data" render={props => <Screens source={decompress(props)} />} />
          <Route path="/examples" component={Examples} />
        </div>
      </BrowserRouter>
    );
  }
}
