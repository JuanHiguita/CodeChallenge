import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchUser from './SearchUser';

class Navigation extends Component {
    render(){
        let {handleSubmit,hideSearch} = this.props
        return(
            <header>
              <nav className="navbar navbar-expand-lg navbar-light mainNav">
              {!hideSearch? 
                <SearchUser handleSubmit = {handleSubmit}/>
                :
                <Link className = "buttonBack btn my-2 my-sm-0" to = '/'><i className="far fa-arrow-alt-circle-left"></i></Link>
                }
                <div className= "logo navbar-brand col-md-7 mx-auto navTitle"><img src="https://miro.medium.com/fit/c/240/240/1*WGASEyYzKuYBpgul2jYUnw.png" width = "70" height= "70"></img></div>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                    <a href='https://github.com/login/oauth/authorize?client_id=50ab6b45432aa59ed0d4&scope=user,gist'>
                        <button className="signIn btn btn-dark btn-md shadow">
                          <i className="fab fa-github pr-1"></i><span>Sign in with Github</span>  
                        </button>
                    </a>
                  </ul>    
                </div>
              </nav>
          </header>
            )
        }
    }
export default Navigation;