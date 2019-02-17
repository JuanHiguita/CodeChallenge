import React, {Component, Fragment} from 'react';
import marked from "marked";
import GistMark from '../components/GistMark';
import Navigation from '../components/Navigation';

class GistDetail extends Component {
    state = {
        gist: null,
        markdown: ''
    }
    componentDidMount(){
        let id = this.props.location.pathname.replace('/gist/','')
        console.log(id)
        this.getGist(id)
    }
    //Here we use "fetch" to charge a Json with the data from the Github Gists
    getGist=(id)=>{
        console.log(id)
        fetch(`https://api.github.com/gists/${id}`)
        .then(response=>response.json())
        .then(response => this.setState({gist : response},()=>this.getMarkdown()))
        .catch(function(error) {
            console.log(error);
        });
    }
    //Here we fetch the raw_url from the gist, and we get the data in format .txt, 
    //then we transform the text to the format MarkDown
    getMarkdown=()=>{
        let gist = Object.values(this.state.gist.files)[0].raw_url
        fetch(gist)
        .then(response => response.text())
        .then(text => this.setState({
        markdown : marked(text)}))
    }
    render(){
        return(
            <Fragment>
                <Navigation hideSearch/>
                <GistMark markdown = {this.state.markdown}/>
            </Fragment>
                        
        )
    }
}

export default GistDetail;