import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';

export default class Sidebar extends Component {
  state = {
    github_username: '',
    techs: '',
    latitude: '',
    longitude: '',
  };

  componentDidMount() {
    this.clearForm();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      'github_username': this.state.github_username,
      'techs': this.state.techs,
      'latitude': this.state.latitude,
      'longitude': this.state.longitude,
    };

    await api.post('/users', userForm)
      .then(response => {
        this.clearForm();
        this.props.add(response.data);
      })
      .catch(error => {
        this.clearForm();
        this.props.add(null);
        console.log(error);
      });
  }

  clearForm = () => {
    this.setState({
      github_username: '',
      techs: '',
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        this.setState({
          latitude,
          longitude,
        });

      },
      (error) => {
        console.log(error);
      },
      {
        timeout: 30000,
      }
    );
  }

  render() {
    return (
      <aside>
        <strong> Cadastrar </strong>
        <form onSubmit={this.handleSubmit}>
          <div className='input-block'>
            <label htmlFor='github_username'>Usuário do Github</label>
            <input
              name='github_username'
              id='github_username'
              value={this.state.github_username}
              onChange={e => this.setState({ github_username: e.target.value })}
              required
            />
          </div>

          <div className='input-block'>
            <label htmlFor='techs'>Tecnologias</label>
            <input
              name='techs'
              id='techs'
              value={this.state.techs}
              onChange={e => this.setState({ techs: e.target.value })}
              required
            />
          </div>

          <div className='input-group'>
            <div className='input-block'>
              <label htmlFor='latitude'>Latitude</label>
              <input
                type='number'
                name='latitude'
                id='latitude'
                value={this.state.latitude}
                onChange={e => this.setState({ latitude: e.target.value })}
                required
              />
            </div>
            <div className='input-block'>
              <label htmlFor='longitude'>Longitude</label>
              <input
                type='number'
                name='longitude'
                id='longitude'
                value={this.state.longitude}
                onChange={e => this.setState({ longitude: e.target.value })}
                required
              />
            </div>
          </div>

          <button type='submit'> Salvar </button>
        </form>
      </aside>
    );
  }
}