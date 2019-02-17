import React, {Component, Fragment} from 'react';

class Home extends Component {
    render(){
        let {hideHome} = this.props
        return(
            <Fragment>
            {
            hideHome=== 0 &&
            //Home page
            <div className="homePage">
                <h1 className="title">blog</h1>
                <p className="description">Explore the unknow. Uncover what matters. Prototype, test, repeat. Combine <br></br> intuition with evidence. Design with intent and build it right</p>
            </div>
        
            }
        </Fragment>    
        )
    }
}
export default Home;