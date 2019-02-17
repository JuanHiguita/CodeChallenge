import React from 'react';

const GistMark = ({markdown}) => (
        <div className="container">
            <div className="card gistContent col-md-12 mt-5 p-4">
                <p dangerouslySetInnerHTML={{__html: markdown}}></p>
            </div>
        </div>
        )
export default GistMark;