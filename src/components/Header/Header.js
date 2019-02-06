import React from 'react'
import Link from 'gatsby-link'
import { css } from "glamor";
import g from "glamorous";

const Title = (props) => {
  return (
    <Link to={`/`} style={{color: '#444444'}}>
      <g.H1 display={`inline-block`} style={{color: '#61DAFB'}}>
        {props.children}
      </g.H1>
    </Link>
  )
}

const ListLink = (props) => {
  return (
      <li style={{display: 'inline-block', marginRight: '1rem'}}>
          <Link to={props.to} style={{color: '#444444'}}>
            <g.H4 style={{color: '#61DAFB'}}>
            {props.children}
            </g.H4>
          </Link>
      </li>
  )
}

const Header = (props) => {
  return (
    <div style={{
      margin: '0 auto', 
      marginBottom: '1.5rem', 
      background: '#444444',
      boxShadow:'0px 0px 7px black'
    }}>                                            
      <header style={{
        margin: '0 auto',  
        maxWidth: 960, 
        padding: '1.45rem 1.0875rem 0rem 1.0875rem'
      }}>
        <Title>{props.name}</Title>
        <ul style={{listStyle: 'none', float: 'right', padding: '0.5rem 0rem 0rem 0rem'}}>
          <ListLink to='/about'>About</ListLink>
        </ul>
      </header>
    </div>
  )
}

export default Header