import React from 'react'
import Technologies from '../components/technologies'
import ContactInfo from '../components/ContactInfo'
import NavigationRight from '../components/NavigationRight'

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
    <NavigationRight page="2"/>
  </div>
)

export default IndexPage
