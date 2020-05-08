import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle='light-content' backgroundColor='#7D40E7' />
        <Routes />
      </>
    );
  }
}