import React, {Component, Fragment} from 'react';
import UserNavigation from '../components/LoggedUserNavigation';
import Home from '../components/Home';
import Gist from '../components/UserAuthGist';

class HomePageUser extends Component {
    state = {
        gists: [],
        user: ''  
    }
        componentDidMount(){
            this.getUser()
        }
        //Here we use "fetch" to charge a Json with the data from the Github Gists
        getGists=(username)=>{
            console.log(username)
            if(username !== ''){
                fetch(`https://api.github.com/users/${username}/gists`)
                .then(response=>response.json())
                .then(response => this.setState({gists : response}))
                .catch(function(error) {
                console.log(error);
            });
            }
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
        //Here we build a HandleSubmit to get access in the form's input, for search a X user 
        handleSubmit=(username)=>{
            this.getGists(username);
        }

    render(){
        console.log(this.state.user)
        return(
            <Fragment>
                <UserNavigation handleSubmit= {this.handleSubmit} isLogged = {this.isLogged} user = {this.state.user}/>
                <Home hideHome={this.state.gists.length}/>
                {
                    this.state.gists.map((gist,index) => {      
                        const keys = Object.keys(gist.files);
                        return(
                            <Gist gist = {gist} index = {index} keys = {keys} key = {gist.id}/>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default HomePageUser;