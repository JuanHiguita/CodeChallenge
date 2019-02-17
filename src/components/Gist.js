import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
class Gist extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {gist, keys, index} = this.props;
        let renderGist = Object.values(gist.files)[0].language === "Markdown"
        console.log(renderGist)
        return(
          <Fragment>
          {
            renderGist && (
              <div className = "container">
                <div className = "card gistCard col-md-12 mt-5">
                  <div className = "cardHeader">
                    <img className = "userProfileImage" src={gist.owner.avatar_url}></img> 
                    <h4 className = "gistName">{keys}</h4>
                    <p className = "updatedDate">{gist.updated_at}</p>
                  </div>
                  <div className = "cardBody">
                    <p className="gistDescription">{gist.description}</p>
                    <Link className="btn btn-dark mb-3 btnRead" to={`/gist/${gist.id}`}>Read</Link>
                  </div>
                </div>
              </div>
            )
          }
          </Fragment>
            
        )
        
    }
}
export default Gist;
