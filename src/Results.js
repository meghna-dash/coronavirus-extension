 /*global chrome*/
import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "initial selection",
      response: "..."
    };
  }

  componentDidMount() {
    this.query(chrome.extension.getBackgroundPage().window.getSelection.toString());
  }

  async query(text) { 
    this.setState({
      selection: text,
    })
    var body = { 
      "query": text
    } 
    const url = "https://covid-api.arjungandhi.com/"
    fetch(url,
      { 
        method: "POST",
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json" 
      }, 
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json()
    })
    .then(result => {
      this.setState({
        response: JSON.parse(JSON.stringify(result)).body
      })
    })
    .catch(err => { 
      this.setState({
        response: "error: " + err
      })
    }) 
  } 

  render() {
    return (
      <div>
        this.state.selection
        {this.state.selection}
        <br/>
        this.state.response
        <br/>
        {this.state.response}
        <br/>

        this.state.response.medical_credibility
        {this.state.response.medical_credibility}
        <Progress value={75} />
        <br/>

        this.state.response.negative_credibility
        {this.state.response.negative_credibility}
        <Progress value={75} />
        <br/>

        this.state.response.toxicity
        {this.state.response.toxicity}
        <Progress value={75} />
        <br/>

        this.state.response.news_hotness
        {this.state.response.news_hotness}
        <Progress value={75} />
        <br/>
      </div>
    )
  }
}

export default Results;
