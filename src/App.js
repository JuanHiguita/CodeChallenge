import React, { Component } from 'react';
import Routes from './Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

//
class App extends Component {
  //Here we define the constructor with the "parameters" that it will have
  constructor(){
    super();
    this.state = {
      isLogged: false,
      user: ''
    }
  }
  //componentdidmount 
  componentDidMount(){
    console.log(window.location)
    let code = window.location.search.replace('?code=', '');
    //localstorage.remove.item
    if (code){
        this.getToken(code)
        this.getUser()
    }
  }
  getToken=(code)=>{
    fetch(`https://codechallenge1.herokuapp.com/authenticate/${code}`)
    .then(response => response.json())
    .then(res => {
      if (res.token){
        this.setState({
          isLogged: true
        })
        localStorage.setItem('userToken', res.token)
      }
    })
  }
  getUser = () => {
    let token = 'e740008eb426c988960b0285d43a9b25f4e87ddd'//localStorage.getItem('userToken')
    console.log(token);
    fetch('https://api.github.com/user',{
      method: "GET",
      headers:{
        authorization: `token ${token}`
      }
    })
    .then(response => response.json())
    .then(res => this.setState({user: res}))
  }
  render() {
        //Here you build the principal HTML structure
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
