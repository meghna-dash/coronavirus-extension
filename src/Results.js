 /*global chrome*/
import React, { Component } from 'react';
import { Card, CardBody, CardDeck, Progress, Row } from 'reactstrap';
import { CircleProgress } from 'react-gradient-progress';
import LinkCard from './LinkCard';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "initial selection",
      response: "..."
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    var text = chrome.extension.getBackgroundPage().window.getSelection().toString();
=======
    var text = chrome.extension.getBackgroundPage().window.getSelection.toString();
>>>>>>> 2b40a4bdef60e70d3dc7347b4d293ca9ed5077e4
    this.setState({
      selection: text,
    });
    var body = { 
      "query": text
    } ;

<<<<<<< HEAD
    // alert(chrome.extension.getViews()[0].getSelection.toString())
    // alert(chrome.extension.getViews()[1].getSelection.toString())
    // // alert(chrome.extension.getBackgroundPage().window)
    // // alert(chrome.extension.getBackgroundPage().window.getSelection)
    alert(chrome.extension.getBackgroundPage().window.getSelection().toString())

    const url = "http://ec2-54-236-4-7.compute-1.amazonaws.com:5000/";
=======
    const url = "https://covid-api.arjungandhi.com/";
>>>>>>> 2b40a4bdef60e70d3dc7347b4d293ca9ed5077e4
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
      alert(result)
    })
    .catch(err => { 
      this.setState({
        response: "error: " + err
      })
    }) ;
  }
<<<<<<< HEAD
=======

>>>>>>> 2b40a4bdef60e70d3dc7347b4d293ca9ed5077e4

  render() {
    return (
      <div>
<<<<<<< HEAD
        {this.state.response.negative_credibility > 0.3 ? (
          <div style={{ color: 'red' }}>
            <h3>
              <strong> WARNING: </strong>
              We found this information on untrustworthy sites.
            </h3>
          </div>
        ) : <div/>}
        <div style={{ textAlign: 'center' }}>
        <div style={{ background: '#eef6f9', padding: "12px", width: "300px" }}>
          <table>
            <tr>
              <td>
                <h3>
                  Medical Reputation
                </h3>
                <CircleProgress
                  percentage={Math.round(this.state.response.medical_credibility * 100) > 0 ? Math.round(this.state.response.medical_credibility * 100) : 0}
                  width={100}
                  fontSize={'23px'}
                />
              </td>

              <td>
                <h3>
                  Toxicity
                </h3>
                <CircleProgress
                  percentage={Math.round(this.state.response.toxicity * 100) > 0 ? Math.round(this.state.response.toxicity * 100) : 0}
                  width={100}
                  fontSize={'23px'}
                />
              </td>
            </tr>

            <tr>
              <td>
                <h3>
                  News Virality
                </h3>
                <CircleProgress
                  percentage={Math.round(this.state.response.news_hotness * 100) > 0 ? Math.round(this.state.response.news_hotness * 100) : 0}
                  width={100}
                  fontSize={'23px'}
                />
              </td>
            </tr>
          </table>
        </div>
        </div>
        <br/> <br/>
        <h3>
          Relevant Articles
        </h3>
        {this.state.response.useful_pages ? this.state.response.useful_pages.map((page, idx) => (
          <LinkCard
            similarity={86}
            link={page}
          />
        )) : <div />}

=======
        this.state.selection
        {this.state.selection}
        <br/>
        this.state.response.medical_credibility
        <br/>
        {this.state.response.medical_credibility}
        <br/>
        this.state.response.toxicity
        {this.state.response.toxicity}
>>>>>>> 2b40a4bdef60e70d3dc7347b4d293ca9ed5077e4
      </div>
    )
  }
}

export default Results;
