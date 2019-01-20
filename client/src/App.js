import React, { Component } from 'react';
import './App.css';
import avclub from './API/avclub';
import ArticleList from './Components/ArticleList';
import Loader from './Components/Loader';
import axios from 'axios';
import TopTitle from './Components/TopTitle';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { hasData: false, hasComments: false, comments: [] }
  }

  componentDidMount() {
    this.loadData();
    this.getComments();
  };

  //pull comments from db via api call
  getComments = async () => {
    const results = await axios.get('./api/post-comments')
    console.log(results.data)
    this.setState({ comments: results.data, hasComments: true })
  }

  //load article data (api call)
  loadData = async () => {
    const results = await avclub.get();
    console.log(results.data);
    this.setState({ results: results.data, hasData: true });

  };

  //when new comments are posted
  postComment = (comment) => {
    this.postCommCall(comment).then(this.getComments())
  }

  //api call to post comments
  postCommCall = async (comment) => {
    console.log(comment)
    await axios.post('./api/post/comment', comment);
  };

  deleteComment = (commentId) => {
    this.delCommCall(commentId).then(this.getComments())
  };
  delCommCall = async (commentId) => {
    await axios.get('./api/delComm/' + commentId);
  }
  // render app if data is loaded, else render loader
  render() {
    console.log(this.state)
    if (this.state.hasData && this.state.hasComments) {
      return (
        <div>
          <TopTitle />
          <ArticleList postCom={this.postComment} delComm={this.deleteComment} comments={this.state.comments} results={this.state.results} />
        </div>
      );
    }
    else {
      this.loadData()
      return <Loader />
    }
  }
}

export default App;
