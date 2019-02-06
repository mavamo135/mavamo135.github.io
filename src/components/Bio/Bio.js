import React from 'react'
import profilePic from './profile-pic.png'
import { rhythm } from '../../utils/typography'

const Bio = () => {
  return (
    <div style={{display: 'flex', marginBottom: rhythm(2.5), alignItems: 'center'}}>
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
        <p style={{marginBottom: 0}}> 
          Ingeniero en Rob&oacute;tica con Maestr&iacute;a en Ciencias en Instrumentaci&oacute;n y Control.
        </p>
      </div>
    </div>
  )
}

export default Bio