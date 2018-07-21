import React, {Component} from "react";


export default class ContactForm extends Component{
  render(){
    return(
      <ul className="list-group list-group-flush">
        <li className="list-group-item works">
          <h2> Get in contact with me </h2>
          <form action="https://formspree.io/ivandega22@gmail.com" method="POST">
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Your email</span>
              </div>
              <input type="text" className="form-control" aria-label="Sizing example input" name="_replyto" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="form-group">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="name"></textarea>
            </div>
            <div className="wrapper">
              <button type="submit" className="btn btn-primary btn-block contact-button">Send</button>
            </div>
          </form>
        </li>
      </ul>
    )
  }
}
