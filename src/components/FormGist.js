import React, {Component} from 'react';

class FormGist extends Component {
    constructor(props){
        super(props);
        this.state = {
            filename: '',
            description: '',
            content: ''
        }
            /*this.description = React.createRef()
            this.filename = React.createRef()
            this.content = React.createRef()*/
    }
    Post = (filename,description,content) => {
        console.log(filename,description,content)
        let url ='https://api.github.com/gists'
        let token = 'e740008eb426c988960b0285d43a9b25f4e87ddd'
        let post = {
            description: `${description}`,
            public: true,
            files: {
                "Test.md": {
                    content: `${content}`
                }
            }
        }
        post = JSON.stringify(post);
        let req = () => {
            fetch(url,{
                method: 'POST',
                body: post,
                headers:{
                    'Content-Type': 'application/json',
                    authorization: `token ${token}`
                }
            })
            .then(response => response.json())
            .then(data => console.log(data))}
        req()
    }
    handleChange = (e) => {
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.Post(this.refs.filename.value,this.refs.description.value,this.refs.content.value)
    }
    render(){
        return(
            //Form for create a new gist(post)
            <form onSubmit={e=>this.handleSubmit(e)}>
                <div className="container createGistForm mt-4">
                    <div className="form-row">
                        <div className= "form-group col-md-6 mt-3">
                            <input type="text" className="form-control gistFormDescription" ref='description' placeholder="Gist description"/>
                        </div>
                        <div className= "form-group col-md-6 mt-3">
                            <input type="text" className="form-control fileName" ref='filename' placeholder="Filename"/>
                        </div>
                        <div className= "form-group col-md-12">
                            <textarea className="form-control" ref = 'content' rows="20"/>
                        </div>
                        <button className="btn btn-primary btn-block m-4" onClick={e=>this.handleSubmit(e)} >Post</button>
                    </div>
                </div>
            </form>
        )
    }
}
export default FormGist;