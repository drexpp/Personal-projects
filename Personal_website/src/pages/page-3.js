import React from 'react'
import Link from 'gatsby-link'
import ContactInfo from '../components/ContactInfo'
import NavigationLeft from '../components/NavigationLeft'
import ContactForm from '../components/ContactForm'

const ThirdPage = () => (
  <div className="site" draggable="true">
    <div className="main">
      <div className="card">
        <div className="card-body" >
          <ContactForm/>
          <ContactInfo/>
        </div>
      </div>
    </div>
    <NavigationLeft page="2"/>
  </div>
)

export default ThirdPage
