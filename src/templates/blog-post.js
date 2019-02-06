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
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        <p style={{
          color: "#666666", 
          ...scale(-1 / 5), 
          display: 'block', 
          marginBottom: rhythm(1), 
          marginTop: rhythm(-1)}}>
            by {post.frontmatter.author} 
            <span style={{fontSize: '0.8em'}}> 
              - {post.frontmatter.date}
            </span>
          </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={{marginBottom: rhythm(1)}}/>
        <Bio />
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
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
