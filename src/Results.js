 /*global chrome*/
import React, { Component } from 'react';

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
        response: " meeps " + JSON.stringify(result)
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
        {this.state.response}
      </div>
    )
  }
}

export default Results;
