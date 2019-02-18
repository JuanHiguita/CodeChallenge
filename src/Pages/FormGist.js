import React, {Component, Fragment} from 'react';
import FormGist from '../components/FormGist';

class FormGistPage extends Component {
    render(){ 
        return(
            <Fragment>
                <FormGist handleChange/>
            </Fragment>
        )
    }
}
export default FormGistPage;