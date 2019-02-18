import React, { Component } from 'react';
import Routes from './Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLogged: false,
      user: ''
    }
  }
  //Here we get the code from github, to get access to the github api
  componentDidMount(){
    console.log(window.location)
    let code = window.location.search.replace('?code=', '');
    if (code){
        this.getToken(code)
        this.getUser()
    }
  }
  //Here we use the code from github to get the user access token
  getToken=(code)=>{
    fetch(`https://codechallenge1.herokuapp.com/authenticate/${code}`)
    .then(response => response.json())
    .then(res => {
      if (res.token){
        this.setState({
          isLogged: true
        })
        //Here we save the access token in the local storage
        localStorage.setItem('userToken', res.token)
        this.getUser(localStorage.getItem('userToken'))
      }
    })
  }
  //Here we use the access token to get the info from he authenticated user
  getUser = (token) => {
    console.log(token);
    fetch(`https://api.github.com/user?access_token=${token}`)
    .then(response => response.json())
    .then(res => this.setState({user: res}))
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Routes isLogged={this.state.isLogged} user={this.state.user}/>          
        </div>
      </Router>
    );
  }
}
  
export default App;
