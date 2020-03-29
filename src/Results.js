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
    var text = chrome.extension.getBackgroundPage().window.getSelection.toString();
    this.setState({
      selection: text,
    });
    var body = { 
      "query": text
    } ;

    const url = "https://covid-api.arjungandhi.com/";
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
      var body = JSON.parse(result.body);
      this.setState({
        response: body,
      })
    })
    .catch(err => { 
      this.setState({
        response: "error: " + err
      })
    }) ;
  }


  render() {
    return (
      <div>
        this.state.selection
        {this.state.selection}
        <br/>
        this.state.response.medical_credibility
        <br/>
        {this.state.response.medical_credibility}
        <br/>
        this.state.response.toxicity
        {this.state.response.toxicity}
      </div>
    )
  }
}

export default Results;
