/*global chrome*/
import React, { Component } from 'react';
import { Badge, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col, Row } from 'reactstrap';
let psl = require('psl');

class LinkCard extends Component {
 constructor(props) {
   super(props);
   this.goToLink = this.goToLink.bind(this);
 }

 goToLink() {
   console.log("Beep boop")
   chrome.tabs.create({ url: this.props.link });
 }

 extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
  }

 render() {
   return (
     <div>
       <Card
          className="link-card"
          onClick={this.goToLink}
        >
          <CardBody>
            <CardText>
              <h3>
                {psl.get(this.extractHostname(this.props.link))}
                {' '}
                <span class="msc-badge msc-badge__success">
                  86% similar
                </span>
              </h3>
              {this.props.link.substring(0, 35) + "..."}
            </CardText>
          </CardBody>
      </Card>
      <br/>
    </div>
  )
 }
}

export default LinkCard;
