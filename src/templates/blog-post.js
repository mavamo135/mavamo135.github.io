import React from "react"
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'

export default class BlogPostTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const post = this.props.data.markdownRemark;
    return (
      <div style={{margin: '0 auto', maxWidth: 960, padding: '0px 1.0875rem 1.45rem', paddingTop: 0}}>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        <p style={{
          color: "#666666", 
          ...scale(-1 / 5), 
          display: 'block', 
          marginBottom: rhythm(1), 
          marginTop: rhythm(-1)}}>
            {post.frontmatter.author} 
            <span style={{fontSize: '0.8em'}}> 
              - {post.frontmatter.date}
            </span>
          </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        date(formatString: "DD MMMM, YYYY", locale: "es")
      }
    }
  }
`
