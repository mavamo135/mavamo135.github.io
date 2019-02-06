---
title: Making a blog with Gatsby
author: Maximiliano Valencia
date: "2018-03-12"
---

In this post I will show how to make your personal blog website using Gatsby.

[Gatsby](https://www.gatsbyjs.org) is a static site generator with a lot of templates which you can use to build your project. One advantage of Gatsby is that it uses GraphQL, so you can get your content from multiple places starting from Markdown to Google Sheets! Ohh, did I tell that you build using React!! 

##Requirements

First, you have to install Gatsby command line interface tool. This tool is used to create new Gatsby projects. 
```bash
    npm install -g gatsby-cli
```
Next, initialize the blog with:
```bash 
    gatsby new my-blog https://github.com/mavamo135/my-blog
```
 That's it! You can start your blog with:
 ```bash
    cd my-blog
    gatsby develop
```
