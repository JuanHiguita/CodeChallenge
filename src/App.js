import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  //
  constructor(){
    super();
    this.state = {
     username: ' ',
     gistDescription:' ',
     gistLink:' ',
     gistDate:' '
    }
  }
  
  //
  getGist(username){
    return fetch(`https://api.github.com/users/${username}/gists`)
    .then(gist => gist.json())
    .then(gist => {
      return gist;
    })
  }

  //
  async handleSubmit(e){
    e.preventDefault();
    let gists= await this.getGist(this.refs.username.value);
    console.log(gists);
    const gist = this.setState({username:gists.owner.login, gistDescription:gists.description, gistLink:gists.url, gistDate:gists.created_at});    
    }
  


  render() {
    let gist;
    //
    return (
      <div className="App">
        <h1 className="title col-md-12">Search an User</h1>
        <div className="container mainContainer">
          <div className="row">
            <div className="formCard card col-md-12">
            <form className="mainForm" onSubmit={e=>this.handleSubmit(e)}>  
              <input className="search-bar-input form-control" placeholder="Username" ref="username" type="text" aria-label="Search"></input>
              <input type="submit" value="Search" className="btn btn-primary buttonSearch" onClick={e=>this.handleSubmit(e)}></input>
              <input type="submit" value="Log In" className="btn btn-primary buttonLogIn"></input>
              <input type="submit" value="Sign Up" className="btn btn-primary buttonSignUp"></input>
            </form>
            </div>
          </div>
        </div>
                   
      </div>
    );
  }
}

export default App;
