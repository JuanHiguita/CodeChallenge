import React, { Component } from 'react';
import Routes from './Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      gists: [],
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
    let token = localStorage.getItem('userToken') 
    if(token){
      this.getUser(token)
      this.setState({isLogged:true})
    }
  }
  //Here we use "fetch" to charge a Json with the data from the Github Gists
  getGists=(username)=>{
    if(username !== ''){
        fetch(`https://api.github.com/users/${username}/gists`)
        .then(response=>response.json())
        .then(response => this.setState({gists : response}))
        .catch(function(error) {
        console.log(error);
    });
    }
}
//Here we build a HandleSubmit to get access in the form's input, for search a X user 
handleSubmit=(username)=>{
    this.getGists(username);
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
  
  logOut = () => {
    localStorage.removeItem('userToken')
    this.setState({isLogged: false})
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation handleSubmit = {this.handleSubmit} isLogged = {this.state.isLogged} user = {this.state.user} logOut={this.logOut}/>
          <Routes isLogged={this.state.isLogged} user={this.state.user} gists = {this.state.gists}/>          
        </div>
      </Router>
    );
  }
}
  
export default App;
