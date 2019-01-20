import React from 'react';
import Comment from './Comment';

class CommentBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', comment: '' }
    }
    //called when add comment button is pushed
    addComment = () => {

        const comment = {
            name: this.state.name,
            comment: this.state.comment,
            link: this.props.link,
            postTime: new Date()
        }
        this.props.postCom(comment)
        this.setState({ name: '', comment: '' })

    }

    //helper function to identify comments belonging to article
    mapMyComments = () => {
        const myLinks = this.props.comments.filter(comm => comm.link === this.props.link)
        return myLinks.map(comm => (
            <Comment id={comm._id} delComm={this.props.delComm} name={comm.name} content={comm.comment} time={comm.postTime} />))
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui  relaxed divided list">
                    <div className="ui comments">
                        <div className="comment">
                            <div className="content">
                                {this.mapMyComments()}
                                <form className="ui reply form">
                                    <div className="field">
                                        <div className="metadata">
                                            <div>Name</div>
                                        </div>
                                        <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></input>
                                        <br />
                                        <div className="metadata">
                                            <div >Comment</div>
                                        </div>
                                        <input value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })}></input>
                                    </div>
                                    <div className="ui primary submit labeled icon button" onClick={this.addComment}>
                                        <i className="icon edit"></i> Add Comment
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default CommentBlock;