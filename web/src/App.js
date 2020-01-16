import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List';
import Sidebar from './components/Sidebar';
import api from './services/api';
import './global.css';
import './App.css';

export default class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    await api.get('/users')
      .then(response => {
        this.setState({
          list: response.data,
        });
      })
      .catch(error => {
        this.setState({
          list: [],
        });

        console.log(error);
      });
  }

  addNewUser = (newUser) => {
    if (newUser) {
      const hasUser = this.state.list.find(
        user => user.github_username === newUser.github_username
      );

      if (!hasUser) {
        this.setState({
          list: [...this.state.list, newUser],
        });
      }
    }
  }

  render() {
    return (
      <>
        <Header />
        <div id='app'>
          <Sidebar add={this.addNewUser} />
          <List user_list={this.state.list} />
        </div>
      </>
    );
  }
}
