 /*global chrome*/
import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: window.getSelection().toString(),
      response: "..."
    };
  }

  componentDidMount() {
    // chrome.storage.sync.get(['response'], function(result) {
    //   alert(result.json())
    //   this.setState({
    //     response: JSON.stringify(result.response)
    //   })
    // });
    var windowSelection = window.getSelection();

    this.setState({
      selection: windowSelection.toString(),
    })

    this.query(this.state.selection);
  }

  async query(text) { 
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
        this.state.selected
        {this.state.selected}
        <br/>
        this.state.response
        {this.state.response}
      </div>
    )
  }
}

export default Results;
