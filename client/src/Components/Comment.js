import React from 'react';

class Comment extends React.Component {
    componentDidMount() {
        console.log("delComm1")
        console.log(this.props.delComm)
    }
    render() {
        return (
            <div>
                <i onClick={() => this.props.delComm(this.props.id)} className="trash alternate icon" />
                <span className="author">{this.props.name}</span>
                <div className="metadata">
                    <div className="date">{new Date(this.props.time).toLocaleString()}</div>
                </div>
                <div className="text">
                    {this.props.content}
                </div>
            </div>
        );
    };
};

export default Comment;