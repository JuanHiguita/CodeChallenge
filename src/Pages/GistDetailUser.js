import React, {Component, Fragment} from 'react';
import marked from "marked";
import GistMark from '../components/GistMark';
import UserNavigation from '../components/LoggedUserNavigation';

class GistDetailUser extends Component {
    state = {
        gist: null,
        markdown: '',
        user: ''
    }
    componentDidMount(){
        let id = this.props.location.pathname.replace('/auth/gists/gist/','')
        console.log(id)
        this.getGist(id)
        this.getUser()
    }
    //Here we use "fetch" to charge a Json with the data from the Github Gists
    getGist=(id)=>{
        console.log(id)
        fetch(`https://api.github.com/gists/${id}`)
        .then(response=>response.json())
        .then(response => this.setState({gist : response},()=>this.getMarkdown()))
        .catch(function(error) {
            console.log(error);
        });
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
    //Here we fetch the raw_url from the gist, and we get the data in format .txt, 
    //then we transform the text to the format MarkDown
    getMarkdown=()=>{
        let gist = Object.values(this.state.gist.files)[0].raw_url
        fetch(gist)
        .then(response => response.text())
        .then(text => this.setState({
        markdown : marked(text)}))
    }
    render(){
        return(
            <Fragment>
                <UserNavigation hideSearch user = {this.state.user}/>
                <GistMark markdown = {this.state.markdown}/>
            </Fragment>
                        
        )
    }
}

export default GistDetailUser;