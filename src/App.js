import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import marked from "marked";
import './App.css';
import Axios from 'axios';
//initialization of firebase
firebase.initializeApp({
  apiKey: "AIzaSyB6YLGrv3wFyF1jVLvP-UfOjRGMpqRo8cs",
  authDomain: "codechallenge-a001c.firebaseapp.com"
})
//
class App extends Component {
  //Here we define the constructor with the "parameters" that it will have
  constructor(){
    super();
    this.state = {
      gists: [],
      showUserProfile:false,
      isSignedIn:false,
      username: '',
      markdown:'',
      showGists: true,
      showMarkdowns:false,
      showCreateGistForm: false
    }
  }
  //Basic config to the firebase ui
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  } 
  //listener for the user state change
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user);
    })}
  //Here we use "fetch" to charge a Json with the data from the Github Gists
  getGists(username){
    fetch(`https://api.github.com/users/${username}/gists`)
    .then(response=>response.json())
    .then(response => this.setState({gists : response}));
  }
  postGist(){
    Axios.post('https://api.github.com/gists', {
      "method": "POST",
      "description": "POSTING FROM EXPRESS",
      "headers": {
        "Authorization" : "token" //+ firebase.auth().currentUser.uid
      },
      "public": true,
      "files": {
        "file1.txt": {
          "content": "EXPRESS "
        }
      }
    })
    this.setState({
      showGists:false,
      showMarkdowns:false,
      showCreateGistForm: true
    })
  }
  //Here we build a HandleSubmit to get access in the form's input, for search a X user 
  handleSubmit(e){
    e.preventDefault();
    this.getGists(this.refs.username.value);
    this.setState({
      showGists:true,
      showMarkdowns:false,
      showCreateGistForm:false})
  }
  //Here we fetch the raw_url from the gist, and we get the data in format .txt, 
  //then we transform the text to the format MarkDown
  getMarkdown(rawUrl){
    fetch(rawUrl.index.raw_url)
    .then(response => response.text())
    .then(text => this.setState({
      markdown : marked(text),
      showGists:!this.state.showGists,
      showMarkdowns:!this.state.showMarkdowns}))
  }
  toggle(){
    this.setState({
      showGists:true,
      showMarkdowns:false,
      showCreateGistForm:false});
  }
  render() {
    const {markdown} = this.state;
    //Here we use "map" to navigate the gists Json
    const gists = this.state.gists.map((gist)=>{
      //Here we go to the dictionary where is the information of the gist file 
      const keys = Object.keys(gist.files);
      const gistsMark = [];
      //Here we get the info inside the directory, with his unique key
      Object.entries(gist.files).forEach(([key, value]) => {
        const thisGist = value;
        //Here we evaluate the language of the gist, so if the language is "Markdown", we save the gist
        //in the array gistsMark
        if(thisGist.language==="Markdown"){
          gistsMark.push(thisGist);
        }});
        
      const gistMark = gistsMark.map((index)=>{
        return(
          //Here we return a Html structure with the data of the gists
          //remember to execute a js code you need put the code between {}
          <div className = "card gistCard col-md-12 mt-5">
            <div className = "cardHeader">
              <img className = "userProfileImage" src={gist.owner.avatar_url}></img> 
              <h4 className = "gistName">{keys}</h4>
              <p className = "updatedDate">{gist.updated_at}</p>
            </div>
            <div className = "cardBody">
              <p className="gistDescription">{gist.description}</p>
              <input type = "submit" value = "Read" className="btn btn-dark mb-3 btnRead" onClick={()=>this.getMarkdown({index})}></input>
            </div>
          </div>
        )})
     //Here we call the const gistMark to show on the screen the gists with text document type
     return(
      <div className="row align-items-center">{gistMark}</div>
      )})
    //Here you build the principal HTML structure
    return (
      <div className="App">
        <header>
            <nav className="navbar navbar-expand-lg navbar-light mainNav">
              <form className="mainForm form-inline my-2 my-lg-0" onSubmit={e=>this.handleSubmit(e)}>
                <input className="searchBarInput form-control mr-sm-2" placeholder="Username" ref="username" type="text" aria-label="Search"></input>
                  <button className="buttonSearch btn my-2 my-sm-0" type="submit" onClick={e=>this.handleSubmit(e)}>
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              <button className= "homeBtn btn btn-link navbar-brand col-md-7 mx-auto navTitle" onClick={()=>this.toggle()}><img src="https://miro.medium.com/fit/c/240/240/1*WGASEyYzKuYBpgul2jYUnw.png" width = "70" height= "70"></img></button>
			        <div className="collapse navbar-collapse">
				        <ul className="navbar-nav ml-auto">
                  {/*Here we ask for the state isSignedIn, and if the state its true: we show the current user and the special 
                  options for authorized users, else we only show the button to sign in with github*/
                    this.state.isSignedIn?(
                      <li className="nav-item dropdown">
                        <a className="nav-item nav-link dropdown-toggle" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <img className="authUserImage" alt="profile picture" widht="100" height="5"src={firebase.auth().currentUser.photoURL}/>
                        </a>                
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userMenu">
                          <a className="dropdown-item nav-link" href="#">Profile</a>
                          <button className="btn btn-link dropdown-item nav-link" onClick={()=>this.postGist()}>Create Gist</button>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#"><button className="btn buttonSignOut" onClick={() => firebase.auth().signOut()}>Sign out</button></a>
                        </div>
                      </li>
                      ): (
                        <StyledFirebaseAuth
                          uiConfig={this.uiConfig}
                          firebaseAuth={firebase.auth()}/>
                        )
                      }
				        </ul>    
              </div>
	          </nav>
        </header>
        <div className= "container gistsContainer">
          {/*Here we call the const gist to show the gists on screen*/
          this.state.showGists?
            gists
            :null
            }
        </div>
        {/*here we use "dangerouslySetInnerHTML" to transform a HTML file to a Markdown file*/
        this.state.showMarkdowns?
        <div className="container">
          <div className="card gistContent col-md-12 mt-5 p-4">
            <p dangerouslySetInnerHTML={{__html: markdown}}></p>
          </div>
        </div>
        :null}
        {this.state.showCreateGistForm?
          <form>
          <div className="container createGistForm mt-4">
            <div className="form-row">
                <div className= "form-group col-md-6 mt-3">
                  <input type="text" className="form-control" placeholder="Gist description"/>
                </div>
                <div className= "form-group col-md-6 mt-3">
                  <input type="text" className="form-control" placeholder="Filename"/>
                </div>
                <div className= "form-group col-md-12">
                  <textarea className="form-control" rows="20"/>
                </div>
                <button className="btn btn-primary col-md-4 m-4" onClick={()=>this.postGist()}>Post</button>
              </div>
          </div>
        </form>
        :null}
      </div>
    );
  }
}

export default App;
