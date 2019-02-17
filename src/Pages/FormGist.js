import React, {Component, Fragment} from 'react';
import UserNavigation from '../components/LoggedUserNavigation';
import FormGist from '../components/FormGist';

class FormGistPage extends Component {
    state = {
        user:''
    }
    componentDidMount(){
        this.getUser()
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
      
    render(){ 
        return(
            <Fragment>
                <UserNavigation hideSearch user = {this.state.user}/>
                <FormGist handleChange/>
            </Fragment>
        )
    }
}
export default FormGistPage;