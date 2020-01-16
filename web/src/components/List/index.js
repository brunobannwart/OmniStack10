import React, { Component } from 'react';
import './style.css';

export default class List extends Component {
    render() {
        return (
            <main>
                <ul>
                    { this.props.user_list.map(user => {
                        return (
                            <li key={ user._id } className='user-item'>
                                <header>
                                    <img src={ user.avatar_url } alt={ user.name }/>
                                    <div className='user-info'>
                                        <strong> { user.name } </strong>
                                        <span> { user.techs.join(', ') } </span>
                                    </div>
                                </header>
                                
                                <p> { user.bio } </p>
                                <a href={`https://github.com/${ user.github_username }` }> 
                                    Acessar perfil no Github 
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </main>
        );
    }
}