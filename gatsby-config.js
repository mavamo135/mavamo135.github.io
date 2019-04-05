module.exports = {
    siteMetadata: {
      title: `MyBlog`,
      author: `Maximiliano Valencia`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/content/posts`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-prismjs`,
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 590,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-glamor`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        'gatsby-plugin-react-helmet',
    ],
  };
