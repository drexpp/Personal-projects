import React from 'react'
import Link from 'gatsby-link'
import Technologies from '../components/technologies'
import ContactInfo from '../components/ContactInfo'

const IndexPage = () => (
  <div className="site" draggable="true">
    <div className="main">
      <div className="card">
        <div className="card-body" >
          <h2>My name is Iván de los Santos</h2>
          <p>Welcome to my personal website, I am a computer science student from Spain.</p>
          <p>I study in the university of Seville, where I am mainly foucused on web development 💻</p>
          <p>Technologies I love learning about</p>
          <Technologies/>
          <ContactInfo/>
        </div>
      </div>
    </div>
  </div>
)

export default IndexPage
