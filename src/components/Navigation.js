import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import SearchUser from './SearchUser';

class Navigation extends Component {
    render(){
        let {handleSubmit, location:{pathname}, isLogged, logOut, user} = this.props
        console.log(pathname)
        return(
            <header>
              <nav className="navbar navbar-expand-lg navbar-light mainNav">
              {pathname==="/auth/gists"||pathname==="/"?
                <SearchUser handleSubmit = {handleSubmit}/>
                :
                <Link className = "buttonBack btn my-2 my-sm-0" to = '/'><i className="far fa-arrow-alt-circle-left backArrow"></i></Link>
                }
                <div className= "logo navbar-brand col-md-7 mx-auto navTitle"><img src="https://miro.medium.com/fit/c/240/240/1*WGASEyYzKuYBpgul2jYUnw.png" width = "70" height= "70"></img></div>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                  {/*if the user is logged the are going to show the user info*/
                    isLogged?(
                        <li className="nav-item dropdown">
                          <a className="nav-item nav-link dropdown-toggle" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="authUserImage" src={user.avatar_url} alt="profile picture" widht="100" height="5"/>
                          </a>                
                          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userMenu">
                            <Link className="btn btn-link dropdown-item nav-link" to={'/auth/FormGist'}>Create a new post</Link>
                            <div className="dropdown-divider"></div>
                              <button className="dropdown-item btn btn-link buttonSignOut" onClick = {()=>logOut()}>Sign out</button>
                          </div>
                        </li>)
                    :(
                      <a href='https://github.com/login/oauth/authorize?client_id=50ab6b45432aa59ed0d4&scope=user,gist'>
                        <button className="signIn btn btn-dark btn-md shadow">
                          <i className="fab fa-github pr-1"></i><span>Sign in with Github</span>  
                        </button>
                    </a>
                    )
                  }
                  </ul>    
                </div>
              </nav>
          </header>
            )
        }
    }
export default withRouter(Navigation);