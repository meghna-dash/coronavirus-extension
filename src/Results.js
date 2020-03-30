 /*global chrome*/
import React, { Component } from 'react';
import { Card, CardBody, CardDeck, Progress, Row } from 'reactstrap';
import { CircleProgress } from 'react-gradient-progress';
import LinkCard from './LinkCard';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "",
      response: "..."
    };
  }

  componentDidMount() {
    var text = "";
    var _this = this;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const port = chrome.tabs.connect(tabs[0].id);
      port.onMessage.addListener((response) => {
        text = response.selection;
        _this.query(text);
      });
      port.postMessage({cmd: "select"});
    })
  }

  query(text) {
    this.setState({
      selection: text,
    });
    var body = { 
      "query": text
    } ;

    const url = "http://ec2-54-236-4-7.compute-1.amazonaws.com:5000/";

    if (this.state.selection) {
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
        console.log(body)
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
  }

  render() {
    return (
      <div>
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
            link={page.link}
          />
        )) : <div />}
      </div>
    )
  }
}

export default Results;
