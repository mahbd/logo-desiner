import React, {Component} from "react";
import "./faq.css";
import http from "../../form/httpService";
import {apiRoot} from "../../constants";

class FAQ extends Component {
  state = {
    faqs: []
  }

  async componentDidMount() {
    let res = await http.get(apiRoot + '/site-data/faq/');
    this.setState({faqs: res.data.data});
  }

  render() {

    return (
        <div className="faqs ">
          <div className="container">
            <div className="row">
              <div className="col-md-5 ">
                <div className="faqs-img bg-color-white">
                  <div className="icon-question"/>
                </div>
              </div>
              <div className="col-md-7">
                <div className="section-header ">
                  <h2>Frequently asked questions?</h2>
                </div>
                <div id="accordion ">

                  {[...this.state.faqs.entries()].map(([index, faq]) =>
                      <div key={index} className="card">
                        <div className="card-header">
                          <a className="card-link"
                             data-toggle="collapse"
                             href={`#collapse${index}`}>
                            <span>{index + 1}</span> {faq.question}
                          </a>
                        </div>
                        <div
                            id={`collapse${index}`}
                            className="collapse"
                            data-parent="#accordion"
                        >
                          <div className="card-body">{faq.answer}</div>
                        </div>
                      </div>
                  )}


                </div>
                <a className="btn" href="">Have more questions?</a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default FAQ;
