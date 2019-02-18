import React, {Component, Fragment} from 'react';
import UserNavigation from '../components/LoggedUserNavigation';
import Home from '../components/Home';
import Gist from '../components/UserAuthGist';

class HomePageUser extends Component {
    state = {
        gists: [],
        //user: ''  
    }
        componentDidMount(){
            //this.getUser()
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
        /*/Here we use the user token from github to get access to the authenticated user
        getUser = () => {
            let token = localStorage.getItem('userToken')
            console.log(token);
            fetch(`https://api.github.com/user?access_token=${token}`)
            .then(response => response.json())
            .then(res => this.setState({user: res}))
          }*/
        //Here we build a HandleSubmit to get access in the form's input, for search a X user 
        handleSubmit=(username)=>{
            this.getGists(username);
        }

    render(){
        console.log(this.props.user)
        return(
            <Fragment>
                <UserNavigation handleSubmit= {this.handleSubmit} isLogged = {this.isLogged} user = {this.props.user}/>
                <Home hideHome={this.state.gists.length}/>
                {/*Here we map the gists, and then we use the keys to get access to the file data*/
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