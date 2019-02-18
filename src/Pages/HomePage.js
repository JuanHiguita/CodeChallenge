import React, {Component, Fragment} from 'react';
import Home from '../components/Home';
import Gist from '../components/Gist';

class HomePage extends Component {
    render(){
    console.log(this.props) 
        return(
            <Fragment>
                <Home hideHome={this.props.gists.length}/>
                {
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

export default HomePage;