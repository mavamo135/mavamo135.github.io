import React from 'react'
import profilePic from './profile-pic.png'
import { rhythm } from '../../utils/typography'
import { FaCode, FaRegEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import "./index.css"

const About = () => {
  return (
    <div style={{marginBottom: rhythm(2.5), alignItems: 'center', textAlign: 'center'}}>
      <img src={profilePic} alt={`Maximiliano Valencia`} style={{
        marginLeft: rhythm(1 / 2), 
        marginRight: rhythm(1 / 2), 
        marginBottom: 0, 
        width: rhythm(4), 
        height: rhythm(4), 
        border: '2px solid rebeccapurple', 
        borderRadius: '50%'
      }} />
      <div>
        <h3 style={{marginBottom: rhythm(1 / 6)}}>
            Maximiliano Valencia
        </h3>
        <h4 style={{marginBottom: rhythm(1 / 6)}}> 
            Ingeniero de Sistemas Embebidos
        </h4>
        <h5>
          <FaMapMarkerAlt/>
          Celaya, Gto.
        </h5>
      </div>
      <div id="flex-container">
        <a href="https://github.com/mavamo135"> 
            <FaCode style={{width: '24px', height: '24px'}}/>
        </a>
        <a href="mailto:mavamo135@gmail.com"> 
            <FaRegEnvelope style={{width: '24px', height: '24px'}}/>
        </a>
      </div>
    </div>
  )
}

export default About