import React from "react";
import Helmet from 'react-helmet'
import g from "glamorous";
import Link from "gatsby-link";
import { rhythm } from "../utils/typography";
import About from "../components/About"
import './index.css'

export default class Index extends React.Component {
    render () {
      const siteTitle = this.props.data.site.siteMetadata.title;
      const posts = this.props.data.allMarkdownRemark;
      return (
        <div>
            <Helmet title="Posts | MyBlog" />
            <div class="row">
                <div class="column" id="leftcolumn">
                    <About />
                </div>
                <div class="column" id="rightcolumn">
                    <g.H4>{posts.totalCount} Posts</g.H4>
                    {posts.edges.map(({ node }) => (
                        <div key={node.id}>
                            <Link to={node.fields.slug} css={{ textDecoration: `none`, color: `inherit` }}>
                                <g.H2 marginBottom={rhythm(1 / 4)}>
                                    {node.frontmatter.title}{" "}
                                    <g.H5 color="#999999">{node.frontmatter.date}</g.H5>
                                </g.H2>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
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
                    date(formatString: "DD MMMM, YYYY", locale: "es")
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
