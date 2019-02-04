import React, { Component } from 'react';
import './App.css';

import { posts } from './posts.json';

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts
    }
  }

  render() {
    const posts = this.state.posts.map((post, i) => {
      return(
        <div className = "col-md-12">
          <div className = "card mt-4">
            <div className = "card-header">
            <h4>{ post.title }</h4>
            <p><strong>{post.responsible}</strong></p>
            </div>
            <div className = "card-body">
              { post.description }
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="App">
          <nav className="navbar navbar-light bg-light Main-navbar">
            <div className="container navContainer">
              <div className="row">
                <ul className="navbar-elements">
                  <li className="Forum-home col-md-4">
                    <i className="fas fa-home home-button"></i>
                  </li>
                  <li className="Search-bar col-md-4">
                    <input className="Search-bar-input form-control" type="text" placeholder="Search" aria-label="Search"></input>
                  </li>
                  <li className="Log-In col-md-4">
                    <a>Log In</a>
                  </li>
                  <li className="Sign-Up col-md-4">
                    <a>Sign Up</a>
                  </li>
                </ul>
                </div>
              </div>
          </nav>
          <div className="container">
            <div className="row mt-4">
              { posts }
            </div>
          </div>                
      </div>
    );
  }
}

export default App;
