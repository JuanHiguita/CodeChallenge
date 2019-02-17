import React, {Component, Fragment} from 'react';
import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Gist from '../components/Gist';

class HomePage extends Component {
    state = {
        gists: []
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

    render(){
        return(
            <Fragment>
                <Navigation handleSubmit= {this.handleSubmit} isLogged = {this.isLogged}/>
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

export default HomePage;