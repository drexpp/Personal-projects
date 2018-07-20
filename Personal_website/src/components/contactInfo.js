import React from 'react'

const ContactInfo = () => (
  <ul className="list-group list-group-flush">
    <li className="list-group-item">
      <div>
        <p>Contact Info</p>
      </div>
        <div className="contact-icons">
        <a href="https://github.com/drexpp" className="btn btn-social-icon btn-github">
          <span className="fa fa-github"></span>
        </a>
        <a href="mailto:ivandega22@gmail.com" className="btn btn-social-icon btn-google">
          <span className="fa fa-google"></span>
        </a>
        <a href="https://twitter.com/ivanplayer" className="btn btn-social-icon btn-twitter">
          <span className="fa fa-twitter"></span>
        </a>
      </div>
    </li>
  </ul>
)

export default ContactInfo;
