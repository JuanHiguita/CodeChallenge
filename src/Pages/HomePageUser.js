import React, {Component, Fragment} from 'react';
import Home from '../components/Home';
import Gist from '../components/UserAuthGist';

class HomePageUser extends Component {
    render(){
        console.log(this.props.user)
        return(
            <Fragment>
                <Home hideHome={this.props.gists.length}/>
                {/*Here we map the gists, and then we use the keys to get access to the file data*/
                    this.props.gists.map((gist,index) => {      
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