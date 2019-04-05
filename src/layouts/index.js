import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import './index.css'
require("prismjs/themes/prism.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet title={data.site.siteMetadata.title} />
    <Header name={data.site.siteMetadata.title} />
    <div style={{margin: '0 auto', maxWidth: 1300, padding: '0px 1.0875rem 1.45rem', paddingTop: 0}}>
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`