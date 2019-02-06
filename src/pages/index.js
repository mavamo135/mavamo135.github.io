import React from "react";
import Helmet from 'react-helmet'
import g from "glamorous";
import Link from "gatsby-link";
import { rhythm } from "../utils/typography";

export default class Index extends React.Component {
    render () {
      const siteTitle = this.props.data.site.siteMetadata.title;
      const posts = this.props.data.allMarkdownRemark;
      return (
        <div>
            <Helmet title="Posts | MyBlog" />
            <g.H4>{posts.totalCount} Posts</g.H4>
            {posts.edges.map(({ node }) => (
                <div key={node.id}>
                    <Link to={node.fields.slug} css={{ textDecoration: `none`, color: `inherit` }}>
                        <g.H2 marginBottom={rhythm(1 / 4)}>
                            {node.frontmatter.title}{" "}
                            <g.H4 color="#999999"> by {node.frontmatter.author} — {node.frontmatter.date}</g.H4>
                        </g.H2>
                        <p>{node.excerpt}</p>
                    </Link>
                </div>
            ))}
        </div>
      )
    }
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
        totalCount
        edges {
            node {
                id
                frontmatter {
                    title
                    author
                    date(formatString: "DD MMMM, YYYY")
                }
                fields {
                    slug
                }
                excerpt
            }
        }
    }
    site {
        siteMetadata {
            title
        }
    }
  }
`;
