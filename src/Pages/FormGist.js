import React, {Component, Fragment} from 'react';
import UserNavigation from '../components/LoggedUserNavigation';
import FormGist from '../components/FormGist';

class FormGistPage extends Component {
    render(){ 
        return(
            <Fragment>
                <UserNavigation hideSearch user = {this.props.user}/>
                <FormGist handleChange/>
            </Fragment>
        )
    }
}
export default FormGistPage;