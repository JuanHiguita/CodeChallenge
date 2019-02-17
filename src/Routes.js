//Dependecies
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
//Components
import HomePage from './Pages/HomePage';
import GistDetail from './Pages/GistDetail';
import HomePageUser from './Pages/HomePageUser';
import GistDetailUser from './Pages/GistDetailUser';
import FormGist from './Pages/FormGist';

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLogged === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
const PublicRoute = ({ component: Component, isLogged, rest }) => (
    <Route
      {...rest}
      render={props =>
        (isLogged === false ? <Component {...props} /> : <Redirect to='/auth/gists' />)}
    />
  )
const Routes = ({isLogged}) => (
    <Switch>
        {/*Public Routes*/}
        <PublicRoute exact isLogged = {isLogged} path = '/' component={HomePage}/>
        <PublicRoute exact isLogged = {isLogged} path = '/gist/:id' component={GistDetail}/>
        {/*Private Routes*/}
        <PrivateRoute exact isLogged = {isLogged}  path = '/auth/gists' component={HomePageUser}/>
        <PrivateRoute exact isLogged = {isLogged}  path = '/auth/gists/gist/:id' component={GistDetailUser}/>
        <PrivateRoute exact isLogged = {isLogged}  path = '/auth/FormGist' component = {FormGist}/>
    </Switch>
)
export default Routes; 