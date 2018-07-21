import React from 'react'
import Link from 'gatsby-link'
import ContactInfo from '../components/ContactInfo'
import NavigationRight from '../components/NavigationRight'
import NavigationLeft from '../components/NavigationLeft'

const SecondPage = () => (
  <div className="site" draggable="true">
    <div className="main">
      <div className="card">
        <div className="card-body" >
        <ul className="list-group list-group-flush">
          <li className="list-group-item works">
            <p>🌞 - Developed several web systems from back-end to front-end using Spring core during "Design and Testing (3rd year)", hardest subject in my university in which I obtained an A mark (being A+ the highest)</p>
            <p>🌞 - Web mashup for the subject "Introduction to software engineering and web systems (2nd year)", I developed a webpage which made use of youtube API, couple google APIs and Spotify in order to help people with concise searchs about their favourite music</p>
            <p>🌞 - Youtube video linker (using node.js, express, socket.io, youtube API, it also containings a simple really simple API replying with the avaliable rooms and deployed with Heroku)</p>
            <p>🌞 - Real time chat application (using node.js, express, socket.io and deployed with Heroku)</p>
            <p>🌞 - Task list manager (developed using the default react app structure)</p>
            <p>🌞 - This personal website (developed using Gatsby, internally it uses react, webpack and several components, also used simple bootstrap 4)</p>
            <p>🌞 - Several more projects I got writen down</p>
          </li>
        </ul>
          <ContactInfo/>
        </div>
      </div>
    </div>
    <NavigationRight page="3"/>
    <NavigationLeft page="index"/>
  </div>
)

export default SecondPage
