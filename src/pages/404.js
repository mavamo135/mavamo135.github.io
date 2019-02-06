import React from "react"
import Helmet from 'react-helmet'

export default class NotFound extends React.Component {
    render () {
      const siteTitle = this.props.data.site.siteMetadata.title
        return (
            <div>
                <Helmet title={`Not Found | ${siteTitle}`} />
                <h1> 
                    Sorry, page not found!
                </h1>
            </div>
        )
    }
}

export const query = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`