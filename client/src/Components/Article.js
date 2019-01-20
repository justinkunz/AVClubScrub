import React from 'react';
import CommentBlock from './CommentBlock';

class Article extends React.Component {
    render() {
        return (
            <div className="article">
                <div className="ui segment">
                    <div className="ui  relaxed divided list">
                        <div className="ui inverted segment">
                            <div className="ui inverted relaxed divided list">
                                <div className="item">
                                    <a href={this.props.link}>
                                        <div className="content">
                                            <div className="header">{this.props.title}</div>
                                            {this.props.summ}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <CommentBlock postCom={this.props.postCom} delComm={this.props.delComm} comments={this.props.comments} link={this.props.link} />
                    </div>
                </div>
            </div >
        );
    };
};

export default Article;