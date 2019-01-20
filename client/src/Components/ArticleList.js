import React from 'react';
import Article from './Article';
import './ArticleList.css';


class ArticleList extends React.Component {

    //helper function to build card for each article
    listBuilder = () => {
        console.log(this.props.results)
        const noAds = this.props.results.filter(art => art.link.startsWith("https://news.avclub.com/"));
        const artList = noAds.map(art => (
            <Article postCom={this.props.postCom} delComm={this.props.delComm} comments={this.props.comments} title={art.title} summ={art.summ} link={art.link} />
        ))
        return artList
    }

    render() {
        return (
            <div className="listedArticles">
                <div className="ui segment articleList">
                    <div className="ui  relaxed divided list">
                        {this.listBuilder()}
                    </div>
                </div>
            </div>
        );
    };
};

export default ArticleList;