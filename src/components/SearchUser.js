import React, {Component} from 'react';

class SearchUser extends Component {
    constructor(props){
        super(props);
        this.username = React.createRef()
    }
    //Here we search all the gist from a X user
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.handleSubmit(this.username.current.value);  
    }
    render(){
        return(
            <form className="mainForm form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                <input className="searchBarInput form-control mr-sm-2" placeholder="Username" ref = {this.username} type="text" aria-label="Search"></input>
                  <button className="buttonSearch btn my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>
                    <i className="fas fa-search"></i>
                  </button>
            </form>
        )
    }
}

export default SearchUser;
